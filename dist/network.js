const bounds=[960,710];
let camera={x:0,y:0,zoom:1};
function bindNetwork(anchor) {
  const svg=document.querySelector('.network-svg');
  const clamp=(n,min,max)=>Math.max(min,Math.min(n,max));
  function apply() {
    const w=bounds[0]/camera.zoom,h=bounds[1]/camera.zoom;
    camera.x=clamp(camera.x,-w*.2,bounds[0]-w*.8);
    camera.y=clamp(camera.y,-h*.2,bounds[1]-h*.8);
    svg.dataset.detail=camera.zoom>4?'high':camera.zoom>1.6?'medium':'low';
    svg.setAttribute('viewBox',[camera.x,camera.y,w,h].join(' '));
    document.getElementById('zoom-out').disabled=camera.zoom<=1;
    document.getElementById('zoom-in').disabled=camera.zoom>=24;
  }
  function localPoint(e) {
    return new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.getScreenCTM().inverse());
  }
  function zoom(factor,anchor) {
    const old=camera.zoom;
    camera.zoom=clamp(old*factor,1,24);
    if(camera.zoom===1){camera.x=0;camera.y=0;}
    else {
      camera.x=anchor.x+(camera.x-anchor.x)*old/camera.zoom;
      camera.y=anchor.y+(camera.y-anchor.y)*old/camera.zoom;
    }
    apply();
  }
  const [x,y]=anchor;
  document.getElementById('zoom-in').onclick=()=>zoom(1.5,{x,y});
  document.getElementById('zoom-out').onclick=()=>zoom(1/1.5,{x,y});
  document.getElementById('fit-map').onclick=()=>{camera={x:0,y:0,zoom:1};apply();};
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
