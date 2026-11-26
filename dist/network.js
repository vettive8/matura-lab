const clusters = {
  atom:     [161,179,'#63bfee','Atomy','Atoms'],
  dna:      [453,126,'#b09cef','Genetyka','Genetics'],
  evidence: [791,135,'#f0b961','Pomiar','Evidence'],
  water:    [447,344,'#47cbbf','Roztwory','Solutions'],
  albumin:  [765,394,'#ee92ac','Albumina','Albumin'],
  membrane: [185,471,'#ade075','Błony','Membranes'],
  ph:       [505,584,'#fa9b73','Kwasy i zasady','Acids and bases']
};
const bounds = [960,710];
let camera = {x:0,y:0,zoom:1};
const shortName = key => translate(clusters[key].slice(3));
function point(key,index) {
  const [x,y] = clusters[key];
  // Keep stages in clockwise order. Alternating radii separate adjacent labels.
  const angle = index * Math.PI * 2/11 - Math.PI/2;
  const radius = index%2===0 ? 88 : 69;
  return [x + Math.cos(angle)*radius*1.25,y + Math.sin(angle)*radius];
}
function line(start,end,cls,tip='') {
  return '<line class="'+cls+'" x1="'+start[0]+'" y1="'+start[1]+'" x2="'+end[0]+'" y2="'+end[1]+'"><title>'+textSafe(tip)+'</title></line>';
}
function networkView(stage,topic) {
  const tr = (pl,en)=>translate([pl,en]);
  const index = stageIds.indexOf(stage);
  const select = (id,label,options) => '<label>'+label+'<select id="'+id+'">'+options+'</select></label>';
  const options = (keys,active,name) => keys.map(k=>'<option value="'+k+'" '+(k===active?'selected':'')+'>'+name(k)+'</option>').join('');
  const controls=select('map-stage',tr('Etap nauki','Learning stage'),options(stageIds,stage,nameOfStage))+
    select('map-topic',tr('Ścieżka','Path'),options(Object.keys(clusters),topic,shortName));
  const edgeMarkup=edges.map(([a,b,pl,en])=>line(clusters[a],clusters[b],'bridge '+([a,b].includes(topic)?'related':''),tr(pl,en))).join('');
  const regions=Object.entries(clusters).map(([key,[x,y,colour]])=>{
    const hubName=shortName(key);
    let strands='',dots='';
    stageIds.forEach((s,i)=>{
      const pt=point(key,i),[nx,ny]=pt, name=labelFor(key,i);
      if(i>0) strands+=line(point(key,i-1),pt,'progression',nameOfStage(stageIds[i-1])+' → '+nameOfStage(s));
      if([0,2,8,10].includes(i)) strands+=line([x,y],pt,'spoke',hubName+' · '+nameOfStage(s));
      const current = s===stage && key===topic;
      const visibleLabel = s===stage || (key===topic && [0,2,8,10].includes(i));
      const desc=hubName+' · '+nameOfStage(s)+' · '+name;
      dots+='<a href="#'+s+'/'+key+'" aria-label="'+desc+'" class="dot map-node '+(current?'active ':'')+(visibleLabel?'labelled ':'')+(s===stage?'same-stage':'')+'" '+(current?'aria-current="true"':'')+'><title>'+desc+'</title><circle class="hit" cx="'+nx+'" cy="'+ny+'" r="14"/><circle class="bead" cx="'+nx+'" cy="'+ny+'" r="'+(s===stage?8:5.5)+'"/><text x="'+nx+'" y="'+(ny+(ny>y?19:-12))+'">'+name+'</text></a>';
    });
    return '<g style="--cluster:'+colour+'"><ellipse class="halo" cx="'+x+'" cy="'+y+'" rx="119" ry="97"/>'+strands+
      '<a href="#'+stage+'/'+key+'" class="hub" aria-label="'+hubName+'"><title>'+hubName+'</title><circle cx="'+x+'" cy="'+y+'" r="22"/><text x="'+x+'" y="'+(y+38)+'">'+hubName+'</text></a>'+dots+'</g>';
  }).join('');
  const btn=(id,label,symbol)=>'<button type="button" id="'+id+'" title="'+label+'" aria-label="'+label+'">'+symbol+'</button>';
  return '<div class="net-controls">'+controls+'</div><p class="fine">'+tr('Duże koła oznaczają ścieżki, małe — pojęcia na kolejnych etapach. Linie przerywane łączą ścieżki. Przybliż mapę przyciskiem + i przeciągnij tło.','Large circles are paths. Small circles follow concepts through successive stages. Dashed lines connect paths. Zoom with + and drag the background to explore.')+'</p><div class="network-frame"><svg class="network-svg" viewBox="0 0 960 710" aria-label="'+tr('Graf siedmiu ścieżek i jedenastu etapów','Network of seven learning paths and eleven stages')+'">'+edgeMarkup+regions+'</svg><div class="net-tools">'+btn('zoom-out',tr('Oddal','Zoom out'),'−')+btn('zoom-in',tr('Przybliż','Zoom in'),'+')+btn('fit-map',tr('Pokaż całą mapę','Fit whole graph'),'⛶')+'</div></div><div class="network-caption"><b>'+labelFor(topic,index)+'</b> · '+nameOfStage(stage)+' <a href="#node-detail" id="read-node">'+tr('Czytaj ↓','Read ↓')+'</a></div>';
}
function bindNetwork(stage,topic) {
  const svg=document.querySelector('.network-svg');
  const clamp=(n,min,max)=>Math.max(min,Math.min(n,max));
  function apply() {
    const w=bounds[0]/camera.zoom,h=bounds[1]/camera.zoom;
    camera.x=clamp(camera.x,-w*.2,bounds[0]-w*.8);
    camera.y=clamp(camera.y,-h*.2,bounds[1]-h*.8);
    svg.setAttribute('viewBox',[camera.x,camera.y,w,h].join(' '));
    document.getElementById('zoom-out').disabled=camera.zoom<=1;
    document.getElementById('zoom-in').disabled=camera.zoom>=5;
  }
  function localPoint(e) {
    return new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.getScreenCTM().inverse());
  }
  function zoom(factor,anchor) {
    const old=camera.zoom;
    camera.zoom=clamp(old*factor,1,5);
    if(camera.zoom===1){camera.x=0;camera.y=0;}
    else {
      camera.x=anchor.x+(camera.x-anchor.x)*old/camera.zoom;
      camera.y=anchor.y+(camera.y-anchor.y)*old/camera.zoom;
    }
    apply();
  }
  const [x,y]=clusters[topic];
  document.getElementById('zoom-in').onclick=()=>zoom(1.5,{x,y});
  document.getElementById('zoom-out').onclick=()=>zoom(1/1.5,{x,y});
  document.getElementById('fit-map').onclick=()=>{camera={x:0,y:0,zoom:1};apply();};
  document.getElementById('map-topic').onchange=e=>{camera={x:0,y:0,zoom:1};location.hash=stage+'/'+e.target.value;};
  document.getElementById('read-node').onclick=e=>{e.preventDefault();const d=document.querySelector('.node-detail');d.tabIndex=-1;d.focus();d.scrollIntoView({block:'start'});};
  svg.addEventListener('wheel',e=>{if(!e.ctrlKey && !e.metaKey)return;e.preventDefault();zoom(e.deltaY<0?1.16:1/1.16,localPoint(e));},{passive:false});
  let origin,drag=false;
  svg.onpointerdown=e=>{if(e.button!==0)return;origin={x:e.clientX,y:e.clientY,left:camera.x,top:camera.y};drag=false;};
  svg.onpointermove=e=>{
    if(!origin || !e.buttons)return;
    const dx=e.clientX-origin.x,dy=e.clientY-origin.y;
    if(Math.hypot(dx,dy)<5 && !drag)return;
    drag=true;svg.setPointerCapture(e.pointerId);
    const scale=svg.getScreenCTM().a;
    camera.x=origin.left-dx/scale;camera.y=origin.top-dy/scale;apply();
  };
  svg.onpointerup=svg.onpointercancel=()=>{origin=null;};
  svg.addEventListener('click',e=>{if(drag){e.preventDefault();drag=false;}},true);
  apply();
}
