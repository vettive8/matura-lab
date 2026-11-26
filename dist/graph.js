const root = document.getElementById('graph');
const t = (pl,en) => lang === 'pl' ? pl : en;
const local = pair => t(...pair);
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const a = (url,label) => '<a href="'+esc(url)+'">'+esc(label)+'</a>';
const section = (title,body) => body ? '<section><h2>'+esc(title)+'</h2>'+body+'</section>' : '';
const list = links => links.length ? '<ul class="links">'+links.map(l=>'<li>'+l+'</li>').join('')+'</ul>' : '';
const titles = Object.keys(graphPaths);
const chapters = {};
for (const [prefix,subject] of [['b','biologia'],['c','chemia']]) {
  curriculum.filter(x=>x.subject===subject && x.level==='extended' && !x.general).forEach((x,i)=>chapters[prefix+(i+1)]=x);
}
const stages = ['matura','1','2','3','4','5','6','internship','practice','specialty'];
const plan = 'https://sylabuz.uz.zgora.pl/index.php?/main/studyPlan/63604';
const ministry = 'https://www.gov.pl/web/zdrowie/staz-podyplomowy-lekarzy-i-lekarzy-dentystow';
const cmkp = 'https://www.cmkp.edu.pl/ksztalcenie/podyplomowe/lekarze-i-lekarze-dentysci/modulowe-programy-specjalizacji-lekarskich-2023';
const dependencies = {atom:[],water:['atom'],ph:['water'],albumin:['water'],membrane:['water'],dna:['atom'],evidence:[]};
const stageName = id => ({matura:'Matura',internship:t('Staż podyplomowy','Supervised internship'),practice:t('Praca lekarza','Medical practice'),specialty:t('Specjalizacje','Specialty training')})[id] || t('UZ · rok ','UZ · year ')+id;
const stageLink = id => a('#stage/'+id,stageName(id));
const topicLink = id => a('#topic/'+id,local(graphPaths[id].title));
const chapterLink = id => a('#chapter/'+id,chapters[id].n+' '+chapters[id][lang]);
const courseLink = i => a('#course/'+(i+1),local(uzCourses[i].title));
const qkey = q => (q.s==='biologia'?'b':'c')+q.id;
const examIndex = new Map(questions.map((q,i)=>[qkey(q),i]));
function examLink(id) {
  const i = examIndex.get(id), q = questions[i];
  return a('/learn/matura/#'+q.s+'/'+q.id,t('Zad. ','Q. ')+q.id+' · '+(id[0]==='b'?t('biologia','biology'):t('chemia','chemistry'))+' · #'+(i+1));
}
const examSection = ids => section(t('Zadania maturalne','Matura questions'),list(ids.map(examLink)));
const topicSection = ids => section(t('Powiązane ścieżki','Connected learning paths'),list(ids.map(topicLink)));
const nextLabel = () => t('Czego uczyć się dalej?','What comes next?');
const yearNote = () => t('Przykłady pokazują, jak możesz wracać do tematu w kolejnych latach. Nazwy i kolejność zajęć sprawdzisz w planie UZ dla rocznika 2026/27.','The examples show how you can revisit this topic each year. The UZ plan for the 2026/27 intake lists the actual courses and their sequence.');
const homeTitle = () => t('Graf wiedzy','Knowledge graph');
let searchText = '';
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('ł','l');
function search() {
  const needle = norm(searchText.trim());
  const results = [];
  if (needle) {
    const add = (label,url) => {if (norm(label).includes(needle)) results.push(a(url,label));};
    for (const id of titles) add(local(graphPaths[id].title),'#topic/'+id);
    for (const [id,ch] of Object.entries(chapters)) {
      add(ch[lang],'#chapter/'+id);
      ch.rows.forEach((r,i)=>add(r[lang],'#item/'+id+'/'+(i+1)));
    }
    uzCourses.forEach((c,i)=>add(local(c.title)+' · '+stageName(String(Math.ceil(c.semester/2))),'#course/'+(i+1)));
  }
  document.getElementById('matches').innerHTML = needle ? '<p>'+t('Wyniki','Matches')+' · '+results.length+'</p>'+list(results) : '';
}
function home() {
  const intro = '<p>'+t('Zacznij od atomu. Przejdź do wody, poznaj białka osocza i zobacz, jak lekarz wykorzystuje tę wiedzę, gdy pacjent ma obrzęki.','Start with an atom. Move on to water and plasma proteins, then see how a doctor uses that knowledge when a patient has swelling.')+'</p>';
  const trail = '<div class="trail">'+['atom','water','albumin'].map(topicLink).join('<span aria-hidden="true">→</span>')+'</div>';
  const shelf = prefix => list(Object.keys(graphChapters).filter(id=>id[0]===prefix).map(chapterLink));
  return '<div class="lead"><h1>'+homeTitle()+'</h1>'+intro+trail+'</div><div class="finder"><label for="lookup">'+t('Szukaj tematu, układu lub przedmiotu','Find a topic, body system or course')+'</label><input type="search" id="lookup" value="'+esc(searchText)+'"><div id="matches"></div></div>'+
    section(t('Ścieżki z doświadczeniami','Learning paths with experiments'),list(titles.map(topicLink)))+
    section(t('Etapy nauki i praktyki','Stages of study and practice'),list(stages.map(stageLink)))+
    section(t('Chemia · rozdziały','Chemistry chapters'),shelf('c'))+
    section(t('Biologia · rozdziały','Biology chapters'),shelf('b'))+
    list([a('../zagadnienia/',t('Podstawa programowa i źródła','Curriculum and sources')),a('../koncepty/',t('Słownik i etymologia','Glossary and etymology'))]);
}
function topic(id) {
  const p = graphPaths[id];
  const timeline = stages.map((s,i)=>'<li>'+stageLink(s)+'<p>'+esc(local(p.stages[i]))+'</p></li>').join('');
  return '<h1>'+esc(local(p.title))+'</h1><p class="intro">'+esc(local(p.intro))+'</p>'+
    section(t('Podstawy','Foundations'),list(dependencies[id].map(topicLink)))+experiment(id)+examSection(p.qs)+
    section(t('Ten sam temat na kolejnych etapach','The same topic at each stage'),'<p>'+yearNote()+'</p><ol class="timeline">'+timeline+'</ol>')+
    section(t('Rozdziały','Chapters'),list(p.chapters.map(chapterLink)))+
    section(nextLabel(),list(titles.filter(k=>dependencies[k].includes(id)).map(topicLink)));
}
function chapter(id) {
  const ch = chapters[id], info = graphChapters[id];
  return '<h1>'+esc(ch.n+' '+ch[lang])+'</h1><p class="intro">'+esc(local(info.intro))+'</p>'+
    section(t('Najpierw poznaj','Learn these first'),list(info.pre.map(chapterLink)))+
    section(t('Co trzeba umieć','What you need to know'),'<ul class="requirements">'+ch.rows.map((r,i)=>'<li class="'+(r.heading?'subhead':'')+'">'+a('#item/'+id+'/'+(i+1),r.n+' '+r[lang])+'</li>').join('')+'</ul>')+
    examSection(info.qs)+topicSection(titles.filter(k=>graphPaths[k].chapters.includes(id)))+
    section(nextLabel(),list(Object.keys(graphChapters).filter(k=>graphChapters[k].pre.includes(id)).map(chapterLink)));
}
function item(id,n) {
  const ch = chapters[id], r = ch.rows[n-1];
  const parent = ch.rows.slice(0,n-1).filter(x=>x.heading).at(-1);
  return '<p>'+chapterLink(id)+'</p><h1>'+t('Punkt programu','Curriculum item')+' '+esc(r.n)+'</h1>'+
    (parent&&!r.heading?'<h2>'+esc(parent[lang])+'</h2>':'')+'<p class="intro">'+esc(r[lang])+'</p>'+
    section(t('Kontekst rozdziału','Chapter context'),'<p>'+esc(local(graphChapters[id].intro))+'</p>')+
    section(nextLabel(),list([n<ch.rows.length?a('#item/'+id+'/'+(n+1),ch.rows[n].n+' '+ch.rows[n][lang]):chapterLink(id)]));
}
function stage(id) {
  const i = stages.indexOf(id);
  let body = '';
  if (i>0 && i<=6) {
    for (const sem of [i*2-1,i*2]) {
      body += section(t('Semestr ','Semester ')+sem,list(uzCourses.flatMap((c,j)=>c.semester===sem?[courseLink(j)]:[])));
    }
    body += a(plan,t('Oficjalny plan UZ','Official UZ study plan'));
  } else if (id==='internship') body = '<p>'+t('Podczas stażu lekarz pracuje pod nadzorem opiekuna. W ćwiczeniach poniżej przechodzisz od rozpoznania mechanizmu do zebrania danych i omówienia ich z opiekunem.','During the Polish postgraduate internship, a doctor works under supervision. The examples below move from identifying a mechanism to collecting findings and discussing them with a supervisor.')+'</p>'+a(ministry,t('Ministerstwo Zdrowia · staż','Ministry of Health · internship'));
  else if (id==='specialty') body = '<p>'+t('Wybierz zagadnienie, by zobaczyć, jak pytanie kliniczne zmienia się zależnie od specjalności. Oficjalny wykaz CMKP prowadzi do programów szkolenia w poszczególnych dziedzinach.','Choose a topic to see how a clinical question changes with the specialty. The official CMKP directory links to the training programmes in individual specialties.')+'</p>'+a(cmkp,t('CMKP · programy specjalizacji','CMKP · specialty curricula'));
  else if (id==='matura') body = list([a('../biblioteka/',t('Arkusze i rozwiązania','Papers and worked answers')),a('../zagadnienia/',t('Zakres wymagań','Curriculum requirements'))]);
  return '<h1>'+stageName(id)+'</h1>'+body+section(t('Jak wykorzystujesz wiedzę','How you use the knowledge'),'<dl>'+titles.map(k=>'<dt>'+topicLink(k)+'</dt><dd>'+esc(local(graphPaths[k].stages[i]))+'</dd>').join('')+'</dl>')+
    (i<9?section(nextLabel(),list([stageLink(stages[i+1])])):'');
}
function course(i) {
  const c=uzCourses[i], q=c.question.replace('biologia/','b').replace('chemia/','c');
  return '<p>'+stageLink(String(Math.ceil(c.semester/2)))+'</p><h1>'+esc(local(c.title))+'</h1><p>'+t('Semestr ','Semester ')+c.semester+' · '+esc(c.ects)+' ECTS'+(c.elective?t(' · do wyboru',' · elective'):'')+'</p><p class="intro">'+esc(local(c.connection))+'</p>'+
    (c.background?'<p>'+t('Zadanie ćwiczy wiedzę pomocniczą dla tego przedmiotu.','The question practises background knowledge for this course.')+'</p>':'')+
    examSection([q])+section(t('Rozdziały powiązane przez zadanie','Chapters linked through this question'),list(Object.keys(graphChapters).filter(k=>graphChapters[k].qs.includes(q)).map(chapterLink)))+
    a(c.uid?'https://sylabuz.uz.zgora.pl/index.php?/course/showCourseDetails/'+c.uid:plan,c.uid?t('Sylabus UZ','UZ course syllabus'):t('Plan UZ','UZ study plan'));
}
function renderGraph() {
  const [kind,id,n] = location.hash.slice(1).split('/');
  let content;
  if(kind==='topic' && Object.hasOwn(graphPaths,id)) content=topic(id);
  if(kind==='chapter' && Object.hasOwn(chapters,id)) content=chapter(id);
  if(kind==='item' && Object.hasOwn(chapters,id) && Number.isInteger(+n) && chapters[id].rows[+n-1]) content=item(id,+n);
  if(kind==='stage' && stages.includes(id)) content=stage(id);
  if(kind==='course' && Number.isInteger(+id) && uzCourses[+id-1]) content=course(+id-1);
  root.innerHTML = content ? '<div class="back">'+a('#', '← '+homeTitle())+'</div>'+content : home();
  document.title = root.querySelector('h1').textContent+' · Atlas Matura';
  if(document.getElementById('control')) bindLab(id);
  const lookup = document.getElementById('lookup');
  if(lookup) {lookup.oninput=()=>{searchText=lookup.value;search();};search();}
}
window.addEventListener('hashchange',()=>{renderGraph();window.scrollTo(0,0);root.tabIndex=-1;root.focus({preventScroll:true});});
installPreferences(renderGraph);
