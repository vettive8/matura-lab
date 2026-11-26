const $ = id => document.getElementById(id);
function paper(subject, key = false) {
 const biology = subject === 'biologia';
 const folder = biology ? 'Biologia' : 'Chemia';
 const code = biology ? 'MBIP' : 'MCHP';
 const file = key ? '2605-zasady' : 'A-2605-arkusz';
 return 'https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2026/'
   + folder + '/' + code + '-R0-100-' + file + '.pdf';
}
const bilingual = (pl,en) => lang==="pl"?pl:en;
const topics = {
 protein:{name:['Mostki disiarczkowe','Disulfide bridges'],value:5,max:35},
 transport:{name:['Transport w osoczu','Transport in plasma'],value:1,max:3}
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
 }else drawTransport(n);}

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
let index=questions.findIndex(q=>q.s+'/'+q.id===read('position','biologia/1.2'));
if(index<0)index=1;
function questionFromLink() {
 return questions.findIndex(q => '#' + key(q) === location.hash);
}
const linkedQuestion=questionFromLink();
if(linkedQuestion>=0)index=linkedQuestion;
const inStudio=!location.pathname.includes('/biblioteka');
const t=bilingual;
function set(id,pl,en){$(id).textContent=t(pl,en)}
function subject(s){return s==='biologia'?t('Biologia','Biology'):t('Chemia','Chemistry')}
function option(select,value,label){select.add(new Option(label,value))}
function key(q){return q.s+'/'+q.id}
function renderWorkingTable(data) {
 const slot = $('workingTable');
 slot.replaceChildren();
 slot.hidden = !data;
 if (!data) return;
 const [title, headers, rows] = data;
 const table = document.createElement('table');
 table.createCaption().textContent = t(...title);
 const head = table.createTHead().insertRow();
 for (const label of headers) {
   const th = document.createElement('th');
   th.scope = 'col';
   th.textContent = t(...label);
   head.append(th);
 }
 const body = table.createTBody();
 for (const cells of rows) {
   const row = body.insertRow();
   for (const value of cells) row.insertCell().textContent = t(...value);
 }
 slot.append(table);
}
function renderAnswerMedia(q) {
 renderWorkingTable(q.table);
 const file = 'media/' + q.photo + '.webp';
 const caption = t(...q.caption);
 const credit = photoCredits[q.photo];
 $('questionImage').src = file;
 $('questionImage').alt = caption.split('. ')[0];
 $('photoFull').href = file;
 $('photoFull').ariaLabel = t('Otwórz ilustrację w pełnym rozmiarze', 'Open full-size image');
 $('photoCaption').textContent = caption;
 $('photoSource').href = credit.source;
 $('photoSource').textContent = t('Źródło ilustracji', 'Image source');
 $('photoAuthor').textContent = credit.credit;
 const license = $('photoLicense');
 license.replaceChildren();
 const label = credit.license === 'Public domain' ? t('Domena publiczna', 'Public domain') : credit.license;
 if (credit.licenseUrl) {
   const link = document.createElement('a');
   link.href = credit.licenseUrl;
   link.textContent = label;
   license.append(' · ', link);
 } else {
   license.textContent = ' · ' + label;
 }
 $('formulaFigure').hidden = !q.structure;
 if (q.structure) {
   $('formulaImage').src = 'media/' + q.structure.file + '.webp';
   $('formulaImage').alt = t(...q.structure.caption);
   $('formulaCaption').textContent = t(...q.structure.caption);
 }
 $('scoringHeading').textContent = t('Za co są punkty', 'What earns full credit') + ' · ' + q.points + t(' pkt', q.points === 1 ? ' mark' : ' marks');
 $('criterion').textContent = t(...q.criterion);
}
function render(){
 const q=questions[index];current=({'biologia/1.1':'protein','biologia/1.2':'transport'})[key(q)];
 document.documentElement.lang=lang;document.documentElement.dataset.theme=theme;
 set('learnHome','Nauka','Learning');set('study','Pracownia','Studio');set('library','Biblioteka','Library');set('heading','Pracownia nauki','Learning studio');
 $('study').setAttribute('aria-pressed',inStudio);$('library').setAttribute('aria-pressed',!inStudio);$('questionControls').hidden=!inStudio;$('studio').hidden=!inStudio;$('shelf').hidden=inStudio;
 set('prev','Poprzednie','Previous');set('next','Następne','Next');$('prev').disabled=index===0;$('next').disabled=index===questions.length-1;
 const sub=$('subject');sub.replaceChildren();sub.ariaLabel=t('Przedmiot','Subject');for(const s of ['biologia','chemia'])option(sub,s,subject(s));sub.value=q.s;
 const pick=$('pick');pick.replaceChildren();pick.ariaLabel=t('Zadanie','Question');
 questions.forEach((row,i)=>{if(row.s===q.s)option(pick,i,row.id+' · '+t(...row.title))});pick.value=index;
 $('badge').textContent=subject(q.s)+' · '+t('Maj 2026 · Zadanie ','May 2026 · Question ')+q.id;$('tasktitle').textContent=t(...q.prompt);
 set('solutionTitle','Odpowiedź','Answer');
 set('whyHeading','Jak to działa?','How it works');
 set('learnHeading','Co trzeba umieć?','What to learn');
 $('albuminEvidence').hidden=q.s!=='biologia'||!['1.1','1.2'].includes(q.id);
 $('modelAnswer').textContent=t(...q.modelAnswer);
 if (inStudio) renderAnswerMedia(q);
 $('why').textContent=t(...q.explanation);
 $('learn').textContent=t(...q.learn);
 $('solutionDiagram').hidden=!q.diagram;
 $('solutionDiagram').textContent=q.diagram||'';
 $('progress').textContent=(index+1)+' / '+questions.length;
 $('model').hidden=!current;
 if(current){const data=topics[current];$('modelTitle').textContent=t(...data.name);
 const legends={protein:t('Cys · cysteina　 ┄ mostek','Cys · cysteine　 ┄ bridge'),transport:t('Zielony owal · albumina　 złoty łańcuch · kwas tłuszczowy','Green oval · albumin　 gold chain · fatty acid')};
 $('legend').textContent=legends[current];$('countLabel').textContent=current==='protein'?t('Liczba reszt cysteiny','Number of cysteine residues'):t('Etap transportu','Transport stage');$('count').max=data.max;$('count').value=data.value;draw();}
 for(const [id,isKey,page] of [['questionLink',false,q.page],['keyLink',true,q.key]])$(id).href=paper(q.s,isKey)+'#page='+page;
 set('questionLink','Treść i ilustracje · PDF (PL)','Question and figures · PDF (Polish)');set('keyLink','Zasady oceniania · PDF (PL)','Marking guide · PDF (Polish)');
set('shelfTitle','Biblioteka','Library');set('papersTitle','Matura · Maj 2026','Matura · May 2026');set('resources','Materiały do nauki','Study materials');set('zpe','Od atomu do organizmu','From atom to organism (Polish)');set('cke','Informatory CKE','CKE exam guides (Polish)');
 $('papers').replaceChildren();for(const s of ['biologia','chemia']){const card=document.createElement('article');card.className='panel';card.innerHTML='<h3>'+subject(s)+'</h3><div class="paperline"><a href="'+paper(s)+'">'+t('Arkusz','Exam paper (Polish)')+'</a><a href="'+paper(s,true)+'">'+t('Zasady oceniania','Marking guide (Polish)')+'</a></div>';$('papers').append(card);}
}
function navigate(i) {
 index=i;
 history.replaceState(null, '', '#' + key(questions[i]));
 write('position', key(questions[i]));
 render();
}
window.addEventListener('hashchange', () => {
 const linked = questionFromLink();
 if (inStudio && linked >= 0 && linked !== index) navigate(linked);
});
$('prev').onclick=()=>navigate(index-1);$('next').onclick=()=>navigate(index+1);
$('pick').onchange=e=>navigate(Number(e.target.value));$('subject').onchange=e=>navigate(questions.findIndex(q=>q.s===e.target.value));
$('count').oninput=draw;
installPreferences(render);
