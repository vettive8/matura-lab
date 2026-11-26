const $ = id => document.getElementById(id);
const base = 'https://arkusze.pl/maturalne/';
const paper = (s, key=false) => base+s+'-2026-maj-matura-rozszerzona'+(key?'-odpowiedzi':'')+'.pdf';
const bilingual = (pl,en) => lang==="pl"?pl:en;
const topics = {
 protein:{name:['Mostki disiarczkowe','Disulfide bridges'],topic:['Albumina','Albumin'], lesson:['Albumina jest białkiem. Jej zwinięty łańcuch zawiera aminokwasy, m.in. cysteinę. Dwie reszty cysteiny mogą połączyć się przez atomy siarki. Taki mostek pomaga utrzymać kształt białka.','Albumin is a protein. Its folded chain contains amino acids, including cysteine. Two cysteine residues can bond through their sulfur atoms. This bridge helps hold the protein’s shape.'],goal:['W zadaniu 1.1 wykaż, dlaczego 35 reszt cysteiny może utworzyć maksymalnie 17 mostków. Model pokazuje możliwe pary, a nie rzeczywisty kształt albuminy.','In question 1.1, show why 35 cysteine residues can form at most 17 bridges. The model shows possible pairs, not the actual shape of albumin.'],source:paper('biologia')+'#page=3',prompt:['Masz 7 reszt cysteiny. Ile mostków może powstać maksymalnie?','You have 7 cysteine residues. How many bridges can form at most?'],answer:3,hint:['Połącz reszty w pary. Każda pełna para daje jeden mostek.','Pair the residues. Each complete pair gives one bridge.'],why:['Trzy pary tworzą trzy mostki. Jedna reszta zostaje bez pary.','Three pairs make three bridges. One residue is left unpaired.'],value:5,max:35},
 water:{name:['Cząsteczki wody','Water molecules'],topic:['Jak czytać H₂O?','How do you read H₂O?'],lesson:['Wzór H₂O opisuje jedną cząsteczkę wody. Mała dwójka przy H oznacza dwa atomy wodoru. O bez liczby oznacza jeden atom tlenu.','H₂O describes one water molecule. The small 2 after H means two hydrogen atoms. O without a number means one oxygen atom.'],goal:['W zadaniu 3 z chemii pojawia się cząsteczka Q₂. Pierwszy krok to odczytanie indeksu ₂. Później nauczymy się rozpoznawać wiązania i wolne pary elektronowe.','Chemistry question 3 uses the molecule Q₂. The first step is reading the subscript ₂. Later we will learn to identify bonds and lone pairs.'],source:paper('chemia')+'#page=5',prompt:['Ile atomów wodoru zawierają łącznie trzy cząsteczki wody?','How many hydrogen atoms are there in three water molecules altogether?'],answer:6,hint:['Policz po dwa atomy H w każdej cząsteczce.','Count two H atoms per molecule.'],why:['3 × 2 = 6 atomów wodoru.','3 × 2 = 6 hydrogen atoms.'],value:1,max:6}
};
let current='protein';const ctx=$('canvas').getContext('2d');
function dot(x,y,r,color,label){ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,2*Math.PI);ctx.fill();ctx.fillStyle='#153e38';ctx.font='bold '+Math.round(r*.92)+'px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,x,y);}
function link(x,y,a,b,dashed){ctx.beginPath();ctx.strokeStyle=dashed?'#efca7c':'#8abaae';ctx.lineWidth=dashed?4:7;ctx.setLineDash(dashed?[6,6]:[]);ctx.moveTo(x,y);ctx.lineTo(a,b);ctx.stroke();ctx.setLineDash([]);}
function draw(){
 const n=Number($('count').value);topics[current].value=n;$('amount').value=n;ctx.clearRect(0,0,980,420);
 if(current==='protein'){
 const groups=Math.ceil(n/2),cols=Math.min(groups,6),rows=Math.ceil(groups/cols);
 const gap=Math.min(145,850/cols),rh=360/rows,r=Math.min(33,rh*.21);
 for(let i=0;i<groups;i++){const x=490+((i%cols)-(cols-1)/2)*gap,y=210+(Math.floor(i/cols)-(rows-1)/2)*rh;
 if(i*2+1<n){link(x,y-r*1.6,x,y+r*1.6,true);dot(x,y+r*1.6,r,'#a6e0d0','Cys');}
 dot(x,y-r*1.6,r,'#a6e0d0','Cys');}
 $('result').innerHTML=bilingual('Maksymalna liczba mostków: '+Math.floor(n/2)+'. Bez pary: '+n%2+'.','Maximum bridges: '+Math.floor(n/2)+'. Unpaired residues: '+n%2+'.');
 }else if(current==='water'){
 const cols=Math.min(3,n),rows=Math.ceil(n/cols);
 for(let i=0;i<n;i++){const x=490+((i%cols)-(cols-1)/2)*250,y=190+(Math.floor(i/cols)-(rows-1)/2)*165;
 for(const side of [-1,1]){link(x,y,x+side*55,y+44,false);dot(x+side*55,y+44,22,'#e8eee7','H');}dot(x,y,34,'#eead91','O');}
 $('result').innerHTML=bilingual('Atomy wodoru: '+2*n+'. Atomy tlenu: '+n+'.','Hydrogen atoms: '+2*n+'. Oxygen atoms: '+n+'.');
 }else drawTransport(n);}

topics.transport={
 name:['Transport w osoczu','Transport in plasma'],topic:['Rozpuszczalność','Solubility'],
 lesson:['Osocze to płynna część krwi. Jego głównym składnikiem jest woda. Długołańcuchowy kwas tłuszczowy słabo rozpuszcza się w osoczu. Albumina rozpuszcza się dobrze i może związać kwas tłuszczowy. Tak związany kwas przemieszcza się razem z białkiem.','Plasma is the liquid part of blood. Its main component is water. A long-chain fatty acid dissolves poorly in plasma. Albumin dissolves well and can bind the fatty acid. Once bound, the fatty acid travels with the protein.'],
 goal:['Połącz trzy elementy w jednym wyjaśnieniu: słabą rozpuszczalność kwasu, dobrą rozpuszczalność albuminy i transport po związaniu.','Link three ideas in your explanation: poor fatty acid solubility, good albumin solubility, and transport after binding.'],
 prompt:['Ile z tych dwóch substancji dobrze rozpuszcza się samodzielnie w osoczu: albumina i długołańcuchowy kwas tłuszczowy?','How many of these two substances dissolve well on their own in plasma: albumin and a long-chain fatty acid?'],answer:1,
 hint:['Porównaj kwas tłuszczowy z białkiem, które go przenosi.','Compare the fatty acid with its carrier protein.'],why:['Jedna: albumina. Kwas może podróżować w osoczu po związaniu z nią.','One: albumin. The fatty acid can travel through plasma bound to it.'],value:1,max:3};
function drawTransport(n){
 const x=n===3?625:340,y=207;
 ctx.fillStyle='#a3dcc9';ctx.beginPath();ctx.ellipse(x,y,132,92,-.15,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#163f36';ctx.font='bold 30px Georgia';ctx.textAlign='center';ctx.fillText(bilingual('Albumina','Albumin'),x,y+10);
 const tailX=n===1?650:x+80,tailY=n===1?235:y-61;
 ctx.lineWidth=10;ctx.lineJoin='round';ctx.strokeStyle='#f1c475';ctx.beginPath();ctx.moveTo(tailX,tailY);
 for(let i=1;i<=6;i++)ctx.lineTo(tailX+i*13,tailY+(i%2?-13:0));ctx.stroke();
 $('result').textContent=[bilingual('Oddzielnie: kwas słabo rozpuszcza się w osoczu.','Separate: the fatty acid dissolves poorly in plasma.'),bilingual('Wiązanie: kwas przyłącza się do albuminy.','Binding: the fatty acid attaches to albumin.'),bilingual('Transport: rozpuszczalna albumina przenosi związany kwas.','Transport: soluble albumin carries the bound fatty acid.')][n-1];
}
function read(key,fallback=''){try{return localStorage.getItem('matura-'+key)??fallback}catch{return fallback}}
function write(key,value){try{localStorage.setItem('matura-'+key,value);return true}catch{return false}}
let lang=read('language','pl')==='en'?'en':'pl';
let theme=read('theme',matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
let index=questions.findIndex(q=>q.s+'/'+q.id===read('position','biologia/1.2'));
if(index<0)index=1;
let inStudio=true,feedback=null;
const t=bilingual;
function set(id,pl,en){$(id).textContent=t(pl,en)}
function subject(s){return s==='biologia'?t('Biologia','Biology'):t('Chemia','Chemistry')}
function option(select,value,label){select.add(new Option(label,value))}
function key(q){return q.s+'/'+q.id}
function noteKey(q){return 'notes-'+({'biologia/1.1':'protein','chemia/3':'water'}[key(q)]||key(q))}
function updateProgress(){
 const q=questions[index],done=read('done-'+key(q))==='1';
 const count=questions.filter(row=>read('done-'+key(row))==='1').length;
 $('progress').textContent=t('Ukończone','Completed')+' · '+count+' / '+questions.length;
 $('done').textContent=done?t('Ukończone · cofnij','Completed · undo'):t('Oznacz jako ukończone','Mark complete');
 $('done').setAttribute('aria-pressed',done);
}
function renderFeedback(){
 const el=$('feedback');el.textContent='';
 if(feedback===null||!current)return;
 const data=topics[current];el.textContent=(feedback?t('Tak. ','Yes. '):t('Spróbuj ponownie. ','Try again. '))+t(...(feedback?data.why:data.hint));
}
function render(){
 const q=questions[index];current=({'biologia/1.1':'protein','biologia/1.2':'transport','chemia/3':'water'})[key(q)];
 document.documentElement.lang=lang;document.documentElement.dataset.theme=theme;
 $('language').value=lang;$('language').ariaLabel=t('Język','Language');
 set('study','Pracownia','Studio');set('library','Biblioteka','Library');set('heading','Pracownia nauki','Learning studio');
 $('theme').textContent=theme==='dark'?t('☀ Jasny motyw','☀ Light theme'):t('☾ Ciemny motyw','☾ Dark theme');
 $('study').setAttribute('aria-pressed',inStudio);$('library').setAttribute('aria-pressed',!inStudio);$('studio').hidden=!inStudio;$('shelf').hidden=inStudio;
 set('prev','Poprzednie','Previous');set('next','Następne','Next');$('prev').disabled=index===0;$('next').disabled=index===questions.length-1;
 const sub=$('subject');sub.replaceChildren();sub.ariaLabel=t('Przedmiot','Subject');for(const s of ['biologia','chemia'])option(sub,s,subject(s));sub.value=q.s;
 const pick=$('pick');pick.replaceChildren();pick.ariaLabel=t('Zadanie','Question');
 questions.forEach((row,i)=>{if(row.s===q.s)option(pick,i,row.id+' · '+t(...row.title))});pick.value=index;
 $('badge').textContent=subject(q.s)+' · '+t('Maj 2026 · Zadanie ','May 2026 · Question ')+q.id;$('tasktitle').textContent=t(...q.title);
 set('practiceHeading','Sprawdź się','Try it yourself');set('check','Sprawdź','Check');set('goalHeading','Cel maturalny','Exam goal');
 for(const id of ['model','practice','explanation'])$(id).hidden=!current;
 if(current){const data=topics[current];$('modelTitle').textContent=t(...data.name);for(const field of ['topic','lesson','goal','prompt'])$(field).textContent=t(...data[field]);
 const legends={protein:t('Cys · cysteina　 ┄ mostek','Cys · cysteine　 ┄ bridge'),water:t('H · wodór　O · tlen','H · hydrogen　O · oxygen'),transport:t('Zielony owal · albumina　 złoty łańcuch · kwas tłuszczowy','Green oval · albumin　 gold chain · fatty acid')};
 $('legend').textContent=legends[current];$('countLabel').textContent=current==='protein'?t('Liczba reszt cysteiny','Number of cysteine residues'):current==='water'?t('Liczba cząsteczek','Number of molecules'):t('Etap transportu','Transport stage');$('count').max=data.max;$('count').value=data.value;draw();renderFeedback();}
 set('draftTitle','Twoja odpowiedź maturalna','Your exam answer');
 set('draftHint','Otwórz zadanie, obejrzyj dane i zapisz własne rozwiązanie. Następnie porównaj je z zasadami oceniania.','Open the question, inspect the data and write your solution. Then compare it with the marking guide.');
 for(const [id,isKey,page] of [['questionLink',false,q.page],['keyLink',true,q.key]])$(id).href=paper(q.s,isKey)+'#page='+page;
 set('questionLink','Treść i ilustracje · PDF (PL)','Question and figures · PDF (Polish)');set('keyLink','Zasady oceniania · PDF (PL)','Marking guide · PDF (Polish)');
 $('response').value=read('response-'+key(q));$('notes').value=read(noteKey(q));set('notesTitle','Moje notatki','My notes');set('local','Zapis w tej przeglądarce.','Saved in this browser.');$('saved').textContent='';
 updateProgress();set('shelfTitle','Biblioteka','Library');set('papersTitle','Matura · Maj 2026','Matura · May 2026');set('resources','Materiały do nauki','Study materials');set('zpe','Od atomu do organizmu','From atom to organism (Polish)');set('cke','Informatory CKE','CKE exam guides (Polish)');
 $('papers').replaceChildren();for(const s of ['biologia','chemia']){const card=document.createElement('article');card.className='panel';card.innerHTML='<h3>'+subject(s)+'</h3><div class="paperline"><a href="'+paper(s)+'">'+t('Arkusz','Exam paper (Polish)')+'</a><a href="'+paper(s,true)+'">'+t('Zasady oceniania','Marking guide (Polish)')+'</a></div>';$('papers').append(card);}
}
function navigate(i){index=i;write('position',key(questions[i]));feedback=null;$('answer').value='';render()}
$('prev').onclick=()=>navigate(index-1);$('next').onclick=()=>navigate(index+1);
$('pick').onchange=e=>navigate(Number(e.target.value));$('subject').onchange=e=>navigate(questions.findIndex(q=>q.s===e.target.value));
$('count').oninput=draw;$('done').onclick=()=>{const k='done-'+key(questions[index]);write(k,read(k)==='1'?'0':'1');updateProgress()};
$('quiz').onsubmit=e=>{e.preventDefault();feedback=Number($('answer').value)===topics[current].answer;renderFeedback()};
for(const id of ['notes','response'])$(id).oninput=()=>{const q=questions[index];const ok=write(id==='notes'?noteKey(q):'response-'+key(q),$(id).value);$('saved').textContent=ok?t('Zapisano','Saved'):t('Zapis niedostępny','Storage unavailable')};
$('language').onchange=e=>{lang=e.target.value;write('language',lang);render()};
$('theme').onclick=()=>{theme=theme==='dark'?'light':'dark';write('theme',theme);render()};
$('study').onclick=()=>{inStudio=true;render()};$('library').onclick=()=>{inStudio=false;render()};render();
