const allNodes=Array.from(nodes.values());
let enabled=new Set([0]);
try {
 const stored=JSON.parse(localStorage.getItem('atlas-layers-v1'));
 if(Array.isArray(stored))enabled=new Set(stored.filter(n=>Number.isInteger(n)&&layerNames[n]));
} catch {}
let layersOpen=false,searchOpen=false,searchTerm='';
function selectedId(){
 const key=location.hash.slice(1);
 return key.startsWith('foundation/')?key.slice(11):key;
}
function storeLayers(){try{localStorage.setItem('atlas-layers-v1',JSON.stringify([...enabled]));}catch{}}
function chooseLayers(indices) {
 enabled=new Set(indices);storeLayers();
 const key=selectedId().replace(/^learn\//,'');
 const current=nodes.get(key==='pairs'?'albumin':key);
 if(current&&!enabled.has(current.layer))history.replaceState(null,'',location.pathname+location.search);
 renderAtlas();
}
function showNode(id) {
 if(location.hash==='#'+id){renderAtlas();return;}
 location.hash=id;
}
function svgContents(active) {
 const visible=allNodes.filter(n=>enabled.has(n.layer));
 const lines=connections.flatMap(([a,b])=>{
  const l=nodes.get(a),r=nodes.get(b);
  if(!enabled.has(l.layer)||!enabled.has(r.layer))return [];
  return ['<line x1="'+l.xy[0]+'" y1="'+l.xy[1]+'" x2="'+r.xy[0]+'" y2="'+r.xy[1]+'" class="'+(active===a||active===b?'lit':l.domain!==r.domain?'cross':'')+'"/>'];
 });
 return lines.join('')+visible.map(n=>{
  const [x,y]=n.xy,size=({paper:6,foundation:15,chapter:6.5,exam:4,stage:4.7,course:2.5,item:1.9,general:2.5})[n.kind];
  const name=safe(translate(n.title)),label=n.kind==='exam'?'#'+(n.data+1):name;
  return '<a class="atlas-dot '+n.kind+(n.id===active?' current':'')+'" href="#'+n.id+'" aria-label="'+name+'"><title>'+name+'</title><circle cx="'+x+'" cy="'+y+'" r="'+size+'" fill="'+domains[n.domain][2]+'"/><text x="'+x+'" y="'+(y+size+8)+'">'+(label.length>48?label.slice(0,45)+'…':label)+'</text></a>';
 }).join('');
}
function updateResults() {
 const normalize=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('ł','l');
 const term=normalize(searchTerm.trim());
 const matches=allNodes.filter(n=>!term?n.kind==='foundation':normalize(n.title.join(' ')+' '+n.id).includes(term));
 document.getElementById('find-results').innerHTML=(term?'<p>'+say('Wyniki','Matches')+' · '+matches.length+(matches.length>100?say(' · pierwsze 100',' · first 100'):'')+'</p>':'')+
 bullet(matches.slice(0,100).map(n=>openNode(n.id,translate(n.title)+' · '+translate(layerNames[n.layer]))));
}
const clearPanel=()=>{history.replaceState(null,'',location.pathname+location.search);renderAtlas();};
function renderAtlas(){
 const key=selectedId();
 const step=key.startsWith('learn/') && studyRoute.includes(key.slice(6))?key.slice(6):null;
 const id=step==='pairs'?'albumin':step||key,current=nodes.get(id);
 if(step){try{localStorage.setItem('matura-current-step',step);}catch{}}
 if(current&&!enabled.has(current.layer)){enabled.add(current.layer);storeLayers();}
 const count=allNodes.filter(n=>enabled.has(n.layer)).length;
 const name=say('Atlas wiedzy','Knowledge atlas');
 const tool=(id,label,glyph)=>'<button type="button" id="'+id+'" aria-label="'+label+'" title="'+label+'">'+glyph+'</button>';
 const next=layerNames.findIndex((_,i)=>!enabled.has(i));
 const layerRows=layerNames.map((l,i)=>'<label><input type="checkbox" data-layer="'+i+'" '+(enabled.has(i)?'checked':'')+'>'+safe(translate(l))+' <small>'+allNodes.filter(n=>n.layer===i).length+'</small></label>').join('');
 const stages=current?.kind==='stage'?stageIds.filter(s=>s!=='foundation').map(s=>openNode(s+'/'+current.domain,nameOfStage(s))).join(' · '):'';
 document.title=name+' · Matura';
 const root=document.querySelector('#graph');
 root.innerHTML='<div class="atlas-bar"><h1>'+name+'</h1><button id="layers" aria-expanded="'+layersOpen+'">'+say('Warstwy','Layers')+' · '+enabled.size+'</button>'+tool('find',say('Szukaj we wszystkich warstwach','Search all layers'),'⌕')+tool('full',say('Przełącz pełny ekran','Toggle fullscreen'),'⛶')+'</div>'+
 (!current && !layersOpen && !searchOpen?routeStart():'')+'<div class="atlas-space"><svg class="network-svg" viewBox="0 0 960 710" aria-label="'+name+'">'+svgContents(id)+'</svg>'+
 '<div class="atlas-foot"><span>'+say('Węzły','Nodes')+' · '+count+'</span>'+(next>=0?'<button id="next-layer">'+say('Pokaż warstwę','Show layer')+' · '+translate(layerNames[next])+'</button>':'')+'</div>'+
 '<div class="net-tools">'+tool('zoom-out',say('Oddal','Zoom out'),'−')+tool('zoom-in',say('Przybliż','Zoom in'),'+')+tool('fit-map',say('Dopasuj mapę','Fit map'),'⊙')+'</div></div>'+
 (layersOpen?'<aside class="atlas-menu"><h2>'+say('Widoczne warstwy','Visible layers')+'</h2>'+layerRows+'<div class="actions"><button id="first">'+say('Tylko podstawy','Foundations only')+'</button><button id="all">'+say('Pokaż wszystko','Show all')+'</button></div></aside>':'')+
 (searchOpen?'<aside class="atlas-menu"><label for="find-input">'+say('Szukaj we wszystkich warstwach','Search all layers')+'</label><input type="search" id="find-input" value="'+safe(searchTerm)+'"><div id="find-results"></div></aside>':'')+
 (step?routeReader(step):current?'<article class="study-sheet"><button id="close-sheet" aria-label="'+say('Zamknij lekcję','Close lesson')+'">×</button><small>'+translate(layerNames[current.layer])+'</small><h2>'+safe(translate(current.title))+'</h2>'+study(current)+(stages?'<h3>'+say('Inne etapy','Other stages')+'</h3>'+stages:'')+'</article>':'');
 bindNetwork(current?.xy||[480,355]);
 const el=id=>document.getElementById(id);
 el('layers').onclick=()=>{layersOpen=!layersOpen;searchOpen=false;renderAtlas();el('layers').focus();};
 el('find').onclick=()=>{searchOpen=!searchOpen;layersOpen=false;renderAtlas();el('find-input')?.focus();};
 el('full').onclick=async()=>{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();};
 if(!document.fullscreenEnabled)el('full').hidden=true;
 if(el('next-layer'))el('next-layer').onclick=()=>chooseLayers([...enabled,next]);
 if(layersOpen){
  root.querySelectorAll('[data-layer]').forEach(box=>box.onchange=()=>{const i=Number(box.dataset.layer);chooseLayers(box.checked?[...enabled,i]:[...enabled].filter(n=>n!==i));root.querySelector('[data-layer="'+i+'"]').focus();});
  el('all').onclick=()=>chooseLayers(layerNames.map((_,i)=>i));
  el('first').onclick=()=>{layersOpen=false;chooseLayers([0]);};
 }
 if(searchOpen){el('find-input').oninput=e=>{searchTerm=e.target.value;updateResults();};updateResults();}
 if(current)el('close-sheet').onclick=clearPanel;
}
window.addEventListener('hashchange',()=>{layersOpen=false;searchOpen=false;renderAtlas();document.querySelector('.route-reader h2')?.focus({preventScroll:true});});
window.addEventListener('keydown',e=>{if(e.key==='Escape' && !document.querySelector('main').inert){if(layersOpen||searchOpen){layersOpen=false;searchOpen=false;renderAtlas();}else if(selectedId())clearPanel();}});
installPreferences(renderAtlas);
