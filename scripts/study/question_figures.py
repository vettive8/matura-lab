"""Render the numbered question separately from its shared source passage."""
from extract import *
from concurrent.futures import ProcessPoolExecutor
def render_year(arg):
    sl,year,records=arg
    doc=fitz.open(CACHE/f'{sl}-{year}-paper.pdf')
    spans,lines=scan(doc)
    result={}
    for r in records:
        num=r['num'];span=spans.get(num)
        if not span:continue
        start,y,last,end=span
        # The last task can be followed by an unnumbered rough-work section.
        for pg,ly,line in selection(lines,span):
            if re.match(r'^(BRUDNOPIS|Brudnopis|Wypełnia egzaminator|Ocena wypracowania)',line) or (line.startswith('Informacja do zada') and pg>=start):
                last,end=pg,ly;break
        files=[]
        for pg in range(start,last+1):
            top=y-2 if pg==start else 51
            bottom=end-2 if pg==last else doc[pg].rect.height-48
            if bottom-top<14:continue
            pix=doc[pg].get_pixmap(matrix=fitz.Matrix(1.5,1.5),clip=fitz.Rect(37,top,doc[pg].rect.width-34,bottom))
            img=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
            mask=img.convert('L').point(lambda x:255 if x<170 else 0)
            box=mask.getbbox()
            if not box or box[3]-box[1]<8:continue
            img=img.crop((0,max(0,box[1]-5),img.width,min(img.height,box[3]+5)))
            name=f'q-{sl}-{year}-{num}-{len(files)+1}.webp'
            img.save(IMAGES/name,'WEBP',quality=86,method=2);files.append(name)
        result[num]=files
    return sl,year,result
if __name__=='__main__':
    f=CACHE/'study-rows.json';rows=json.loads(f.read_text('utf8'))
    groups={}
    for r in rows:groups.setdefault((r['subject'],r['year']),[]).append(r)
    with ProcessPoolExecutor(4) as ex:
        for sl,year,files in ex.map(render_year,[(s,y,rs) for (s,y),rs in groups.items()]):
            for r in groups[sl,year]:r['figures']=files.get(r['num'],[])
    f.write_text(json.dumps(rows,ensure_ascii=False),'utf8')
