const stageIds = ['foundation','matura','1','2','3','4','5','6','internship','practice','specialty'];
const stageLabels = {
  foundation:['Podstawy','Foundations'],matura:['Matura','Matura'],
  internship:['Staż podyplomowy','Supervised internship'],practice:['Praca lekarza','Medical practice'],specialty:['Specjalizacje','Specialty training']
};
// Each column follows the same topic across the eleven stages.
const nodeLabels = {
  atom:['Atom/Atom','Izotopy/Isotopes','Energia/Energy','Czułość/Sensitivity','Znacznik/Tracer','Rozkład znacznika/Tracer distribution','Obrazowanie/Imaging','Funkcja narządu/Organ function','Skierowanie/Referral','Dobór badania/Test selection','Medycyna jądrowa/Nuclear medicine'],
  water:['Roztwór/Solution','Stężenie/Concentration','Mol/Mole','Toniczność/Tonicity','Rozcieńczenie/Dilution','Bilans wody/Water balance','Bilans płynów/Fluid balance','Seria pomiarów/Serial results','Zmiana stężenia/Concentration shift','Trend/Trend','Osmolalność/Osmolality'],
  ph:['Jony H⁺/H⁺ ions','Skala pH/pH scale','Bufor/Buffer','Wodorowęglany/Bicarbonate','Płuca i nerki/Lungs and kidneys','Wentylacja/Ventilation','Gazometria/Blood gases','Zmiana pH/pH trend','Jakość próbki/Sample quality','Mechanizm/Mechanism','Intensywna terapia/Intensive care'],
  albumin:['Aminokwas/Amino acid','Mostek S–S/S–S bridge','Albumina w surowicy/Serum albumin','Ciśnienie onkotyczne/Oncotic pressure','Białkomocz/Proteinuria','Utrata białka/Protein loss','Wiązanie leku/Drug binding','Obrzęk/Oedema','Wywiad/History','Przyczyna obrzęku/Cause of oedema','Nefrologia/Nephrology'],
  membrane:['Błona/Membrane','Kanał jonowy/Ion channel','Dwuwarstwa/Bilayer','Potencjał czynnościowy/Action potential','Przewodzenie/Conduction','EKG/ECG','Lokalizacja/Localisation','Rozkład objawów/Pattern of signs','Strona objawów/Symptom side','Ocena funkcji/Function assessment','Elektrofizjologia/Electrophysiology'],
  dna:['Allel/Allele','Dziedziczenie/Inheritance','Ekspresja genu/Gene expression','Penetracja genu/Penetrance','Rodowód/Pedigree','Wywiad rodzinny/Family history','Środowisko/Environment','Źródło informacji/Information source','Dane krewnych/Relatives’ history','Konsultacja/Consultation','Genetyka kliniczna/Clinical genetics'],
  evidence:['Pomiar/Measurement','Próba kontrolna/Control','Zmienna/Variable','Przeciwciała/Antibodies','Grupa porównawcza/Comparison group','Niepewność/Uncertainty','Częstość choroby/Prevalence','Ocena dowodów/Evidence appraisal','Potwierdzenie/Confirmation','Rozpoznanie/Diagnosis','Epidemiologia/Epidemiology']
};
const positions = {dna:[97,53],evidence:[295,53],albumin:[493,53],atom:[97,169],water:[295,169],ph:[493,270],membrane:[97,270]};
const edges = [
  ['atom','water','Cząsteczka wody składa się z dwóch atomów wodoru i jednego atomu tlenu.','A water molecule contains two hydrogen atoms and one oxygen atom.'],
  ['atom','dna','DNA składa się z nukleotydów. Ich atomy tworzą m.in. szkielet cukrowo-fosforanowy.','DNA consists of nucleotides whose atoms form, among other structures, the sugar–phosphate backbone.'],
  ['water','ph','W rozcieńczonym roztworze wodnym stężenie jonów H⁺ pozwala oszacować pH.','In a dilute aqueous solution, hydrogen-ion concentration lets you estimate pH.'],
  ['water','membrane','Różnica stężeń po obu stronach przepuszczalnej błony napędza dyfuzję netto substancji obojętnej.','A concentration difference across a permeable membrane drives net diffusion of a neutral solute.'],
  ['water','albumin','Albumina rozpuszcza się w osoczu. Jej obecność wpływa na przemieszczanie się wody między osoczem a tkankami.','Albumin dissolves in plasma. Its presence influences the movement of water between plasma and tissues.'],
  ['evidence','albumin','Pomiar stężenia albuminy dostarcza jednej obserwacji. Przyczynę zmiany ustalasz, zestawiając ją z innymi danymi.','Measuring albumin gives you one observation. To explain a change you compare it with other findings.'],
  ['evidence','dna','Rodowód dostarcza obserwacji, które mogą wspierać lub wykluczać model dziedziczenia.','A pedigree supplies observations that can support or rule out an inheritance model.']
];
const translate = pair => pair[lang==='pl'?0:1];
const nameOfStage = id => stageLabels[id]?translate(stageLabels[id]):translate(['UZ · rok ','UZ · year '])+id;
const textSafe = text => text.replaceAll('&','&amp;').replaceAll('<','&lt;');
const labelFor = (topic,i) => translate(nodeLabels[topic][i].split('/'));
function renderMap() {
  const [stageKey,topicKey] = location.hash.slice(1).split('/');
  const stage = stageIds.includes(stageKey)?stageKey:'foundation';
  const topic = Object.hasOwn(positions,topicKey)?topicKey:'atom';
  const i = stageIds.indexOf(stage), path = graphPaths[topic];
  const tr = (pl,en) => translate([pl,en]);
  const go = (s,k) => '#'+s+'/'+k;
  const neighbors = edges.filter(([left,right])=>left===topic||right===topic);
  const near = neighbors.map(([left,right])=>left===topic?right:left);
  const links = edges.map(([left,right])=>{
    const [x1,y1]=positions[left],[x2,y2]=positions[right];
    return '<line class="'+([left,right].includes(topic)?'selected-edge':'')+'" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"/>';
  }).join('');
  const nodes = Object.entries(positions).map(([key,[x,y]])=>{
    const name = labelFor(key,i),selected = key===topic;
    return '<a href="'+go(stage,key)+'" aria-label="'+name+'" '+(selected?'aria-current="true"':'')+' class="map-node '+(selected?'active':near.includes(key)?'near':'')+'"><title>'+name+'</title><circle cx="'+x+'" cy="'+y+'" r="18"/><circle class="core" cx="'+x+'" cy="'+y+'" r="6"/><text x="'+x+'" y="'+(y+40)+'" text-anchor="middle">'+name+'</text></a>';
  }).join('');
  const detail = i===0?path.intro:path.stages[i-1];
  const lesson = workedLessons[topic];
  const li=neighbors.map((edge,j)=>'<li><a href="'+go(stage,near[j])+'">'+labelFor(near[j],i)+'</a><p>'+textSafe(translate(edge.slice(2)))+'</p></li>').join('');
  document.querySelector('#graph').innerHTML = '<h1>'+tr('Mapa etapów nauki','Map of learning stages')+'</h1><p>'+tr('Wybierz etap i kliknij kółko. Linie łączą pokrewne ścieżki. Zmień etap, aby zobaczyć, jak rozwija się wybrany temat.','Choose a stage and select a circle. Lines connect related paths. Switch stages to follow the selected topic as it develops.')+'</p><label for="map-stage">'+tr('Etap nauki','Learning stage')+'</label><select id="map-stage">'+stageIds.map(s=>'<option value="'+s+'" '+(s===stage?'selected':'')+'>'+nameOfStage(s)+'</option>').join('')+'</select><div class="map-scroll"><svg class="stage-map" viewBox="0 0 590 330" aria-label="'+tr('Interaktywna mapa pojęć','Interactive concept map')+'">'+links+nodes+'</svg></div><article class="node-detail"><p>'+translate(path.title)+' · '+nameOfStage(stage)+'</p><h2>'+labelFor(topic,i)+'</h2><p>'+textSafe(translate(detail))+'</p>'+
  (topic==='albumin'?'<p>'+textSafe(translate(albuminExamples[i]))+'</p>':'')+
  (i===0?'<h3>'+translate(lesson[0])+'</h3><p>'+translate(lesson[1])+'</p>':'')+
  (i>=2 && i<=7?'<p><a href="../graf/#stage/'+stage+'">'+tr('Przykładowa ścieżka · zobacz przedmioty UZ na tym roku','Suggested path · see actual UZ courses for this year')+'</a></p>':'')+
  '<a href="../graf/#topic/'+topic+'">'+tr('Otwórz lekcję i doświadczenie','Open lesson and experiment')+'</a><h3>'+tr('Co łączy te ścieżki?','How are these paths connected?')+'</h3><ul>'+li+'</ul><div class="map-steps">'+[i-1,i+1].filter(n=>stageIds[n]).map(n=>'<a href="'+go(stageIds[n],topic)+'">'+(n<i?'← ':'')+nameOfStage(stageIds[n])+(n>i?' →':'')+'</a>').join('')+'</div></article>';
  document.title = nameOfStage(stage)+' · '+labelFor(topic,i)+' · Atlas Matura';
  document.getElementById('map-stage').onchange=e=>{location.hash=go(e.target.value,topic);};
}
window.addEventListener('hashchange',()=>{
  const previous = document.activeElement;
  renderMap();
  if(previous.id==='map-stage') document.getElementById('map-stage').focus({preventScroll:true});
  else if(previous.closest('.map-node')) document.querySelector('.map-node.active').focus({preventScroll:true});
});
installPreferences(renderMap);
