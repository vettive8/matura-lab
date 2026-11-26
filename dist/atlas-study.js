const say=(pl,en)=>translate([pl,en]);
const safe=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const paragraph=s=>'<p>'+safe(s)+'</p>';
const link=(href,s)=>'<a href="'+safe(href)+'">'+safe(s)+'</a>';
const part=(label,text)=>'<h3>'+safe(label)+'</h3>'+paragraph(text);
const openNode=(id,title)=>link('#'+id,title??translate(nodes.get(id).title));
const bullet=items=>items.length?'<ul>'+items.map(x=>'<li>'+x+'</li>').join('')+'</ul>':'';
const formulas={
 atom:['n = m/M · N = nNₐ','18 g H₂O / (18 g/mol) = 1 mol ≈ 6,02 × 10²³ cząsteczek.','18 g H₂O / (18 g/mol) = 1 mol ≈ 6.02 × 10²³ molecules.'],
 water:['c = n/V · c₁V₁ = c₂V₂','Przy rozcieńczaniu liczba moli substancji pozostaje stała. Podstaw objętości w tych samych jednostkach.','During dilution the amount of solute stays constant. Use the same volume units on both sides.'],
 ph:['pH ≈ −log₁₀([H⁺]/(1 mol/L))','Dla rozcieńczonego roztworu o [H⁺] = 10⁻³ mol/l otrzymujesz pH ≈ 3.','For a dilute solution with [H⁺] = 10⁻³ mol/L, pH ≈ 3.'],
 albumin:['35 = 2 × 17 + 1','Dwie cysteiny na mostek dają najwyżej 17 mostków wewnątrz jednej cząsteczki albuminy.','Two cysteines per bridge give at most 17 bridges within one albumin molecule.'],
 membrane:['S/V = 6/a','Dla sześciennej komórki o boku a powierzchnia wynosi 6a², a objętość a³. Dwukrotnie większy bok daje dwukrotnie mniejszy stosunek S/V.','For a cubic cell of side a the surface area is 6a² and volume is a³. Doubling the side halves S/V.'],
 dna:['p² + 2pq + q² = 1','Dwa allele w równowadze Hardy’ego–Weinberga: gdy q² = 0,04, q = 0,2 i p = 0,8. Częstość heterozygot wynosi 2pq = 0,32.','For two alleles in Hardy–Weinberg equilibrium, q² = 0.04 gives q = 0.2 and p = 0.8. Heterozygote frequency is 2pq = 0.32.'],
 nature:['η = E₂/E₁ × 100%','Gdy z 2000 kJ na następny poziom troficzny przechodzi 140 kJ, sprawność transferu wynosi 7%.','If 140 kJ of 2,000 kJ reaches the next trophic level, transfer efficiency is 7%.'],
 evidence:['Δ% = (x₂ − x₁)/x₁ × 100%','Wzrost z 20 do 25 oznacza wzrost o 25%. Wskaż wartość początkową i jednostki pomiaru.','A rise from 20 to 25 is a 25% increase. Identify the starting value and measurement units.']
};
function taskLinks(ids) {
 return bullet(ids.map(k=>{const i=questions.findIndex(q=>compactQuestion(q)===k);return openNode('q'+(i+1),(k[0]==='b'?say('Biologia','Biology'):say('Chemia','Chemistry'))+' · '+questions[i].id+' · #'+(i+1));}));
}
function illustrate(q) {
 const file='../media/'+q.photo+'.webp',cr=photoCredits[q.photo];
 return '<figure><a href="'+file+'"><img loading="lazy" src="'+file+'" alt="'+safe(translate(q.caption))+'"></a><figcaption>'+safe(translate(q.caption))+'<br>'+link(cr.source,cr.credit)+' · '+(cr.licenseUrl?link(cr.licenseUrl,cr.license):safe(cr.license))+'</figcaption></figure>'+
 (q.structure?'<figure><img loading="lazy" src="../media/'+q.structure.file+'.webp" alt="'+safe(translate(q.structure.caption))+'"><figcaption>'+safe(translate(q.structure.caption))+'</figcaption></figure>':'');
}
function chapterCard(id) {
 const c=graphChapters[id],p=chapterPractice[id];
 return part(say('Zapisz','Write down'),translate(c.intro))+part(say('Narysuj i podpisz','Draw and label'),translate(p[0]))+
 part(say('Przykładowe rozwiązanie','Worked example'),translate(p[1]))+(c.qs.length?illustrate(questions.find(q=>compactQuestion(q)===c.qs[0])):'')+taskLinks(c.qs)+link('../graf/#chapter/'+id,say('Wszystkie punkty rozdziału','Every item in this chapter'));
}
function study(n) {
 const d=n.data;
 if(n.kind==='paper')return paragraph(say('Rozwiąż wybrane zadanie na czystej kartce. Podpisz rysunek, podaj jednostki lub uzasadnij mechanizm zgodnie z poleceniem. W zasadach oceniania odszukaj numer zadania i sprawdź, za który element przyznaje się każdy punkt.','Work through a question on blank paper. Label the diagram, show units or explain the mechanism as requested. Find the question number in the marking guide and identify what earns each point.'))+bullet([link(d.urls[0],say('Otwórz arkusz CKE','Open CKE paper')),link(d.urls[1],say('Otwórz zasady oceniania','Open marking guide')),link('https://bip.cke.gov.pl/attachments/download/10004',say('Wzory i stałe','Formula booklet'))]);
 if(n.kind==='general')return paragraph(translate(n.title))+link('../zagadnienia/',say('Wymagania ogólne i źródła','General requirements and sources'));
 if(n.kind==='chapter')return chapterCard(d);
 if(n.kind==='item')return paragraph(translate(n.title))+'<h3>'+say('Ćwiczenie z tego rozdziału','Practice from this chapter')+'</h3>'+chapterCard(d.chapter);
 if(n.kind==='exam'){
   const q=questions[d];return '<small>'+say('Maj 2026 · zadanie ','May 2026 · question ')+q.id+' · #'+(d+1)+'</small>'+part(say('Polecenie własnymi słowami','Task in study wording'),translate(q.prompt))+part(say('Odpowiedź','Answer'),translate(q.modelAnswer))+part(say('Co decyduje o punktach','What earns credit'),translate(q.criterion))+paragraph(translate(q.explanation))+illustrate(q)+link('../#'+q.s+'/'+q.id,say('Arkusz i oficjalne zasady oceniania','Paper and official marking guide'));
 }
 if(n.kind==='course'){const c=uzCourses[d];return paragraph(translate(c.connection))+link('../graf/#course/'+(d+1),say('Przedmiot, zadanie i sylabus UZ','Course, exam question and UZ syllabus'));}
 if(n.kind==='stage'){const p=graphPaths[d.topic];return paragraph(translate(p.stages[d.index-1]))+(d.topic==='albumin'?paragraph(translate(albuminExamples[d.index])):'')+link('../graf/#topic/'+d.topic,say('Lekcja i doświadczenie','Lesson and experiment'))+(d.index>=2&&d.index<=7?' · '+link('../graf/#stage/'+d.stage,say('Przedmioty na tym roku UZ','Actual UZ courses for this year')):'');}
 const f=formulas[n.domain],p=workedLessons[d];
 return (p?part(translate(p[0]),translate(p[1]))+paragraph(translate(p[2])):chapterCard('b17'))+
 part(f[0],translate(f.slice(1)))+(p?link('../graf/#topic/'+d,say('Uruchom doświadczenie','Open the experiment')):'')+
 bullet(domains[d][5].split(' ').filter(Boolean).map(id=>openNode(id)))+
 link('https://bip.cke.gov.pl/attachments/download/10004',say('CKE · wzory i stałe','CKE · formula and constants booklet'));
}
