"""Index the actual 2012 requirements, linking only supported text matches."""
import json,re,math
from collections import defaultdict,Counter
from pathlib import Path
DIR=Path(__file__).resolve().parent
law='https://eli.gov.pl/api/acts/DU/2012/977/text.html'
cke='https://egzaminy.gov.pl/cke/egzamin-maturalny/formula-2015/podstawa-programowa'
levels={'foundation':['Podstawy · etap III','Foundations · stage III'],'basic':['Etap IV · podstawowy','Stage IV · basic'],'extended':['Etap IV · rozszerzony','Stage IV · extended']}
section_titles={
 ('biology','foundation'):['Biological molecules and energy','Cell structure and function','Classification and diversity','Ecology','Plant structure and function','Human anatomy and physiology','Health and disease','Genetics','Evolution of life','Local and global environmental issues'],
 ('biology','basic'):['Biotechnology and genetic engineering','Biodiversity and threats'],
 ('biology','extended'):['Chemical composition of organisms','Cell structure and function','Metabolism','Diversity of organisms','Human anatomy and physiology','Genetics and biotechnology','Ecology','Biodiversity on Earth','Evolution'],
 ('chemistry','foundation'):['Substances and their properties','Structure of matter','Chemical reactions','Air and other gases','Water and aqueous solutions','Acids and bases','Salts','Carbon and its compounds with hydrogen','Hydrocarbon derivatives and biologically important compounds'],
 ('chemistry','basic'):['Materials of natural origin','Chemistry of cleaning products','Chemistry in health and the kitchen','Soil chemistry','Fuels today and in the future','Chemistry of packaging and textiles'],
 ('chemistry','extended'):['Atoms, molecules and stoichiometry','Atomic structure: nuclei and electrons','Chemical bonding','Chemical kinetics and equilibrium','Solutions and aqueous reactions','Oxidation and reduction','Metals','Nonmetals','Hydrocarbons','Alcohols and phenols','Aldehydes and ketones','Carboxylic acids','Esters and fats','Nitrogen-containing organic compounds','Proteins','Carbohydrates']
}
def tokens(txt):
    excluded={'przedstaw','organizm','uczeń','zdający','przykład','określa','zadanie','wyjaśnia','wymienia','właściwo','stosuje','uzasadni','dotycząc','rozróżni','zależnoś','podstaw','związki','wskazuje','opisuje','procesów','poznanie','poziomie','porównuj','między','budowy','budowę','różnych','obserwac','rozpozn','związku','informac','zasady','podaje','reakcji','chemiczn'}
    return {w[:8] for w in re.findall(r'[a-ząćęłńóśźż]{5,}',txt.lower()) if w[:8] not in excluded}
def load(rows):
    groups=json.loads((DIR/'requirements.json').read_text('utf8'))
    en=json.loads((DIR/'requirements-en.json').read_text('utf8'))
    tasks=defaultdict(list)
    for row in rows:
        excerpt=re.split(r'Zasady oceniania\s|Schemat punktowania|Zasady punktowania',row['rubric'])[0]
        tasks[row['subject']].append((row,tokens(excerpt)))
    group_counts=Counter()
    by_task=defaultdict(list)
    for g in groups:
        sub,level=g['sl'],g['scope']; group_counts[sub,level]+=1
        g['route']=f"concepts/syllabus/{sub}/{level}/{group_counts[sub,level]}/"
        g['title']=[g['name'].replace('. Liczeń:', ''),section_titles[sub,level][group_counts[sub,level]-1]]
        pool=tasks[sub];freq=Counter(word for _,words in pool for word in words)
        for i,item in enumerate(g['items'],1):
            item['route']=g['route']+str(i)+'/'
            item['title']=[item['pl'],en[item['pl']]]
            item['section']=[item['sub'],en.get(item['sub'],'')]
            words=tokens(item['pl'])
            weights={w:math.log(1+len(pool)/(1+freq[w])) for w in words}
            total=sum(weights.values())
            candidates=[]
            if len(words)>=3:
                for r,other in pool:
                    common=words&other
                    score=sum(weights[w] for w in common)/total
                    if score>=.78 and len(common)>=3:candidates.append((score,r))
            item['tasks']=[];years=set()
            for score,r in sorted(candidates,key=lambda x:(-x[0],-x[1]['year'])):
                by_task[(sub,r['year'],r['num'])].append((score,item))
                if r['year'] not in years and len(years)<4:
                    years.add(r['year']);item['tasks'].append(r)
    return groups,by_task
