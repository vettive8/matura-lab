"""Rebuild public search guides from atlas content: python scripts/build-guides.py (requires beautifulsoup4)."""
from copy import deepcopy
from html import escape
import json
from pathlib import Path
import subprocess
from bs4 import BeautifulSoup

dist = Path(__file__).resolve().parents[1] / "dist"
base = "/learn/matura/"
host = "https://mervive.com"
medicine = BeautifulSoup((dist / "medicine.html").read_text(encoding="utf8"), "html.parser")
data_script = "for(const f of ['questions','media','map-lessons'])require('vm').runInThisContext(require('fs').readFileSync(f+'.js','utf8'));console.log(JSON.stringify([questions,photoCredits,workedLessons]))"
questions, credits, lessons = json.loads(subprocess.check_output(["node", "-e", data_script], cwd=dist))
pages = {}

def add(key, paths, names, descriptions, bodies):
    pages[key] = (paths, names, descriptions, bodies)

def anchor(path, text):
    return f'<a href="{escape(path, quote=True)}">{escape(text)}</a>'

def heading(title, text):
    return f"<h2>{escape(title)}</h2><p>{escape(text)}</p>"

def excerpt(tag, i):
    block = deepcopy(tag)
    for el in [block, *block.find_all(True)]:
        if el.has_attr("data-en"):
            value = el.get(["data-pl","data-en"][i])
            el.string = value
            del el["data-en"], el["data-pl"]
        if el.get("href","").startswith("/learn/matura/#") and i:
            el["href"] = el["href"].replace("/#","/?lang=en#")
    if block.name == "dd":
        block.name = "div"
    return str(block)

def lesson(i):
    intro = [
        ("Jak czytać H₂O?", "H to wodór, O to tlen. W H₂O mała dwójka odnosi się do wodoru. Narysuj H–O–H i policz trzy atomy w jednej cząsteczce wody."),
        ("How do you read a chemical formula?", "H stands for hydrogen and O for oxygen. In H₂O the small 2 applies to hydrogen. Draw H–O–H and count the three atoms in one water molecule.")
    ][i]
    sections = [heading(*intro)]
    for key in ["water","albumin","dna"]:
        q, explanation, practice = lessons[key]
        sections.append(heading(q[i],explanation[i]) + "<p>"+escape(practice[i])+"</p>")
    return "".join(sections)

add("science",["biologia-i-chemia-od-podstaw","en/biology-and-chemistry"],
    ["Biologia i chemia od podstaw","Learn biology and chemistry from the beginning"],
    ["Przećwicz wzory chemiczne, stężenie, białka i dziedziczenie. Zacznij od cząsteczki wody i przejdź do zadania maturalnego.",
     "Learn chemical formulas, dilution, proteins and inheritance through drawings and worked examples. Start with water and follow the interactive science lessons."],
    [lesson(i) for i in range(2)])

for country, key, pl, en, idx, admission in [
    ("United Kingdom","uk","Wielkiej Brytanii","the UK",2,2),
    ("United States","us","USA","the US",1,1)]:
    names = [f"Jak zostać lekarzem w {pl}?",f"How to become a doctor in {en}"]
    descriptions = (["Od przedmiotów szkolnych i UCAT do studiów medycznych, Foundation Programme i specjalizacji w Wielkiej Brytanii.",
                     "Explore UK medical school entry, A-level subjects, the UCAT, the Foundation Programme and specialty training, with an Oxford course example."] if key=="uk" else
                    ["Droga na medycynę w USA: przedmioty na studiach, MCAT, medical school, rezydentura i licencja stanowa.",
                     "Follow the US path from college science prerequisites and the MCAT to medical school, residency and state licensure. See how it differs from studying in Poland."])
    entry=medicine.select("#knowledge dt")[admission]
    panel=medicine.select("article.panel")[idx]
    assert panel.h3["data-en"]==country
    uni=next(dt for dt in medicine.select("#sylabuz dt") if dt["data-en"].startswith("Oxford" if key=="uk" else "Harvard"))
    bodies=[]
    for i in range(2):
        body='<h2>'+["Jakie przedmioty są potrzebne?","What subjects do you need?"][i]+'</h2>'+excerpt(entry.find_next_sibling("dd"),i)
        body+=excerpt(panel.dl,i)+' · '.join(excerpt(a,i) for a in panel.select("a"))
        body+='<h2>'+uni[["data-pl","data-en"][i]]+'</h2>'+excerpt(uni.find_next_sibling("dd"),i)
        if key=="us":
            body+=excerpt(next(s for s in medicine.select("section.bridge") if s.h2 and s.h2.get("data-en","").startswith("Polish medical degree")),i)
        official=("https://www.medschools.ac.uk/for-students/" if key=="uk" else "https://students-residents.aamc.org/medical-school-admission-requirements/admission-requirements")
        bodies.append(body+anchor(official,"Medical Schools Council" if key=="uk" else "AAMC admission requirements"))
    add(key,["jak-zostac-lekarzem/"+key,"en/how-to-become-a-doctor/"+key],names,descriptions,bodies)

for key, section, paths,names,descs in [
    ("schools","#sylabuz",["program-studiow-lekarskich","en/medical-school-curriculum"],["Program studiów lekarskich w Polsce i za granicą","What do you learn in medical school?"],["Poznaj program UZ na przykładzie albuminy i porównaj go z Oxfordem, Harvardem, Monash i Maastricht.","Follow albumin from biochemistry to clinical training and compare the medical curricula at Zielona Góra, Oxford, Harvard, Monash and Maastricht."]),
    ("systems","#systems",["porownanie-systemow-zdrowia","en/healthcare-systems-compared"],["Porównanie systemów ochrony zdrowia","How do healthcare systems compare?"],["Porównaj dostęp, koszty i wyniki opieki w badaniu Mirror, Mirror 2024 oraz osobne dane OECD dla Polski.","Compare access, affordability and outcomes in the Commonwealth Fund’s 2024 study, with a separate OECD comparison for Poland."])]:
    add(key,paths,names,descs,[excerpt(medicine.select_one(section),i) for i in range(2)])

for subject, number, names in [
 ("biologia","1.1",["Albumina i mostki disiarczkowe – zadanie 1.1","Albumin and disulfide bridges – biology question 1.1"]),
 ("chemia","11.1",["Obliczanie stężenia jonów – zadanie 11.1","Calculating ion concentration – chemistry question 11.1"])]:
    q=next(q for q in questions if q["s"]==subject and q["id"]==number)
    slug=number.replace(".","-")
    paths=[f"{subject}/2026/maj/zadanie-{slug}",f"en/{'biology' if subject=='biologia' else 'chemistry'}/2026/may/question-{slug}"]
    bodies=[]
    for i in range(2):
        body='<p>'+["Matura rozszerzona · maj 2026","Polish advanced matura · May 2026"][i]+'</p>'
        for field,labels in [('modelAnswer',['Odpowiedź','Worked answer']),('criterion',['Za co otrzymasz punkt?','What earns credit?']),('explanation',['Wyjaśnienie','Explanation'])]:
            body+=heading(labels[i],q[field][i])
        cr=credits[q["photo"]]
        body+=f'<figure><img src="{base}media/{q["photo"]}.webp" alt="{escape(q["caption"][i],quote=True)}"><figcaption>{escape(q["caption"][i])} · {anchor(cr["source"],cr["credit"])} · {anchor(cr["licenseUrl"],cr["license"]) if cr["licenseUrl"] else escape(cr["license"])}</figcaption></figure>'
        body+=anchor(base+("?lang=en" if i else "")+"#"+subject+"/"+number,["Zobacz arkusz i oficjalne zasady oceniania","Open the paper and official marking guide"][i])
        bodies.append(body)
    add(subject,paths,names,q["prompt"],bodies)

for key,(paths,names,descs,bodies) in pages.items():
    for i,language in enumerate(["pl","en"]):
        url=base+paths[i]+"/"
        alt=base+paths[1-i]+"/"
        related=[anchor(base+page[0][i]+"/",page[1][i]) for other,page in pages.items() if other!=key]
        alternates=''.join(f'<link rel="alternate" hreflang="{lng}" href="{host}{base}{path}/">' for lng,path in zip(["pl","en"],paths))
        atlas=anchor(base+"mapa/"+("?lang=en" if i else "")+"#learn/atom",["Rozpocznij pierwszą lekcję","Start the first interactive lesson"][i])
        html=f'''<!doctype html><html lang="{language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(names[i])} | Mervive</title><meta name="description" content="{escape(descs[i],quote=True)}"><link rel="canonical" href="{host}{url}">{alternates}<link rel="stylesheet" href="{base}search-guides.css"></head><body><header>{anchor("/discover/","Mervive")} <a lang="{["en","pl"][i]}" href="{alt}">{["EN","PL"][i]}</a></header><main><h1>{escape(names[i])}</h1><p class="intro">{escape(descs[i])}</p>{bodies[i]}<p>{atlas}</p><nav><h2>{["Czytaj dalej","Continue learning"][i]}</h2><ul>{''.join("<li>"+a+"</li>" for a in related)}</ul></nav></main></body></html>'''
        target=dist/paths[i]/"index.html"
        target.parent.mkdir(parents=True,exist_ok=True)
        target.write_text(html,encoding="utf8")
urls=[base+p+"/" for page in pages.values() for p in page[0]]
(dist.parent/"guide-routes.json").write_text(json.dumps(urls,indent=2)+"\n",encoding="utf8")
