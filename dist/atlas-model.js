const domains = {
  atom:[175,138,'#5caee1','Atomy i materia','Atoms and matter','c1 c2 c3 c7 c10 c11'],
  water:[480,102,'#49bbae','Woda i roztwory','Water and solutions','c5 c9'],
  ph:[776,149,'#eea76a','Reakcje i równowaga','Reactions and equilibrium','c4 c6 c8 c16'],
  albumin:[170,358,'#e888ab','Cząsteczki życia','Molecules of life','b1 c12 c13 c14 c15 c17 c18 c19 c20 c21'],
  membrane:[467,326,'#91c774','Komórka i organizm','Cell and organism','b2 b3 b4 b10 b11'],
  dna:[767,369,'#ba98eb','Genetyka','Genetics','b12 b13 b14 b15 b16'],
  nature:[249,566,'#72c1a0','Różnorodność i środowisko','Diversity and environment','b5 b6 b7 b8 b9 b17 b18 c22'],
  evidence:[595,570,'#ddb65a','Dowody i pomiary','Evidence and measurement','']
};
const layerNames = [
 ['Podstawy','Foundations'],['Rozdziały','Chapters'],['Wymagania','Requirements'],['Zadania i arkusze','Tasks and papers'],
 ...stageIds.slice(2).map(s=>stageLabels[s]||['UZ · rok '+s,'UZ · year '+s])
];
const nodes = new Map(), connections=[];
function addNode(id,layer,xy,title,kind,data,domain,parent) {
  nodes.set(id,{id,layer,xy,title,kind,data,domain,parent});
  if(parent) connections.push([parent,id]);
}
function orbit(center,index,count,rx,ry,offset=-Math.PI/2) {
  const angle=offset+index*2*Math.PI/count;
  return [center[0]+rx*Math.cos(angle),center[1]+ry*Math.sin(angle)];
}
const chapterById={};
for(const [p,s] of [['b','biologia'],['c','chemia']]) {
  curriculum.filter(c=>c.level==='extended'&&!c.general&&c.subject===s).forEach((c,i)=>chapterById[p+(i+1)]=c);
}
const compactQuestion = q=>(q.s==='biologia'?'b':'c')+q.id;
const examChapters=new Map();
for(const [domain,d] of Object.entries(domains)) {
  addNode(domain,0,d.slice(0,2),d.slice(3,5),'foundation',domain,domain);
  const ids=d[5].split(' ').filter(Boolean);
  ids.forEach((id,i)=>{
    const ch=chapterById[id],xy=orbit(d,i,ids.length,100,74);
    addNode(id,1,xy,[ch.pl,ch.en],'chapter',id,domain,domain);
    ch.rows.forEach((r,j)=>{
      const radius=4+3.2*Math.sqrt(j);
      const pos=orbit(xy,j,1,radius,radius,j*2.39996);
      addNode(id+'-'+(j+1),2,pos,[r.pl,r.en],'item',{chapter:id,index:j},domain,id);
    });
    for(const q of graphChapters[id].qs) {
      if(!examChapters.has(q)) examChapters.set(q,[]);
      examChapters.get(q).push(id);
    }
  });
}
for(const [id,ch] of Object.entries(graphChapters)) for(const pre of ch.pre) connections.push([pre,id]);
for(const [left,right] of edges) connections.push([left,right]);
connections.push(['nature','evidence'],['nature','dna']);
questions.forEach((q,i)=>{
  const chs=examChapters.get(compactQuestion(q)),parent=nodes.get(chs[0]);
  const siblings=graphChapters[parent.id].qs;
  const xy=orbit(parent.xy,siblings.indexOf(compactQuestion(q)),siblings.length,34,31,.3);
  const id='q'+(i+1);
  addNode(id,3,xy,q.title,'exam',i,parent.domain,parent.id);
  for(const ch of chs.slice(1))connections.push([ch,id]);
});
for(const [topic,path] of Object.entries(graphPaths)) {
  const home=domains[topic];
  stageIds.slice(1).forEach((stage,j)=>{
    const id=stage+'/'+topic,layer=j===0?3:j+3;
    const xy=orbit(home,j,10,120,94,.2);
    addNode(id,layer,xy,nodeLabels[topic][j+1].split('/'),'stage',{stage,topic,index:j+1},topic,j?stageIds[j]+'/'+topic:topic);
    if(!j) for(const q of path.qs)connections.push([id,'q'+(questions.findIndex(x=>compactQuestion(x)===q)+1)]);
  });
}
uzCourses.forEach((course,i)=>{
  const year=Math.ceil(course.semester/2),q=course.question.replace('biologia/','b').replace('chemia/','c');
  const questionId='q'+(questions.findIndex(x=>compactQuestion(x)===q)+1);
  const related=nodes.get(questionId);
  const topic=related.domain==='nature'?'evidence':related.domain;
  const center=nodes.get(year+'/'+topic);
  const peers=Array.from(nodes.values()).filter(n=>n.parent===center.id&&n.kind==='course').length;
  const r=8+4*Math.sqrt(peers);
  addNode('uz'+(i+1),year+3,orbit(center.xy,0,1,r,r,peers*2.39996),course.title,'course',i,topic,center.id);
  connections.push([questionId,'uz'+(i+1)]);
});
const generalGroups=curriculum.filter(c=>c.level==='extended'&&c.general);
generalGroups.forEach((ch,i)=>{
  const center=orbit(domains.evidence,i,generalGroups.length,98,68);
  ch.rows.forEach((r,j)=>{
    const xy=orbit(center,j,ch.rows.length,14,14);
    addNode('skill'+i+'-'+j,2,xy,[r.pl,r.en],'general',ch,'evidence','evidence');
  });
});

const practicePapers = [
  {
    "year": 2023,
    "chem": false,
    "urls": [
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2023/Biologia/MBIP-R0-100-2305.pdf",
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2023/Biologia/MBIP-R0-100-2305-zasady.pdf"
    ]
  },
  {
    "year": 2023,
    "chem": true,
    "urls": [
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2023/Chemia/MCHP-R0-100-2305.pdf",
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2023/Chemia/MCHP-R0-100-2305-zasady.pdf"
    ]
  },
  {
    "year": 2024,
    "chem": false,
    "urls": [
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2024/Biologia/MBIP-R0-100-A-2405-arkusz.pdf",
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2024/Biologia/MBIP-R0-100-2405-zasady.pdf"
    ]
  },
  {
    "year": 2024,
    "chem": true,
    "urls": [
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2024/Chemia/MCHP-R0-100-A-2405-arkusz.pdf",
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2024/Chemia/MCHP-R0-100-2405-zasady.pdf"
    ]
  },
  {
    "year": 2025,
    "chem": false,
    "urls": [
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2025/Biologia/MBIP-R0-100-A-2505-arkusz.pdf",
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2025/zasady_oceniania/MBIP-R0-100-2505-zasady.pdf"
    ]
  },
  {
    "year": 2025,
    "chem": true,
    "urls": [
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2025/Chemia/MCHP-R0-100-A-2505-arkusz.pdf",
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2025/zasady_oceniania/MCHP-R0-100-2505-zasady.pdf"
    ]
  },
  {
    "year": 2026,
    "chem": false,
    "urls": [
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2026/Biologia/MBIP-R0-100-A-2605-arkusz.pdf",
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2026/Biologia/MBIP-R0-100-2605-zasady.pdf"
    ]
  },
  {
    "year": 2026,
    "chem": true,
    "urls": [
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2026/Chemia/MCHP-R0-100-A-2605-arkusz.pdf",
      "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Arkusze_egzaminacyjne/2026/Chemia/MCHP-R0-100-2605-zasady.pdf"
    ]
  }
];
practicePapers.forEach((p,i)=>{
 const xy=orbit(domains.evidence,i,practicePapers.length,62,48);
 const name=p.chem?['Chemia','Chemistry']:['Biologia','Biology'];
 addNode('paper'+i,3,xy,[name[0]+' · maj '+p.year,name[1]+' · May '+p.year],'paper',p,'evidence','evidence');
});
