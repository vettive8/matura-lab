"""Read the official 2012 curriculum in document order; numbering restarts per subject."""
from pathlib import Path
import json,tempfile,re,requests
from lxml import html
ROOT=Path(__file__).resolve().parent
CACHE=Path(tempfile.gettempdir())/'cke-study-pdfs'
law='https://eli.gov.pl/api/acts/DU/2012/977/text.html'
def tidy(text):return ' '.join(text.split()).strip()
def parse():
    f=CACHE/'basis.html'
    if not f.exists():
        result=requests.get(law,timeout=60);result.raise_for_status();f.write_bytes(result.content)
    document=html.fromstring(f.read_text('utf8'))
    blocks=document.xpath('//div[@data-template="xText"]')
    subjects={'BIOLOGIA':'biology','CHEMIA':'chemistry'}
    out=[];text=scope=section=subject=None;last=None
    for i,block in enumerate(blocks):
        text=tidy(block.text_content())
        if text in ['BIOLOGIA','CHEMIA','FIZYKA']:
            subject=subjects.get(text);section=scope=last=None
            if subject and i+1<len(blocks):
                level=tidy(blocks[i+1].text_content())
                scope={'III etap edukacyjny':'foundation','IV etap edukacyjny - zakres podstawowy':'basic','IV etap edukacyjny - zakres rozszerzony':'extended'}.get(level)
            continue
        if not scope or not subject:continue
        if text.startswith('Treści nauczania') and 'szczegółowe' in text:
            section='specific';continue
        if section!='specific':continue
        if text.startswith('Zalecane') or text.startswith('Warunki i sposób realizacji'):
            section=None;continue
        unit=block.getparent().getparent()
        if 'unit ' not in unit.get('class','') or block.getparent().get('class')!='unit-inner':continue
        # Only the first paragraph names an actual numbered unit.
        first=block.getparent().xpath('./div[@data-template="xText"][1]')
        if not first or first[0]!=block:continue
        parents=[a for a in unit.iterancestors() if 'unit ' in a.get('class','')]
        heading=unit.xpath('./h3')
        if not heading:continue
        label=tidy(heading[0].text_content()).rstrip('.)')
        if not parents:
            last={'sl':subject,'scope':scope,'number':label,'name':text.split('Uczeń:')[0].rstrip('. '),'items':[]}
            out.append(last);continue
        if not last:continue
        if unit.xpath('./div[@class="unit-inner"]/div[contains(@class,"unit ")]'):continue
        nums=[tidy(a.xpath('./h3')[0].text_content()).rstrip(').') for a in reversed(parents) if a.xpath('./h3')]+[label]
        full=tidy(' '.join(unit.xpath('./div[@class="unit-inner"]/div[@data-template="xText"]//text()')))
        if not full:continue
        sub=[]
        for a in reversed(parents[:-1]):
            name=a.xpath('./div[@class="unit-inner"]/div[@data-template="xText"][1]')
            if name:sub.append(tidy(name[0].text_content()).split('Uczeń:')[0].rstrip('. '))
        last['items'].append({'id':'.'.join(nums),'pl':full.rstrip('; '),'sub':' · '.join(sub)})
    return [g for g in out if g['items']]
if __name__=='__main__':
    data=parse()
    (ROOT/'requirements.json').write_text(json.dumps(data,ensure_ascii=False,indent=1)+'\n','utf8')
    from collections import Counter
    print(Counter({(s,l):sum(len(g['items']) for g in data if g['sl']==s and g['scope']==l) for s in ['biology','chemistry'] for l in ['foundation','basic','extended']}))
