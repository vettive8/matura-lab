"""Build the bilingual reading library from the exam extracts and atlas content."""
from pathlib import Path
from collections import Counter,defaultdict
from html import escape
import json,subprocess,re,tempfile,math
from bs4 import BeautifulSoup as Soup
from translate import passages
ROOT=Path(__file__).resolve().parents[2]
DIST=ROOT/'dist'
DIR=Path(__file__).resolve().parent
CACHE=Path(tempfile.gettempdir())/'cke-study-pdfs'
BASE='/learn/matura/formula-2015/'
ASSET='/learn/matura/'
subjects={'biology':['Biologia','Biology'],'chemistry':['Chemia','Chemistry']}
dataset=json.loads(subprocess.check_output(['node',str(DIR/'atlas-data.cjs')],encoding='utf8'))
rows=json.loads((CACHE/'study-rows.json').read_text('utf8'))
translations=json.loads((CACHE/'translations.json').read_text('utf8'))
terms={}
for line in (DIR/'concepts.psv').read_text('utf8').splitlines():
    if not line.strip():continue
    ch,key,pl,en,patterns,dp,de,xp,xe,ep,ee=line.split('|')
    terms[key]=dict(ch=ch,title=[pl,en],definition=[dp,de],example=[xp,xe],origin=[ep,ee],regex=re.compile('|'.join(patterns.split(',')),re.I))
chapters={}
for subject,short in [('biologia','b'),('chemia','c')]:
    for i,c in enumerate([x for x in dataset['curriculum'] if x['subject']==subject and x['level']=='extended' and not x['general']],1):
        chapters[short+str(i)]=c
def taskpath(r):return f"tasks/{r['subject']}/{r['year']}/{r['num']}/"
def taskname(r):
    subj=subjects[r['subject']]
    return [f"{subj[0]} {r['year']} · zadanie {r['num']}",f"{subj[1]} {r['year']} · task {r['num']}"]
def bi(pair):
    if pair[0]==pair[1]:return escape(str(pair[0]))
    return ''.join(f'<span class="{lang}">{escape(str(value))}</span>' for lang,value in zip(['pl','en'],pair))
def h(tag,pair):return f'<{tag}>'+bi(pair)+f'</{tag}>'
def link(url,text):
    href=url if url.startswith(('/','https://')) else BASE+url
    return '<a href="'+escape(href,quote=True)+'">'+bi(text)+'</a>'
def listing(items,cls='compact'):
    return '<ul class="'+cls+'">'+''.join('<li>'+s+'</li>' for s in items)+'</ul>'
def panel(title,content,style=''):
    return '<section class="panel '+style+'">'+h('h2',title)+content+'</section>'
def tasklink(r):return link(taskpath(r),taskname(r))
def termlink(k):return link('concepts/'+k+'/',terms[k]['title'])
def chaptername(k):return [chapters[k]['pl'],chapters[k]['en']]
def chapterlink(k):return link('concepts/'+k+'/',chaptername(k))
def taskfigure(file,alt):
    return f'<img class="facsimile" loading="lazy" decoding="async" alt="{escape(alt,quote=True)}" src="{ASSET}study-media/{file}">'
template=Soup((DIST/'formula-2015/index.html').read_text('utf8'),'html.parser')
aside=str(template.select_one('#sidebarToggle'))+str(template.select_one('#sidebarShade'))+str(template.select_one('#sidebar'))
routes=[]
def write(path,title,crumb,body):
    url=BASE+path
    full='<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escape(title[0])+' | Mervive</title><link rel="canonical" href="https://mervive.com'+url+'"><link rel="stylesheet" href="'+ASSET+'study.css"><link rel="stylesheet" href="'+ASSET+'sidebar.css"></head><body>'+aside+'<main><div class="breadcrumb">'+link(BASE,['Formuła 2015','Formula 2015'])+crumb+'</div>'+h('h1',title)+body+'</main><script src="'+ASSET+'preferences.js"></script><script src="'+ASSET+'study-reader.js"></script></body></html>'
    f=DIST/'formula-2015'/path/'index.html';f.parent.mkdir(exist_ok=True,parents=True);f.write_text(full,'utf8')
    routes.append(url)
taskhome=link('tasks/',['Zadania','Tasks'])
concepthome=link('concepts/',['Pojęcia','Concepts'])
old={(q['s'],q['id']):q for q in dataset['questions']}
historical={}
for line in (DIR/'worked.psv').read_text('utf8').splitlines():
    sl,year,num,*v=line.split('|')
    assert len(v)==8
    historical[(sl,int(year),num)]={'title':v[:2],'prompt':v[:2],'modelAnswer':v[2:4],'explanation':v[4:6],'criterion':v[6:8]}
byterm=defaultdict(list)
for r in rows:
    r['content']=passages(r)
    r['q']=old.get(('biologia' if r['subject']=='biology' else 'chemia',r['match']))
    r['q']=historical.get((r['subject'],r['year'],r['num']),r['q'])
    q=r['q'];focus=' '.join(q['prompt'][:1]+q['explanation'][:1]) if q else ''
    # Give the answer and the actual command more weight than the standards preamble.
    rule=r['content']['rule'];answer=r['content']['answer']
    ranks=[]
    for k,t in terms.items():
        expr=t['regex'];score=4*len(expr.findall(focus+' '+rule+' '+answer))+2*len(expr.findall(r['text'][:1600]))+min(2,len(expr.findall(r['rubric'])))
        if score>=2:ranks.append((score,k))
    r['tags']=[k for _,k in sorted(ranks,reverse=True)[:5]]
    for k in r['tags']:byterm[k].append(r)
def score_prose(key,r):
    pl=r['content'][key]
    if not pl:return ''
    en=translations.get(pl,'').replace('▁',' ').strip()
    numbers=lambda text: re.findall(r'\d+(?:[.,]\d+)?',text.replace(',','.'))
    if not en or numbers(en)!=numbers(pl):return h('p',[pl,pl])
    return h('p',[pl,en])+('<small class="en">Machine translation of the Polish wording.</small>')
def task_method(r):
    source=r['content']['ask'].lower() or r['text'].lower()
    for roots,name,advice in [
        (['oblicz','oblicze'],['Obliczenia','Calculation'],['Zapisz zależność, podstaw dane w zgodnych jednostkach i pokaż wynik z jednostką. Porównaj każdy etap ze schematem punktowania pod spodem.','State the relation, substitute the data in compatible units and give the result with its unit. Compare each step with the marking scheme below.']),
        (['uzasadnij','wyjaśnij','wykaż'],['Wyjaśnienie mechanizmu','Explaining a mechanism'],['Połącz przesłankę z mechanizmem i skutkiem. Odczytaj z kryterium, które ogniwa związku przyczynowego muszą znaleźć się w odpowiedzi.','Connect evidence to mechanism and outcome. Check the criterion to see which parts of the causal chain your answer needs.']),
        (['wniosek','sformułuj wni'],['Wniosek z danych','Inference from data'],['Porównaj konkretne wyniki badanych grup. Wniosek ma odpowiadać na pytanie badawcze i odnosić się do badanych warunków.','Compare the actual results for the groups. Make the conclusion answer the research question within the conditions studied.']),
        (['równanie','równania reakcji'],['Zapis reakcji','Writing an equation'],['Sprawdź kolejno wzory reagentów, współczynniki i ładunki. Zwróć uwagę, czy polecenie wymaga zapisu jonowego skróconego.','Check formulas, coefficients and charges in turn. Check whether the task calls for a net ionic equation.']),
        (['narysuj','naszkicuj'],['Rysunek lub schemat','Drawing a diagram'],['Odtwórz rysunek i dodaj wszystkie oznaczenia wymagane w poleceniu. Porównaj położenia elementów i opisy z oficjalnym rysunkiem.','Draw the structure and add every label requested. Compare the placement of the elements and labels with the official diagram.']),
        (['oceń','zaznacz','wybierz'],['Ocena stwierdzeń','Evaluating statements'],['Rozpatrz każdy wybór osobno. W kryterium sprawdź, ile prawidłowych zaznaczeń jest wymaganych łącznie.','Evaluate each choice separately. Check how many correct selections the marking criterion requires together.']),
        (['uzupełnij'],['Uzupełnianie danych','Completing data'],['Odczytaj nagłówki kolumn, oznaczenia i jednostki. Sprawdź wszystkie wymagane pola względem wzorca.','Read the column headings, labels and units. Check every required entry against the model.'])
    ]:
        if any(root in source for root in roots):return name,advice
    return None
def related(r):
    matches=[]
    for o in rows:
        if r['year']==o['year'] or o['subject']!=r['subject']:continue
        shared=[k for k in r['tags'] if k in o['tags']]
        if not shared:continue
        value=sum((1/(1+r['tags'].index(k))+1/(1+o['tags'].index(k)))*math.log(1+len(rows)/len(byterm[k])) for k in shared)
        matches.append((value,o,shared))
    out=[];years=set()
    for _,o,shared in sorted(matches,key=lambda a:-a[0]):
        if o['year'] in years:continue
        years.add(o['year']);out.append(tasklink(o)+' · '+bi(terms[shared[0]]['title']))
        if len(out)==4:break
    return out
def guide(r):
    q=r['q']
    if not q:return ''
    result=h('h3',['Odpowiedź wzorcowa','Model answer'])+h('p',q['modelAnswer'])+h('h3',['Tok rozumowania','Reasoning'])+h('p',q['explanation'])+h('h3',['Co daje punkt','What earns credit'])+h('p',q['criterion'])
    if q.get('structure'):
        structure=q['structure'];result+='<figure><img loading="lazy" src="'+ASSET+'media/'+structure['file']+'.webp" alt="'+escape(structure['caption'][0],quote=True)+'"><figcaption>'+bi(structure['caption'])+'</figcaption></figure>'
    if q.get('photo') and q.get('caption') and q['photo'] in dataset['photoCredits']:
        photo=q['photo'];cr=dataset['photoCredits'][photo]
        result+='<figure><img loading="lazy" src="'+ASSET+'media/'+photo+'.webp" alt="'+escape(q['caption'][0],quote=True)+'"><figcaption>'+bi(q['caption'])+' · '+link(cr['source'],[cr['credit']]*2)+' · '+(link(cr['licenseUrl'],[cr['license']]*2) if cr.get('licenseUrl') else escape(cr['license']))+'</figcaption></figure>'
    return result
def search():return '<label class="study-controls">'+bi(['Szukaj','Search'])+' <input type="search" id="study-filter" autocomplete="off"></label><output id="study-count" aria-live="polite"></output>'
import syllabus
groups,standard_links=syllabus.load(rows)
syllabushome=link('concepts/syllabus/',['Zakres Formuły 2015','Formula 2015 curriculum'])
years=defaultdict(list)
for r in rows:years[r['subject'],r['year']].append(r)
for (sl,year),tasks in years.items():
    for idx,r in enumerate(tasks):
        title=taskname(r);q=r['q'];url,key=r['urls']
        paper=link(url+'#page='+str(r['p']),['Arkusz CKE · polecenie','CKE paper · task'])
        context=link(url+'#page='+str(r['context']),['Materiał źródłowy w arkuszu','Source material in the paper'])
        marks=link(key+'#page='+str(r['m']),['Zasady oceniania CKE','CKE marking scheme'])
        body='<p class="meta">'+bi([f"Poziom rozszerzony · {r['points']} pkt",f"Extended level · {r['points']} marks"] if r['points'] else ['Poziom rozszerzony','Extended level'])+'</p>'
        question=h('p',q['prompt']) if q else score_prose('ask',r)
        question+='<div class="links">'+paper+context+'</div>'
        if r.get('stimulus'):
            question+=h('h3',['Materiał do podpunktów','Shared source material'])+''.join(taskfigure(img,title[0]+' · materiał źródłowy') for img in r['stimulus'])
        question+=''.join(taskfigure(img,title[0]+' · polecenie CKE') for img in r.get('figures',[]))
        body+=panel(['Polecenie','Question'],question)
        solution=guide(r)
        if not solution:
            solution=score_prose('answer',r)+score_prose('rule',r)
        solution+='<div class="links">'+marks+'</div>'+''.join(taskfigure(img,title[0]+' · odpowiedź i punktacja CKE') for img in r['images'])
        body+=panel(['Rozwiązanie i pełna punktacja','Solution and full-credit criteria'],solution,'worked')
        method=task_method(r)
        if method and not q:body+=panel(method[0],h('p',method[1]))
        if r['tags']:
            term=terms[r['tags'][0]]
            body+=panel(['Co trzeba rozumieć','What to understand'],h('h3',term['title'])+h('p',term['definition'])+h('p',term['example'])+'<div class="links">'+''.join(termlink(k) for k in r['tags'])+'</div>')
        standards=sorted(standard_links[(sl,year,r['num'])],key=lambda a:-a[0])[:3]
        if standards:
            body+=panel(['Powiązane wymagania programu','Related curriculum objectives'],listing([link(it['route'],it['title']) for _,it in standards]))
        sim=related(r)
        if not sim:
            matched_years=set()
            for _,objective in standards:
                for other in objective['tasks']:
                    if other['year']==year or other['year'] in matched_years:continue
                    sim.append(tasklink(other)+' · '+link(objective['route'],objective['title']))
                    matched_years.add(other['year'])
                    if len(sim)==3:break
                if len(sim)==3:break
        if not sim and method:
            candidates=[o for o in rows if o['subject']==sl and o['year']!=year and task_method(o)==method]
            chosen={}; 
            for o in candidates:chosen.setdefault(o['year'],o)
            if chosen:body+=panel(['Ta sama umiejętność w innym arkuszu','The same skill in a different paper'],h('p',method[0])+listing([tasklink(o) for o in list(chosen.values())[:3]]))
        if sim:body+=panel(['Ten sam temat w innych latach','The same topic in other years'],listing(sim))
        paging=[]
        if idx:paging.append(link(taskpath(tasks[idx-1]),['← '+tasks[idx-1]['num']]*2))
        paging.append(link(f'tasks/{sl}/{year}/',[str(year)]*2))
        if idx+1<len(tasks):paging.append(link(taskpath(tasks[idx+1]),[tasks[idx+1]['num']+' →']*2))
        write(taskpath(r),title,taskhome+link(f'tasks/{sl}/{year}/',[str(year)]*2),body+'<nav class="paging">'+''.join(paging)+'</nav>')
    links=[]
    for r in tasks:
        title=r['q']['title'] if r['q'] else (terms[r['tags'][0]]['title'] if r['tags'] else ['Polecenie i punktacja','Question and marking'])
        links.append(link(taskpath(r),[r['num']+' · '+v for v in title]))
    write(f'tasks/{sl}/{year}/',[v+' '+str(year) for v in subjects[sl]],taskhome,search()+listing(links,'deck searchable'))
intro=h('p',['Wybierz rok i numer zadania. Na stronie zadania znajdziesz odpowiedź, punktację CKE oraz powiązane pojęcia.','Choose a year and task number to see the answer, CKE marking scheme and related concepts.'])
for sl in subjects:
    intro+=h('h2',subjects[sl])+'<div class="papers">'+''.join(link(f'tasks/{sl}/{y}/',[str(y)]*2) for s,y in sorted(years,reverse=True) if sl==s)+'</div>'
write('tasks/',['Zadania maturalne','Matura exam tasks'],'',intro)

ordered=['c2','c1','c3','c5','c4','c6','c7','c8','c9','c10','c11','c12','c13','c14','c15','c16','c17','c18','b1','c19','c20','c21','c22','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12','b13','b14','b15','b16','b17','b18']
assert set(ordered)==set(chapters)
first_steps=['atom','electron','ion','mol','covalent','glucose','protein','membrane','dna']
for key,t in terms.items():
    body=panel(['Znaczenie','Meaning'],h('p',t['definition']))+panel(['Przykład krok po kroku','Worked example'],h('p',t['example']),'worked')+panel(['Pochodzenie nazwy','Origin of the name'],h('p',t['origin']))
    ch=t['ch'];body+=h('h2',['Gdzie to pasuje?','Where does this fit?'])+chapterlink(ch)
    peers=[termlink(k) for k in terms if k!=key and terms[k]['ch']==ch]
    if peers:body+=listing(peers)
    if byterm[key]:
        examples=sorted(byterm[key],key=lambda r:(0 if r['q'] else 1,r['tags'].index(key),-r['year']))
        ex=examples[0];q=ex['q']
        application=tasklink(ex)
        if q:
            application+=h('h3',q['prompt'])+h('p',q['modelAnswer'])+h('p',q['explanation'])
            if q.get('photo') and q['photo'] in dataset['photoCredits']:
                credit=dataset['photoCredits'][q['photo']]
                application+='<figure><img loading="lazy" src="'+ASSET+'media/'+q['photo']+'.webp" alt="'+escape(q['caption'][0],quote=True)+'"><figcaption>'+bi(q['caption'])+' · '+link(credit['source'],[credit['credit']]*2)+' · '+escape(credit['license'])+'</figcaption></figure>'
        else:
            application+=score_prose('ask',ex)+score_prose('rule',ex)
        body+=panel(['Jak to pojęcie pojawia się na maturze','How this concept appears on the exam'],application)
        body+=h('h2',['Zastosuj w arkuszu','Use it in a paper'])+listing([tasklink(r) for r in byterm[key]],'deck')
    if key in first_steps:
        i=first_steps.index(key)
        nextlink=termlink(first_steps[i+1]) if i+1<len(first_steps) else chapterlink('b13')
        body+='<nav class="paging">'+bi(['Dalej na ścieżce od podstaw','Next on the beginner path'])+nextlink+'</nav>'
    write('concepts/'+key+'/',t['title'],concepthome+chapterlink(ch),body)
for idx,k in enumerate(ordered):
    ch=chapters[k];graph=dataset['graphChapters'][k];draw,answer=dataset['chapterPractice'][k]
    body=h('p',graph['intro'])
    if graph['pre']:body+=h('h2',['Co poznać wcześniej','What to learn first'])+listing([chapterlink(p) for p in graph['pre']])
    terms_here=[term for term,t in terms.items() if t['ch']==k]
    if terms_here:body+=h('h2',['Pojęcia w tym dziale','Concepts in this chapter'])+listing([termlink(term) for term in terms_here],'deck')
    body+=panel(['Narysuj lub oblicz','Draw or calculate'],h('p',draw)+h('h3',['Rozwiązanie','Solution'])+h('p',answer),'worked')
    outcomes=[[row['pl'],row['en']] for row in ch['rows'] if not row.get('heading') and row.get('en')]
    if outcomes:body+=h('h2',['Umiejętności w tym dziale atlasu','Skills in this atlas chapter'])+listing([bi(outcome) for outcome in outcomes])
    body+='<p>'+link(ASSET+'mapa/#'+k,['Otwórz dział na grafie','Open chapter on the graph'])+'</p>'
    if idx+1<len(ordered):body+='<nav class="paging">'+bi(['Następny dział','Next chapter'])+chapterlink(ordered[idx+1])+'</nav>'
    write('concepts/'+k+'/',chaptername(k),concepthome,body)
start=['atom','electron','ion','mol','covalent','glucose','protein','membrane','dna']
body=h('p',['Jeśli zaczynasz od zera, przejdź kolejno przez atom, elektron i jon. Potem połącz budowę cząsteczek z działaniem komórki.','If you are starting from zero, work through atoms, electrons and ions first. Then connect molecular structure to how a cell works.'])
body+=panel(['Pierwsze pojęcia','First concepts'],listing([termlink(k) for k in start],'deck'))
body+=panel(['Pełny zakres Formuły 2015','Full Formula 2015 scope'],h('p',['Przejdź przez szczegółowe wymagania z podstawy programowej z 2012 r. dla obu przedmiotów.','Browse the detailed objectives in the 2012 curriculum for both subjects.'])+syllabushome)
body+=search()+h('h2',['Działy w kolejności nauki','Chapters in learning order'])+listing([chapterlink(k) for k in ordered],'deck searchable')
body+=h('h2',['Słownik pojęć','Concept dictionary'])+listing([termlink(k) for k in sorted(terms,key=lambda t:terms[t]['title'][0])],'deck searchable')
body+='<p>'+link('https://bip.cke.gov.pl/artykul/211/1658/egzamin-maturalny-w-formule-2015',['Informatory CKE · Formuła 2015','CKE subject guides · Formula 2015'])+'</p>'
write('concepts/',['Pojęcia od podstaw','Concepts from the beginning'],'',body)
levelnames=syllabus.levels
group_chapters={
 ('biology','foundation'):['b1','b2','b5','b17','b9','b11','b11','b14','b16','b18'],
 ('biology','basic'):['b15','b18'],
 ('biology','extended'):['b1','b2','b3','b5','b11','b14','b17','b18','b16'],
 ('chemistry','foundation'):['c1','c2','c4','c10','c5','c6','c7','c13','c12'],
 ('chemistry','basic'):['c11','c21','c21','c22','c13','c21'],
 ('chemistry','extended'):['c1','c2','c3','c4','c5','c8','c10','c10','c13','c14','c15','c16','c17','c18','c19','c20']
}
outline=panel(['Zakres przygotowań','Scope of preparation'],h('p',['CKE wskazuje podstawę programową z 2012 roku dla Formuły 2015 od 2025 roku. Zacznij od etapu III, przejdź przez podstawy etapu IV, a potem otwórz rozszerzenie.','CKE specifies the 2012 curriculum for Formula 2015 from 2025 onward. Start with stage III, continue through stage IV basic, then open the extended level.'])+'<p>'+link(syllabus.cke,['Źródło · CKE','Source · CKE'])+' · '+link(syllabus.law,['Załącznik 4 · Dziennik Ustaw','Annex 4 · official curriculum'])+'</p>')
for subject in subjects:
    outline+=h('h2',subjects[subject])
    for level,labels in levelnames.items():
        selected=[g for g in groups if (subject,level)==(g['sl'],g['scope'])]
        assert len(selected)==len(group_chapters[subject,level])
        outline+=h('h3',labels)+listing([link(g['route'],g['title']) for g in selected],'deck')
        for groupn,g in enumerate(selected):
            fallback=group_chapters[subject,level][groupn]
            groupbody=h('p',labels)+chapterlink(fallback)
            groupbody+=h('h2',['Co trzeba umieć','Learning objectives'])+listing([link(a['route'],[a['id']+' · '+x for x in a['title']]) for a in g['items']])
            write(g['route'],g['title'],concepthome+syllabushome,groupbody)
            for idx,item in enumerate(g['items']):
                prompt=item['pl']+' '+item['sub'];titles=item['title']
                keytags=sorted(((len(t['regex'].findall(prompt)),k) for k,t in terms.items()),reverse=True)
                keys=[k for n,k in keytags if n>0][:4]
                itemtitle=[v+' · '+item['id'] for v in (item['section'] if item['sub'] else g['title'])]
                body=panel(['Wymaganie szczegółowe','Learning objective'],h('p',titles)+'<p><small class="en">English reading aid translated from the Polish curriculum.</small></p>'+link(syllabus.law,['Podstawa programowa · załącznik 4','Official curriculum · Annex 4']))
                if keys:
                    for k in keys[:2]:
                        t=terms[k]
                        body+=panel(t['title'],h('p',t['definition'])+h('p',t['example'])+termlink(k))
                if item['tasks']:
                    example=item['tasks'][0];body+=h('h2',['Zastosowanie na maturze','Application in an exam'])
                    body+=listing([tasklink(r) for r in item['tasks']])
                    if example['q']:
                        q=example['q'];body+=panel(q['prompt'],h('p',q['modelAnswer'])+h('p',q['explanation']),'worked')
                    else:
                        body+=score_prose('ask',example)+score_prose('rule',example)
                if not keys and not item['tasks']:
                    draw,ans=dataset['chapterPractice'][fallback]
                    body+=panel(['Przykład wprowadzający z działu','Introductory example from the chapter'],h('p',draw)+h('p',ans)+chapterlink(fallback))
                nextitem=g['items'][idx+1] if idx+1<len(g['items']) else None
                body+='<nav class="paging">'+link(g['route'],g['title'])+(link(nextitem['route'],['Następne wymaganie →','Next objective →']) if nextitem else '')+'</nav>'
                write(item['route'],itemtitle,concepthome+syllabushome+link(g['route'],g['title']),body)
write('concepts/syllabus/',['Zakres Formuły 2015','Formula 2015 curriculum'],concepthome,outline)

guidefile=ROOT/'guide-routes.json'
existing=json.loads(guidefile.read_text('utf8'))
guidefile.write_text(json.dumps(sorted(set(existing+routes)),indent=2,ensure_ascii=False)+'\n','utf8')
# Link the original paper indexes to the reading pages; retain both PDF links.
for sl in subjects:
    f=DIST/'formula-2015'/sl/'index.html';s=Soup(f.read_text('utf8'),'html.parser')
    for lang,section in enumerate(s.select('.study-language')):
        for part in section.select('section'):
            year=int(re.search(r'20\d\d',part.h2.text)[0])
            for li in part.select('.task-index li'):
                a=li.find('a');num=a.text.split()[-1]
                if li.select_one('.reading-link'):continue
                li.append(' · ');el=s.new_tag('a',attrs={'class':'reading-link','href':BASE+f'tasks/{sl}/{year}/{num}/'})
                el.string=['Opracowanie','Study page'][lang];li.append(el)
    f.write_text(str(s),'utf8')
print(len(rows),'tasks;',len(chapters),'chapters;',len(terms),'terms;',sum(bool(related(r)) for r in rows),'cross-year mappings')
