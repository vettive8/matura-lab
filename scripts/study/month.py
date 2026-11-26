"""Build the 30-day route using the existing bilingual reader and archive."""
from pathlib import Path
from html import escape
import json
import re
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / "dist/formula-2015"
URL = "/learn/matura/formula-2015/"
ROUTE = "30-dni/"

def pair(pl, en):
    return f'<span class="pl">{escape(pl)}</span><span class="en">{escape(en)}</span>'

def link(path, label):
    assert (BASE / path / "index.html").is_file(), path
    return f'<a href="{URL}{path}/">{label}</a>'

def chapter(slug):
    path = "concepts/" + slug
    heading = BeautifulSoup((BASE / path / "index.html").read_text("utf8"), "html.parser").h1
    return link(path, heading.decode_contents())

def day(number, title, body):
    return f'<section id="d{number}"><small>{pair("Dzień","Day")} {number:02}</small><h3>{title}</h3>{body}</section>'

def paper(subject, year):
    name = {"biology":"biologia","chemistry":"chemia"}[subject]
    base = f"https://arkusze.pl/maturalne/{name}-{year}-maj-matura-stara-rozszerzona"
    return f'<a href="{base}.pdf">{pair("Czysty arkusz PDF","Blank paper PDF")}</a> · <a href="{base}-odpowiedzi.pdf">{pair("Zasady oceniania","Mark scheme")}</a> · '+link(f"tasks/{subject}/{year}",pair("Opracowania zadań","Task walkthroughs"))

title = pair("Biologia i chemia w 30 dni","Biology and chemistry in 30 days")
blocks = [f'<p>Formuła 2015 · {pair("Poziom rozszerzony","Extended level")}</p><h1>{title}</h1>']
def para(pl,en):
    return "<p>"+pair(pl,en)+"</p>"
blocks.append(para("Jeśli zaczynasz od zera, 100% z obu przedmiotów po miesiącu jest mało realistyczne. Przez te 30 dni zbudujesz podstawy i zmierzysz, ile jeszcze dzieli cię od celu. Każdy przedmiot oceniaj oddzielnie.","If you are starting from zero, full marks in both subjects after a month is unlikely. Use these 30 days to build foundations and measure how far you are from your goal. Track the two subjects separately."))
blocks.append(para("Zacznij dziś od chemii i jeszcze dziś przejdź do biologii. Różnica między atomem i jonem pomoże ci zrozumieć sygnał nerwowy. Następnego dnia wiązania wyjaśnią zachowanie wody. Do nauki biologii nie musisz ukończyć całego kursu chemii.","Start with chemistry today and use it in biology the same day. The distinction between an atom and an ion helps explain a nerve signal. Tomorrow, bonding will help explain how water behaves. You can begin biology before finishing chemistry."))
blocks.append(para("Na zwykły dzień zaplanuj około 2 godzin: 15 min na odtworzenie wczorajszej lekcji, 35 min na pojęcia, 50 min na zadania z obu przedmiotów i 20 min na porównanie z kluczem. Przy mniejszej ilości czasu podziel dzień na dwie sesje. Na pełny arkusz zarezerwuj osobno 180 minut.","Allow about two hours on a study day: 15 minutes recalling yesterday, 35 on concepts, 50 on tasks from both subjects and 20 comparing answers with the mark scheme. With less time, split a day into two sessions. Reserve a separate 180 minutes for each full paper."))
weeks=[(1,"Podstawy","Foundations"),(8,"Procesy i obliczenia","Processes and calculations"),(15,"Organika i genetyka","Organic chemistry and genetics"),(22,"Synteza i arkusze","Integration and exams")]
blocks.append('<nav class="weeks">'+ ' '.join(f'<a href="#d{n}">{pair("Dzień","Day")} {n} · {pair(pl,en)}</a>' for n,pl,en in weeks)+'</nav>')
rows=Path(__file__).with_name("month.psv").read_text("utf-8-sig").splitlines()
assert len(rows)==24
for n,row in enumerate(rows,1):
    pl,en,terms,refs,prompt,translation=row.split("|")
    tasks=[]
    for subject,ref in zip(("chemistry","biology"),refs.split(),strict=True):
        year,num=ref.split("/")
        label=pair("Chemia","Chemistry") if subject=="chemistry" else pair("Biologia","Biology")
        tasks.append(link(f"tasks/{subject}/20{year}/{num}",label+f" · 20{year} · {num}"))
    body='<p>'+ ' · '.join(chapter(t) for t in terms.split())+'</p>'+para(prompt,translation)+'<p>'+pair("Przećwicz w arkuszu","Practise with the paper")+' — '+' · '.join(tasks)+'</p>'
    blocks.append(day(n,pair(pl,en),body))
for n,subject,year in [(25,"biology",2025),(26,"chemistry",2025),(28,"biology",2026),(29,"chemistry",2026)]:
    if n==28:
        blocks.append(day(27,pair("Odzyskaj utracone punkty","Recover lost marks"),para("Podziel błędy z obu arkuszy na brak wiedzy, błędne odczytanie danych i niepełną odpowiedź. Wybierz dwa najkosztowniejsze tematy z każdego przedmiotu. Wróć do odpowiednich pojęć i rozwiąż po jednym nowym zadaniu na każdy temat.","Sort errors in both papers into knowledge gaps, misread data and incomplete answers. Pick the two costliest topics per subject. Revisit the concepts and attempt one fresh question for each topic.")+link("concepts",pair("Znajdź pojęcie","Find a concept"))))
    label=pair("Biologia · cały arkusz","Biology · full paper") if subject=="biology" else pair("Chemia · cały arkusz","Chemistry · full paper")
    blocks.append(day(n,label+f" · {year}",para("Otwórz czysty arkusz. Pracuj 180 minut, potem porównaj każdy podpunkt z zasadami oceniania. Wynik procentowy = zdobyte punkty ÷ 60 × 100. Jeśli znasz ten arkusz, wybierz nierozwiązywany rocznik i jego klucz.","Open the blank paper. Work for 180 minutes, then compare every subpart with the mark scheme. Percentage = marks earned ÷ 60 × 100. If you know this paper, choose an unseen year with its matching mark scheme.")+paper(subject,year)))
blocks.append(day(30,pair("Co umiesz samodzielnie?","What can you do independently?"),para("Porównaj dwa wyniki z biologii i dwa z chemii. Dla każdej utraty punktu w drugim arkuszu odszukaj wymaganie i rozwiąż inne zadanie z tego działu. Jeśli nadal tracisz punkty, zaplanuj kolejny tydzień wokół najsłabszego działu. Powtarzalne 60/60 na nieznanych arkuszach w limicie czasu to lepszy sprawdzian gotowości niż ukończenie kalendarza.","Compare your two biology scores and your two chemistry scores. For every mark lost in the second paper, find the objective and try another question on that topic. If marks still slip, spend the next week on your weakest area. Repeated scores of 60/60 on unseen timed papers are a better readiness check than finishing the calendar.")+link("concepts/syllabus",pair("Zakres wymagań","Curriculum objectives"))+" · "+link("tasks",pair("Wybierz kolejny arkusz","Choose another paper"))))
blocks.append('<p><a href="https://egzaminy.gov.pl/cke/tresc/informatory-egzamin-maturalny-formula-2015">'+pair("Informatory CKE","CKE exam guides")+'</a></p>')
template=(BASE/"concepts/atom/index.html").read_text("utf8")
style='<style>.weeks{display:flex;gap:.7rem;flex-wrap:wrap;margin:2rem 0}.weeks a{padding:.45rem .8rem;border:1px solid var(--edge);border-radius:8px}section[id]{scroll-margin:1rem;margin:1rem 0;padding:1.2rem clamp(1rem,3vw,2rem);border:1px solid var(--edge);border-radius:14px;background:var(--paper)}section[id] h3{margin:.25rem 0 .8rem;font-size:1.6rem}section small{color:var(--link);font-weight:600}</style>'
html=re.sub(r"<main>.*?</main>","<main>"+"".join(blocks)+"</main>",template,flags=re.S)
html=html.replace("Atom | Mervive","Biologia i chemia w 30 dni | Mervive").replace(URL+"concepts/atom/\">",URL+ROUTE+'">',1).replace("</head>",style+"</head>")
(BASE/ROUTE).mkdir(exist_ok=True)
(BASE/ROUTE/"index.html").write_text(html,"utf8")
routes=ROOT/"guide-routes.json"
routes.write_text(json.dumps(sorted(set(json.loads(routes.read_text("utf8"))+[URL+ROUTE])),ensure_ascii=False,indent=2)+"\n","utf8")
