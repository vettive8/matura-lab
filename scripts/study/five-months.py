"""Build the five-month plan against every archived curriculum objective."""
import json
import re
from collections import Counter
from html import escape
from pathlib import Path
from bs4 import BeautifulSoup
from syllabus import levels, section_titles

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
BASE = ROOT / "dist/formula-2015"
URL = "/learn/matura/formula-2015/"
slug = "plan-90"
subjects = {"biology": ("Biologia", "Biology"), "chemistry": ("Chemia", "Chemistry")}

def bi(pl, en):
    return f'<span class="pl">{escape(pl)}</span><span class="en">{escape(en)}</span>'

def link(path, title):
    assert (BASE / path / "index.html").is_file(), path
    return f'<a href="{URL}{path}/">{title}</a>'

def read(path):
    return BeautifulSoup((BASE / path / "index.html").read_text("utf8"), "html.parser")

def lesson(ch):
    return link("concepts/"+ch, read("concepts/"+ch).h1.decode_contents())

groups = {}
seen = set()
counts = Counter()
english = json.loads((HERE/"requirements-en.json").read_text("utf8"))
for g in json.loads((HERE/"requirements.json").read_text("utf8")):
    domain = g["sl"], g["scope"]
    counts[domain] += 1
    groups[(*domain, counts[domain])] = g

def objectives(sub, refs):
    blocks = []
    for ref in refs.split():
        if ref == "–":
            continue
        scope = {"F":"foundation","B":"basic","E":"extended"}[ref[0]]
        num, _, limits = ref[1:].partition(":")
        idx = int(num)
        g = groups[sub,scope,idx]
        start,end = map(int,limits.split("-")) if limits else (1,len(g["items"]))
        labels = bi(g["name"].replace(". Liczeń:",""), section_titles[sub,scope][idx-1])
        items = []
        for i in range(start,end+1):
            item = g["items"][i-1]
            path = f"concepts/syllabus/{sub}/{scope}/{idx}/{i}"
            assert path not in seen
            seen.add(path)
            items.append("<li>"+link(path,escape(item["id"])+" · "+bi(item["pl"],english[item["pl"]]))+"</li>")
        blocks.append('<details><summary>'+bi(*levels[scope])+" · "+labels+f' ({len(items)})</summary><ul>'+"".join(items)+"</ul></details>")
    return "".join(blocks)

def paper(sub, year):
    path = f"tasks/{sub}/{year}"
    first = next((BASE/path).glob("*/index.html")).parent.name
    anchors = read(path+"/"+first).select('main a[href^="http"]')
    urls = list(dict.fromkeys(a["href"].split("#")[0] for a in anchors if ".pdf" in a["href"]))
    assert len(urls)==2,(sub,year,urls)
    return f'<a href="{urls[0]}">{bi("Arkusz PDF","Blank paper")}</a> · <a href="{urls[1]}">{bi("Klucz","Mark scheme")}</a> · '+link(path,bi("Rozwiązania","Solutions"))

def score(sub, n):
    return f'<label>{bi("Wynik","Marks")} <input inputmode="numeric" type="number" min="0" max="60" step="1" data-score="{sub}-{n}"> / 60 <output></output></label>'

title=bi("Pięć miesięcy do matury","Five months to the Matura")
month_names=[("Od atomu do komórki","From atom to cell"),("Różnorodność i reakcje","Diversity and reactions"),("Człowiek i chemia organiczna","Human biology and organic chemistry"),("Dziedziczenie i środowisko","Inheritance and the environment"),("Arkusze i odzyskiwanie punktów","Past papers and recovering marks")]
parts=['<p>Formuła 2015 · '+bi("Poziom rozszerzony","Extended level")+'</p><h1>'+title+'</h1><p>'+bi("Cel to 54/60 z biologii i osobno 54/60 z chemii. Poniżej znajdziesz wszystkie 682 wymagania ujęte w atlasie, w tym 444 rozszerzone. Rozwiń dział, aby zobaczyć każde wymaganie i otworzyć jego stronę.","Aim for 54/60 in biology and separately 54/60 in chemistry. The plan includes all 682 objectives indexed in the atlas, including 444 at extended level. Expand a topic to see each objective and open its study page.")+'</p><a class="start" href="#w1">'+bi("Zacznij od tygodnia 1 →","Start with week 1 →")+'</a><nav class="months">'+''.join(f'<a href="#m{i}">{bi("Miesiąc","Month")} {i}</a>' for i in range(1,6))+'</nav>']
parts.append('<section class="panel"><h2>'+bi("Jak pracować przez tydzień","How to use a week")+'</h2><p>'+bi("Założenie planu to sześć dni nauki po sześć godzin. W dni 1–4 przeznacz po dwie godziny na chemię, biologię i zadania z obu przedmiotów. Zacznij od podlinkowanych lekcji, a potem przejdź przez wymagania. Angielskie wersje wymagań służą jako pomoc w czytaniu.","The plan assumes six study days of six hours each. On days 1–4 spend two hours each on chemistry, biology and tasks from both subjects. Start with the linked lessons, then work through the objectives. English translations of the objectives are reading aids.")+'</p><p>'+bi("Dzień 5 poświęć na doświadczenia, wykresy i obliczenia. W dniu 6 rozwiąż bez pomocy zadania z obu przedmiotów, sprawdź je z kluczem i ponów zadania, w których tydzień temu straciłeś punkty. Pierwsza para zadań w każdym tygodniu to punkt wyjścia. Następne dobieraj z odsyłaczy do innych roczników.","Use day 5 for experiments, graphs and calculations. On day 6 attempt tasks from both subjects unaided, score them with the key and retry last week’s missed questions. The first pair of tasks in each week is a starting point. Follow cross-year links for more practice.")+'</p></section>')
rows = (HERE/'five-months.psv').read_text('utf-8-sig').splitlines()[1:]
for n in range(1,23):
    if n in (1,5,9,14,18):
        m=(1,5,9,14,18).index(n)+1
        parts.append(f'<h2 id="m{m}">'+bi("Miesiąc","Month")+f' {m} · '+bi(*month_names[m-1])+'</h2>')
    parts.append(f'<article class="panel" id="w{n}"><h3>'+bi("Tydzień","Week")+f' {n}</h3>')
    if n<=16:
        b,c,br,cr,bt,ct,pl,en=rows[n-1].split("|")
        parts.append('<p>'+bi(pl,en)+'</p>')
        for sub,chapters,refs,task in [("chemistry",c,cr,ct),("biology",b,br,bt)]:
            y,num=task.split("/")
            parts.append('<section><h4>'+bi(*subjects[sub])+'</h4><p>'+' · '.join(lesson(ch) for ch in chapters.split())+'</p><p>'+link(f'tasks/{sub}/20{y}/{num}',bi("Zadanie","Task")+f' · 20{y} · {num}')+'</p>'+objectives(sub,refs)+'</section>')
        if n in (4,8,12,16):
            year={4:2015,8:2016,12:2025,16:2026}[n]
            parts.append('<h4>'+bi("Sprawdź wynik z obu przedmiotów","Check both subject scores")+'</h4><p>'+bi("W ostatnie dwa dni tygodnia rozwiąż po jednym nieznanym arkuszu w 180 minut. Oddziel straty z działów, które są jeszcze przed tobą, od błędów w już przerobionych tematach.","During the final two days of the week, sit one unseen paper per day in 180 minutes. Separate marks lost on topics still ahead from errors on topics already studied.")+'</p>')
            for sub in subjects:
                parts.append('<section><h4>'+bi(*subjects[sub])+f' · {year}</h4><p>'+paper(sub,year)+'</p>'+score(sub,n)+'</section>')
    else:
        year=[2017,2018,2019,2020,2021,2022][n-17]
        parts.append('<p>'+bi(f"Rozwiąż arkusze z {year} r. w osobne dni, po 180 minut każdy. Jeśli znasz arkusz, wybierz inny, którego jeszcze nie widziałeś. W pozostałe dni wróć do dwóch działów z największą stratą punktów w każdym przedmiocie.",f"Sit the {year} papers on separate days, allowing 180 minutes each. If a paper is familiar, substitute an unseen one. Use the remaining days to revisit the two topics that cost the most marks in each subject.")+'</p>')
        for sub in subjects:
            parts.append('<section><h4>'+bi(*subjects[sub])+'</h4><p>'+paper(sub,year)+'</p>'+score(sub,n)+'</section>')
    parts.append('</article>')
parts.append('<p>'+bi("Wyniki zapisują się w tej przeglądarce. Porównaj ostatnie trzy nieznane arkusze osobno dla każdego przedmiotu. Powtarzalne 54/60 lub więcej w limicie czasu daje podstawę do celowania w 90%.","Scores are saved in this browser. Compare your last three unseen timed papers separately for each subject. Consistently scoring 54/60 or more supports aiming for 90%.")+'</p>'+link('concepts/syllabus',bi("Pełny indeks wymagań","Full curriculum index"))+' · '+link('tasks',bi("Wszystkie arkusze","All papers")))
assert len(seen)==sum(len(g["items"]) for g in groups.values())==682
template=(BASE/'concepts/atom/index.html').read_text('utf8')
style='<style>.months{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0}.months a,.start{display:inline-block;border:1px solid var(--edge);border-radius:8px;padding:7px 12px}.start{background:var(--link);color:var(--paper);font-weight:600}.panel section{border-top:1px solid var(--edge);padding:10px 0}.panel section p,.panel h4{margin:.4em 0}details{padding:5px 0}summary{cursor:pointer;color:var(--link)}li{margin:.45em 0}input[type=number]{width:5em}</style>'
html=re.sub(r'<main>.*?</main>',lambda _: '<main>'+''.join(parts)+'</main>',template,flags=re.S)
html=html.replace('Atom | Mervive','Pięć miesięcy do matury | Mervive').replace(URL+'concepts/atom/',URL+slug+'/',1).replace('</head>',style+'</head>').replace('</body>','<script src="/learn/matura/plan-scores.js"></script></body>')
(BASE/slug).mkdir(exist_ok=True)
(BASE/slug/'index.html').write_text(html,'utf8')
routes=ROOT/'guide-routes.json'
routes.write_text(json.dumps(sorted(set(json.loads(routes.read_text('utf8'))+[URL+slug+'/'])),indent=2,ensure_ascii=False)+'\n','utf8')
