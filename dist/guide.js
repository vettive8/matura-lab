const byId = id => document.getElementById(id);
const glossaryMode = location.pathname.split('/').includes('koncepty');
const tr = (pl,en) => lang === 'pl' ? pl : en;
const glossary = [
 ['Albumina','Albumin','Białko rozpuszczalne w osoczu. Wiąże między innymi kwasy tłuszczowe, dzięki czemu mogą przemieszczać się z krwią.','A soluble plasma protein. It binds substances such as fatty acids so they can travel through the blood.','Łacińskie albumen oznaczało białko jaja; pochodzi od albus, czyli biały. Nazwa nawiązuje do substancji białkowych poznanych w białku jaja.','Latin albumen meant egg white, from albus, white. The name recalls proteins first studied in egg white.','albumin'],
 ['Atom','Atom','Najmniejsza jednostka pierwiastka zachowująca jego tożsamość chemiczną. O tym, jaki to pierwiastek, decyduje liczba protonów w jądrze.','The smallest unit retaining the chemical identity of an element. The number of protons in its nucleus determines which element it is.','Greckie atomos znaczyło niepodzielny: a- oznacza przeczenie, a rdzeń tom- odnosi się do cięcia. To ślad dawnego wyobrażenia o materii.','Greek atomos meant indivisible: a- negates a root referring to cutting. The name records an early view of matter.','atom'],
 ['Izotop','Isotope','Atomy tego samego pierwiastka mogą mieć różną liczbę neutronów. Na przykład węgiel-12 i węgiel-14 mają po sześć protonów, lecz odpowiednio sześć i osiem neutronów.','Atoms of one element can have different neutron counts. Carbon-12 and carbon-14 both have six protons, but have six and eight neutrons respectively.','Greckie isos oznacza równy, a topos miejsce. Izotopy zajmują to samo miejsce w układzie okresowym.','Greek isos means equal and topos means place. Isotopes occupy the same place in the periodic table.','isotope'],
 ['Enzym','Enzyme','Katalizator biologiczny. Przyspiesza reakcję, obniżając jej barierę energetyczną, i może działać ponownie. Przykład: amylaza pomaga rozkładać skrobię.','A biological catalyst. It speeds up a reaction by lowering its energy barrier and can act again. Amylase, for example, helps break down starch.','Nazwa nawiązuje do greckich en (w) i zymē (zaczyn), co przypomina o historycznych badaniach fermentacji.','The name draws on Greek en (in) and zymē (leaven), recalling early studies of fermentation.','enzyme']
];
let activeSubject='biologia', activeScope='extended', activeKind='topics', activeChapter=null;
function node(tag, value, className) {
 const el=document.createElement(tag); if(value!==undefined) el.textContent=value;
 if(className) el.className=className;return el;
}
function options(id, pairs, value) {
 const el=byId(id);el.replaceChildren(...pairs.map(([key,text])=>new Option(text,key)));el.value=value;
}
function link(label,url) {const a=node('a',label);a.href=url;return a;}
function plainTitle(value) {return value.replace(/\.?\s*(Uczeń|Student|The student|A student)\b.*$/iu,'').replace(/[.:]\s*$/,'');}
function norm(s){return s.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('ł','l');}
function matches(q, ...strings){return strings.some(s=>norm(s).includes(q));}
function paintTopics(){
 const query=norm(byId('search').value.trim());
 const groups=curriculum.filter(c=>c.subject===activeSubject && c.level===activeScope && c.general===(activeKind==='general'));
 const found=groups.filter(c=>matches(query,c.pl,c.en,...(c.intro||[]),...c.rows.flatMap(r=>[r.pl,r.en])));
 if(!found.includes(activeChapter))activeChapter=found[0];
 const toc=byId('chapters'),article=byId('entry');toc.replaceChildren();article.replaceChildren();
 if(!activeChapter){article.append(node('p',tr('Brak wyników. Spróbuj innego słowa.','No results. Try another word.')));return;}
 found.forEach(c=>{const b=node('button',c.n+' '+plainTitle(c[lang]));b.setAttribute('aria-pressed',c===activeChapter);b.onclick=()=>{activeChapter=c;paintTopics();if(matchMedia('(max-width:760px)').matches)article.scrollIntoView({block:'start'});};toc.append(b);});
 const c=activeChapter;article.append(node('h2',plainTitle(c[lang])));
 if(c.intro)article.append(node('p',c.intro[lang==='pl'?0:1]));
 article.append(node('h3',tr('Czego trzeba się nauczyć','What to learn')));
 for(const r of c.rows){
  const row=node(r.heading?'h4':'p',r.n+' '+plainRequirement(r[lang]),r.heading?'':'requirement');
  if(query&&matches(query,r.pl,r.en))row.classList.add('found');article.append(row);
 }
}
function plainRequirement(text){return text.replace(/\s*(Uczeń|Student|The student):\s*$/i,'').trim();}
function paintTerms(){
 const area=byId('terms');area.replaceChildren();const query=norm(byId('search').value.trim());
 for(const v of glossary.filter(v=>matches(query,...v))){
  const card=node('article',undefined,'panel');card.append(node('h2',tr(v[0],v[1])),node('p',tr(v[2],v[3])),node('h3',tr('Skąd pochodzi nazwa?','Where does the name come from?')),node('p',tr(v[4],v[5])),link(tr('Źródło etymologii','Etymology source'),'https://www.etymonline.com/word/'+v[6]));area.append(card);
 }if(!area.childElementCount)area.append(node('p',tr('Brak hasła w zestawie początkowym.','No match in the starter glossary.')));
}
function renderGuide(){
 const title=glossaryMode?tr('Koncepty','Concepts'):tr('Zagadnienia maturalne','Matura topics');
 document.title=title+' · Atlas Matura';byId('title').textContent=title;
 byId('intro').textContent=glossaryMode?tr('Pierwsze hasła słownika biologii i chemii. Każde ma definicję, przykład i pochodzenie nazwy.','The first entries in the biology and chemistry glossary. Each includes a definition, an example and the origin of the name.'):tr('Biologia i chemia · Formuła 2023 · zakres dla arkuszy z maja 2026. Wybierz dział, żeby przeczytać jego wymagania.','Biology and chemistry · Formula 2023 · scope for the May 2026 papers. Choose a chapter to read its requirements.');
 byId('reader').hidden=byId('filters').hidden=glossaryMode;byId('terms').hidden=!glossaryMode;
 const sources=byId('sources');sources.replaceChildren();
 if(glossaryMode){paintTerms();return;}
 options('subject',[['biologia',tr('Biologia','Biology')],['chemia',tr('Chemia','Chemistry')]],activeSubject);
 options('scope',[['extended',tr('Rozszerzony','Extended')],['basic',tr('Podstawowy','Basic')]],activeScope);
 options('kind',[['topics',tr('Działy tematyczne','Subject topics')],['general',tr('Umiejętności ogólne','General skills')]],activeKind);
 sources.append(node('p',tr('Źródła: podstawa programowa ZPE dla liceum i technikum, 2025/2026. Szczegółowe punkty po angielsku są tłumaczeniem pomocniczym.','Sources: ZPE upper-secondary curriculum, 2025/2026. The detailed English requirements are machine-translated study aids.')),link(tr('Podstawa programowa (PL)','Curriculum (Polish)'),'https://zpe.gov.pl/podstawa-programowa/szkola-ponadpodstawowa/'+activeSubject),document.createTextNode(' · '),link(tr('Informatory CKE','CKE exam guides'),'https://bip.cke.gov.pl/artykul/211/1659/egzamin-maturalny-w-formule-2023'));paintTopics();
}
byId('subject').onchange=e=>{activeSubject=e.target.value;renderGuide();};
byId('scope').onchange=e=>{activeScope=e.target.value;renderGuide();};
byId('kind').onchange=e=>{activeKind=e.target.value;renderGuide();};
byId('search').oninput=()=>glossaryMode?paintTerms():paintTopics();
installPreferences(renderGuide);
