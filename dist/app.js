const $ = id => document.getElementById(id);
const base = 'https://arkusze.pl/maturalne/';
const paper = (s, key=false) => base+s+'-2026-maj-matura-rozszerzona'+(key?'-odpowiedzi':'')+'.pdf';
const bilingual = (pl,en) => pl+'<span class="en" lang="en">'+en+'</span>';
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
 }else{
 const cols=Math.min(3,n),rows=Math.ceil(n/cols);
 for(let i=0;i<n;i++){const x=490+((i%cols)-(cols-1)/2)*250,y=190+(Math.floor(i/cols)-(rows-1)/2)*165;
 for(const side of [-1,1]){link(x,y,x+side*55,y+44,false);dot(x+side*55,y+44,22,'#e8eee7','H');}dot(x,y,34,'#eead91','O');}
 $('result').innerHTML=bilingual('Atomy wodoru: '+2*n+'. Atomy tlenu: '+n+'.','Hydrogen atoms: '+2*n+'. Oxygen atoms: '+n+'.');
 }}
function selectTopic(k){
 current=k;const t=topics[k];for(const id of Object.keys(topics))$(id).setAttribute('aria-pressed',id===k);
 $('topic').innerHTML=bilingual(...t.topic);$('modelTitle').textContent=t.name[0];$('modelEn').textContent=t.name[1];for(const field of ['lesson','goal','prompt'])$(field).innerHTML=bilingual(...t[field]);$('source').href=t.source;
 $('legend').innerHTML=k==='protein'?'<i class="pill"></i>Cys · cysteina / cysteine <i class="line"></i>mostek / bridge':'H · wodór / hydrogen　 O · tlen / oxygen';
 $('countLabel').innerHTML=k==='protein'?bilingual('Liczba reszt cysteiny','Number of cysteine residues'):bilingual('Liczba cząsteczek','Number of molecules');
 $('count').max=t.max;$('count').value=t.value;$('answer').value='';$('feedback').textContent='';$('saved').textContent='';try{$('notes').value=localStorage.getItem('matura-notes-'+k)||''}catch{$('notes').value=''}draw();
}
$('count').oninput=draw;
for(const k of Object.keys(topics))$(k).onclick=()=>selectTopic(k);
$('quiz').onsubmit=e=>{e.preventDefault();const t=topics[current];const ok=Number($('answer').value)===t.answer;const [pl,en]=ok?t.why:t.hint;$('feedback').innerHTML=bilingual((ok?'Tak. ':'Spróbuj jeszcze raz. ')+pl,(ok?'Yes. ':'Try again. ')+en);};
$('notes').oninput=()=>{try{localStorage.setItem('matura-notes-'+current,$('notes').value);$('saved').textContent='Zapisano / Saved'}catch{$('saved').textContent='Zapis niedostępny / Storage unavailable'}};
function tab(studio){$('studio').hidden=!studio;$('shelf').hidden=studio;$('study').setAttribute('aria-pressed',studio);$('library').setAttribute('aria-pressed',!studio);}
$('study').onclick=()=>tab(true);$('library').onclick=()=>tab(false);
for(const [s,title] of [['biologia','Biologia / Biology'],['chemia','Chemia / Chemistry']]){const card=document.createElement('article');card.className='panel';card.innerHTML='<h3>'+title+'</h3><a href="'+paper(s)+'">Arkusz / Exam paper</a>　·　<a href="'+paper(s,true)+'">Zasady oceniania / Marking guide</a>';$('papers').append(card);}
selectTopic('protein');tab(true);
