// Start with a short biology example before following the chapter prerequisites.
const firstLessons = {
  atom: {
    title: ['Jak czytać H₂O?', 'How do you read H₂O?'],
    picture: 'H — O — H',
    meaning: ['Atom to pojedyncza jednostka pierwiastka. H oznacza atom wodoru, a O atom tlenu. Kreska na rysunku przedstawia wiązanie chemiczne, które łączy dwa atomy.', 'An atom is a single unit of a chemical element. H stands for a hydrogen atom and O for an oxygen atom. A line in the diagram represents a chemical bond joining two atoms.'],
    draw: ['Narysuj O i połącz je z dwoma H. Policz symbole. Razem te trzy połączone atomy tworzą jedną cząsteczkę wody. Schemat pokazuje połączenia, a nie kąty między wiązaniami.', 'Draw O and join it to two H symbols. Count the symbols. These three bonded atoms make one water molecule. The sketch shows which atoms connect, without showing the bond angles.'],
    result: ['H₂O oznacza dwa atomy wodoru i jeden atom tlenu. Mała dwójka odnosi się do H.', 'H₂O means two hydrogen atoms and one oxygen atom. The small 2 applies to H.']
  },
  albumin: {
    title: ['Z czego składa się białko?', 'What is a protein made of?'],
    picture: '○ — ● — ○ — ○ — ●',
    meaning: ['Albumina to białko obecne we krwi. Białko składa się z połączonych aminokwasów. Gdy aminokwas staje się częścią łańcucha, tę część nazywamy resztą aminokwasową.', 'Albumin is a protein found in blood. A protein contains amino acids joined in a chain. Once an amino acid is incorporated into the chain, that unit is called a residue.'],
    draw: ['Przerysuj fragment łańcucha. Każde kółko oznacza jedną resztę. Czarne kółka oznaczają cysteinę, aminokwas zawierający siarkę. Policz tylko czarne kółka.', 'Copy the section of chain. Each circle represents one residue. The filled circles represent cysteine, an amino acid that contains sulfur. Count only the filled circles.'],
    result: ['Na schemacie jest pięć reszt, w tym dwie reszty cysteiny. Atomy siarki tych dwóch reszt mogą się połączyć, gdy łańcuch się zwinie.', 'There are five residues in the sketch, including two cysteine residues. Their sulfur atoms can bond when the chain folds.']
  },
  pairs: {
    title: ['Ile mostków może powstać?', 'How many bridges can form?'],
    picture: 'S—S    S—S    S',
    meaning: ['Mostek disiarczkowy to wiązanie między atomami siarki dwóch reszt cysteiny. Każda reszta może wnieść jeden atom siarki do takiego mostka.', 'A disulfide bridge is a bond between the sulfur atoms of two cysteine residues. Each residue can contribute one sulfur atom to such a bridge.'],
    draw: ['Narysuj pięć symboli S. Łącz je w pary, używając każdego symbolu tylko raz. Ile pełnych par widzisz?', 'Draw five S symbols. Join them in pairs, using each symbol only once. How many complete pairs can you see?'],
    result: ['5 = 2 × 2 + 1. Mogą powstać najwyżej dwa mostki. Ostatni atom siarki pozostaje bez partnera. W zadaniu maturalnym zastosujesz tę samą zasadę do 35 reszt.', '5 = 2 × 2 + 1. At most two bridges can form. The last sulfur has no partner. In the exam question you will apply the same reasoning to 35 residues.']
  }
};
const studyRoute = ['atom','albumin','pairs','q1'];
const assigned = new Set(studyRoute);
for(const [chapter,content] of Object.entries(graphChapters)){
  studyRoute.push(chapter);
  for(const key of content.qs){
    const id='q'+(questions.findIndex(q=>compactQuestion(q)===key)+1);
    if(!assigned.has(id)){assigned.add(id);studyRoute.push(id);}
  }
}
const stepTitle=id=>translate(firstLessons[id]?.title||nodes.get(id).title);
const stepHref=id=>'#learn/'+id;
function routeStart(){
  let id;
  try{id=localStorage.getItem('matura-current-step');}catch{}
  if(!studyRoute.includes(id))id=studyRoute[0];
  const start=id===studyRoute[0];
  return '<section class="route-start"><div><strong>'+say('Matura od zera','Matura from zero')+'</strong><p>'+safe(start?say('Od wzoru wody do pierwszego zadania o białkach.','From the formula for water to your first exam question on proteins.'):stepTitle(id))+'</p></div><a class="route-primary" href="'+stepHref(id)+'">'+(start?say('Zacznij pierwszą lekcję','Start the first lesson'):say('Wróć do lekcji','Resume lesson'))+' →</a></section>';
}
function routeReader(id){
  const i=studyRoute.indexOf(id),lesson=firstLessons[id];
  const description=i<4?say('Pierwsze zadanie maturalne','Your first exam question')+' · '+(i+1)+'/4':say('Ścieżka maturalna','Matura study path')+' · '+(i+1)+'/'+studyRoute.length;
  const body=lesson?paragraph(translate(lesson.meaning))+'<div class="lesson-sketch">'+safe(lesson.picture)+'</div>'+part(say('Narysuj','Draw it'),translate(lesson.draw))+part(say('Co z tego wynika?','What does it show?'),translate(lesson.result)):study(nodes.get(id));
  const prev=studyRoute[i-1],next=studyRoute[i+1];
  return '<article class="study-sheet route-reader"><button id="close-sheet" aria-label="'+say('Wróć do mapy','Return to map')+'">×</button><small>'+description+'</small><h2 tabindex="-1">'+safe(stepTitle(id))+'</h2>'+body+'<footer class="route-nav">'+(prev?link(stepHref(prev),say('← Wstecz','← Back')):'')+(next?'<a class="route-primary" href="'+stepHref(next)+'">'+say('Dalej','Next')+' · '+safe(stepTitle(next))+' →</a>':link('#paper4',say('Przećwicz arkusz z 2025 roku','Practise with a 2025 paper')))+'</footer></article>';
}
