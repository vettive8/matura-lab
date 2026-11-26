"""Extract task boundaries from the two official documents for each session.
Run before build.py. PDFs are cached outside the repository.
"""
from pathlib import Path
from concurrent.futures import ProcessPoolExecutor
from difflib import SequenceMatcher
from collections import Counter
import re,json,os,tempfile
import fitz,requests
from PIL import Image
from bs4 import BeautifulSoup
BASE=Path(__file__).resolve().parents[2]
DIST=BASE/'dist'
CACHE=Path(tempfile.gettempdir())/'cke-study-pdfs'
CACHE.mkdir(exist_ok=True)
IMAGES=DIST/'study-media'
IMAGES.mkdir(exist_ok=True)
def get_pdf(path,url):
    if not path.exists():
        response=requests.get(url,timeout=60)
        response.raise_for_status()
        assert response.content.startswith(b'%PDF'),url
        path.write_bytes(response.content)
    return fitz.open(path)
def scan(doc):
    anchors=[];pages=[]
    for i,page in enumerate(doc):
        lines=[]
        for block in page.get_text('dict')['blocks']:
            for line in block.get('lines',[]):
                text=''.join(s['text'] for s in line['spans']).strip()
                x,y,_,bottom=line['bbox']
                if not text or bottom<48 or y>page.rect.height-44:continue
                lines.append((round(y,1),x,text))
        lines.sort()
        pages.append(lines)
        for y,x,line in lines:
            if x>150:continue
            m=re.match(r'^(?:Zadanie\s+(\d+(?:\.\d+)?)(?:\.(?:\s|$)|(?=\s+\(0))|([1-9]\d*\.\d+)\.?(?=\s*\(0))',line)
            if m:anchors.append((m[1] or m[2],i,y,line))
    by_id={};order=[]
    for a in anchors:
        if a[0] not in by_id:by_id[a[0]]=a;order.append(a)
    spans={}
    for idx,(num,pg,y,line) in enumerate(order):
        end=order[idx+1][1:3] if idx+1<len(order) else (min(pg+3,len(doc)-1),doc[min(pg+3,len(doc)-1)].rect.height-45)
        spans[num]=(pg,y,*end)
    return spans,pages
def selection(pages,span):
    a,y,b,end=span
    return [(pg,ly,line) for pg in range(a,b+1) for ly,_,line in pages[pg]
            if (pg>a or ly>=y) and (pg<b or ly<end)]
def norm(t):
    return ' '.join(re.findall(r'[\w]+',t.lower()))
def clean(lines):
    return ' '.join(l for _,_,l in lines if not re.search(r'Więcej arkuszy|Strona \d|Miejsce na|Wypełnia egzaminator',l) and not re.match(r'^[. …_-]+$',l))
def mark_images(doc,lines,span,stem):
    start,y,last,end=span
    for pg,ly,line in lines:
        if re.match(r'^(?:Zasady oceniania$|Schemat punktowania|Zasady punktowania|\d+ (?:pkt|p\.)\s*[–−-])',line,re.I):
            start,y=pg,ly;break
    files=[]
    for pg in range(start,last+1):
        top=y-2 if pg==start else 51
        bottom=end-2 if pg==last else doc[pg].rect.height-47
        if bottom-top<14:continue
        pix=doc[pg].get_pixmap(matrix=fitz.Matrix(1.6,1.6),clip=fitz.Rect(36,top,doc[pg].rect.width-34,bottom),colorspace=fitz.csRGB)
        img=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
        # Crop only blank rows. Preserve diagrams, underlines, tables and subscripts.
        gray=img.convert('L').point(lambda x:255 if x<205 else 0)
        box=gray.getbbox()
        if not box:continue
        img=img.crop((0,max(0,box[1]-5),img.width,min(img.height,box[3]+5)))
        name=f'{stem}-{len(files)+1}.webp';img.save(IMAGES/name,'WEBP',quality=86,method=2);files.append(name)
    return files
def original(sl):
    folder,code=('Biologia','MBIP') if sl=='biology' else ('Chemia','MCHP')
    result=[]
    for k,tail in [('paper','A-2605-arkusz'),('marks','2605-zasady')]:
        url=f'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2026/{folder}/{code}-R0-100-{tail}.pdf'
        doc=get_pdf(CACHE/f'{sl}-other-{k}.pdf',url);sp,lines=scan(doc)
        result.append({n:norm(clean(selection(lines,b))) for n,b in sp.items()})
    return result
def extract(arg):
    sl,year,urls,listed,old=arg
    docs=[get_pdf(CACHE/f'{sl}-{year}-{k}.pdf',url) for k,url in zip(['paper','marks'],urls)]
    (ps,pl),(ms,ml)=map(scan,docs)
    listed_ids={n for n,_,_ in listed}
    for n,span in ps.items():
        if n not in listed_ids and n in ms and not any(k.startswith(n+'.') for k in ps):
            listed.append((n,span[0]+1,ms[n][0]+1))
    listed.sort(key=lambda item:tuple(map(int,item[0].split('.'))))
    records=[]
    for num,pfallback,mfallback in listed:
        p=ps.get(num);m=ms.get(num)
        if not p and not m:continue
        plines=selection(pl,p) if p else []
        mlines=selection(ml,m) if m else []
        prompt=clean(plines);marks=clean(mlines)
        points=re.search(r'\(0\s*[–−-]\s*(\d+)\)',prompt[:130]+' '+marks[:80])
        # Compare both task and rubric before reusing the separately authored 2023-formula explanation.
        match=None
        if old and p and m:
            pn=norm(prompt)
            candidates=[(SequenceMatcher(None,pn,v,autojunk=False).ratio(),k) for k,v in old[0].items() if abs(len(pn)-len(v))<max(180,len(pn)*.25)]
            if candidates:
                ratio,k=max(candidates)
                if ratio>.88 and k in old[1] and SequenceMatcher(None,norm(marks),old[1][k],autojunk=False).ratio()>.66:match=k
        excerpt=''
        for _,_,line in mlines:
            if re.match(r'^\d+ (?:p\.|pkt)\s*[–−-]',line):
                excerpt=line;break
        pp=(p[0]+1 if p else pfallback);mp=(m[0]+1 if m else mfallback)
        records.append(dict(subject=sl,year=year,num=num,p=pp,m=mp,context=ps.get(num.split('.')[0],(pp-1,))[0]+1,
            urls=urls,points=int(points[1]) if points else None,match=match,
            text=prompt[:8000],rubric=marks[:8000],
            images=mark_images(docs[1],mlines,m,f'{sl}-{year}-{num}') if m else []))
    return records
def main():
    args=[]
    for sl in ['biology','chemistry']:
        old=original(sl)
        home=DIST/'formula-2015'/sl/'index.html'
        soup=BeautifulSoup(home.read_text('utf8'),'html.parser')
        for sec in soup.select('.study-language')[0].select('section'):
            year=int(re.search(r'20\d\d',sec.h2.text)[0]);urls=[a['href'] for a in sec.select('p.links a')]
            listed=[]
            for li in sec.select('.task-index li'):
                a,b=li.select('a')[:2]
                def page(link):
                    m=re.search(r'#page=(\d+)',link['href']);return int(m[1]) if m else 1
                listed.append((a.text.split()[-1],page(a),page(b)))
            args.append((sl,year,urls,listed,old if year==2026 else None))
    with ProcessPoolExecutor(4) as ex:rows=sum(ex.map(extract,args),[])
    (CACHE/'study-rows.json').write_text(json.dumps(rows,ensure_ascii=False),'utf8')
    print('tasks',len(rows),'paired commentary',sum(bool(r['match']) for r in rows),'with marking extracts',sum(bool(r['images']) for r in rows))
if __name__=='__main__':main()
