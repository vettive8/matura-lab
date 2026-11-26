"""Capture the shared numbered stimulus once for all subparts of a task."""
from question_figures import *
def group_figures(arg):
    sl,year,records=arg
    doc=fitz.open(CACHE/f'{sl}-{year}-paper.pdf')
    spans,lines=scan(doc);images={}
    ranges={}
    for pg,ls in enumerate(lines):
        for y,_,line in ls:
            header=re.match(r'^Informacj[ae] do zada(?:ń|nia)\s+(\d+)\.?\s*(?:[–−-]\s*(\d+))?',line,re.I)
            if not header:continue
            first,last=int(header[1]),int(header[2] or header[1])
            following=sorted((pos[0],pos[1]) for pos in spans.values() if (pos[0],pos[1])>(pg,y))
            if not following:continue
            tag=f'source-{first}-{last}'
            ranges[tag]=(pg,y,*following[0])
            for n in range(first,last+1):images.setdefault(str(n),[]).append(tag)
    names={key:val[:] for key,val in images.items()};images={}
    for key,span in ranges.items():spans[key]=span
    for parent in sorted({r['num'].split('.')[0] for r in records if '.' in r['num']} | set(ranges)):
        span=spans.get(parent)
        if not span:continue
        lead=clean(selection(lines,span)).lower()
        if len(lead)<45:continue
        # Retain the official paper as the source for external readings and experimental protocols.
        if re.search(r'koniugac|transformacj.*bakter|hodowl.*bakter|namnażani.*wirus',lead):continue
        files=[]
        p,y,last,end=span
        for pg in range(p,last+1):
            top=y-2 if pg==p else 48
            bottom=end-2 if pg==last else doc[pg].rect.height-45
            if bottom-top<25:continue
            pix=doc[pg].get_pixmap(matrix=fitz.Matrix(1.45,1.45),clip=fitz.Rect(37,top,doc[pg].rect.width-34,bottom))
            img=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
            box=img.convert('L').point(lambda x:255 if x<180 else 0).getbbox()
            if not box:continue
            img=img.crop((0,max(0,box[1]-5),img.width,min(img.height,box[3]+5)))
            name=f'context-{sl}-{year}-{parent}-{len(files)+1}.webp'
            img.save(IMAGES/name,'WEBP',quality=86,method=2);files.append(name)
        images[parent]=files
    result={}
    for r in records:
        n=r['num'].split('.')[0]
        tags=names.get(n,[])+([n] if '.' in r['num'] else [])
        files=[asset for tag in tags for asset in images.get(tag,[])]
        origin=next((ranges[tag][0]+1 for tag in tags if tag in ranges),r['context'])
        result[r['num']]=(files,origin)
    return sl,year,result
if __name__=='__main__':
    f=CACHE/'study-rows.json';rows=json.loads(f.read_text('utf8'));groups={}
    for r in rows:groups.setdefault((r['subject'],r['year']),[]).append(r)
    with ProcessPoolExecutor(4) as ex:
        for sl,yr,imgs in ex.map(group_figures,[(s,y,rs) for (s,y),rs in groups.items()]):
            for r in groups[sl,yr]:r['stimulus'],r['context']=imgs[r['num']]
    f.write_text(json.dumps(rows,ensure_ascii=False),'utf8')
