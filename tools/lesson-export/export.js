(() => {
  if (globalThis.merviveLessonExport) { globalThis.merviveLessonExport(); return; }
  const allowed = new Set("p div span section article h1 h2 h3 h4 h5 h6 ul ol li dl dt dd table thead tbody tfoot tr th td caption figure figcaption a strong b em i sub sup blockquote pre code br hr s del".split(" "));
  function url(value) {
    try {
      const u = new URL(value, location.href);
      return value && ["http:", "https:"].includes(u.protocol) ? u.href : "";
    } catch { return ""; }
  }
  async function exportLesson(host) {
    const out = document.implementation.createHTMLDocument("");
    const main = out.createElement("main");
    out.body.append(main);
    const images = [];
    function copy(src, parent) {
      if (src.nodeType === Node.TEXT_NODE) { parent.append(src.textContent); return; }
      if (src.nodeType !== Node.ELEMENT_NODE || src.matches("script,style,textarea,input,nav,[data-lesson-tools],.katex-html,[data-testid*=copy-turn]")) return;
      const tag = src.localName;
      if (src.matches(".katex")) {
        const tex = src.querySelector('annotation[encoding="application/x-tex"]')?.textContent;
        if (tex) {
          const math = out.createElement("span");
          math.dataset.tex = tex;
          math.textContent = tex;
          parent.append(math);
          return;
        }
      }
      if (tag === "img" || tag === "canvas" || tag === "svg") {
        if (tag === "svg" && (src.closest("button,a") || src.getBoundingClientRect().width < 40)) return;
        const img = out.createElement("img");
        img.alt = src.getAttribute("alt") || src.getAttribute("aria-label") || "";
        const original = src.currentSrc || src.getAttribute("src") || "";
        if (url(original)) img.dataset.original = url(original);
        try {
          if (tag === "svg") {
            // Render only graphical SVG elements, without interactive or external content.
            const clone = src.cloneNode(true);
            clone.querySelectorAll("script,style,foreignObject,image,use,animate,set").forEach(n => n.remove());
            for (const el of [clone,...clone.querySelectorAll("*")])
              for (const a of [...el.attributes]) if (/^on|href$|^style$/i.test(a.name)) el.removeAttribute(a.name);
            img.src = "data:image/svg+xml," + encodeURIComponent(new XMLSerializer().serializeToString(clone));
          } else if (tag === "canvas") img.src = src.toDataURL();
          else if (/^data:image\//i.test(original)) img.src = original;
          else {
            const canvas = document.createElement("canvas");
            canvas.width = src.naturalWidth; canvas.height = src.naturalHeight;
            if (canvas.width && canvas.height) {
              canvas.getContext("2d").drawImage(src, 0, 0);
              img.src = canvas.toDataURL("image/png");
            }
          }
        } catch { /* A cross-origin image can still be present in the browser archive. */ }
        images.push({img, original});
        parent.append(img);
        return;
      }
      if (tag === "button" && !src.querySelector("img,canvas,a[href]")) return;
      const dest = allowed.has(tag) ? out.createElement(tag) : parent;
      if (dest !== parent) {
        if (tag === "a" && url(src.getAttribute("href"))) dest.href = url(src.getAttribute("href"));
        for (const attr of ["colspan","rowspan","start"]) if (/^\d+$/.test(src.getAttribute(attr))) dest.setAttribute(attr,src.getAttribute(attr));
        parent.append(dest);
      }
      for (const node of src.childNodes) copy(node,dest);
    }
    copy(host,main);
    const missing = images.filter(({img}) => !img.hasAttribute("src"));
    if (missing.length) {
      let recovered = {};
      try { recovered = await chrome.runtime.sendMessage({type:"lesson-images",urls:missing.map(x=>x.original)}) || {}; } catch {}
      for (const {img,original} of missing) if (recovered[original]) img.src = recovered[original];
    }
    let embedded = 0;
    for (const {img,original} of images) {
      if (img.hasAttribute("src")) { embedded++; continue; }
      const target = out.createElement(url(original) ? "a" : "span");
      if (url(original)) target.href = url(original);
      target.textContent = "[Brak obrazu / Missing image] " + (img.alt || original);
      img.replaceWith(target);
    }
    out.title = main.querySelector("h1,h2,h3")?.textContent.trim() || "AES lesson";
    const meta = out.createElement("meta"); meta.charset="utf-8"; out.head.prepend(meta);
    const style=out.createElement("style");style.textContent="body{max-width:78ch;margin:3rem auto;padding:0 1rem;font:18px/1.6 system-ui}img{max-width:100%;height:auto}table{border-collapse:collapse}td,th{border:1px solid #aaa;padding:.4em}pre{white-space:pre-wrap}";out.head.append(style);
    const text = (host.innerText || "") + "\n\n" + [...new Set([...main.querySelectorAll("a[href]")].map(a=>a.href))].join("\n");
    return {html:"<!doctype html>\n"+out.documentElement.outerHTML,text,title:out.title,embedded,total:images.length};
  }
  function mount() {
    for (const host of document.querySelectorAll('[data-message-author-role="assistant"]')) {
      const turn = host.closest('article,[data-testid^="conversation-turn-"]') || host;
      if (turn.querySelector("[data-lesson-tools]")) continue;
      const bar = document.createElement("div"); bar.dataset.lessonTools="";
      bar.style.cssText="display:flex;flex-wrap:wrap;gap:12px;align-items:center;padding:8px;font:14px system-ui";
      const status=document.createElement("span");status.setAttribute("role","status");
      for (const [label,save] of [["Kopiuj / Copy",false],["Zapisz HTML / Save HTML",true]]) {
        const btn=document.createElement("button");btn.type="button";btn.textContent=label;
        btn.style.cssText="border:1px solid currentColor;padding:5px 10px;border-radius:8px;cursor:pointer";
        btn.onclick=async()=>{
          btn.disabled=true;status.textContent="…";
          try {
            const content=exportLesson(turn);
            if (!save) {
              await navigator.clipboard.write([new ClipboardItem(Object.fromEntries(
                [["text/html","html"],["text/plain","text"]].map(([type,key])=>[type,content.then(x=>new Blob([x[key]],{type}))])
              ))]);
            }
            const x=await content;
            if (save) {
              const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([x.html],{type:"text/html;charset=utf-8"}));
              a.download=(x.title.replace(/[<>:"/\\|?*\x00-\x1f]/g," ").trim().slice(0,80)||"AES")+" - lesson.html";
              a.click();setTimeout(()=>URL.revokeObjectURL(a.href),60000);
            }
            status.textContent=(save?"Zapisano / Saved":"Skopiowano / Copied")+" · "+x.embedded+"/"+x.total+" ilustracji / images";
          } catch(e) {status.textContent="Błąd / Error: "+e.message;}
          finally {btn.disabled=false;}
        };
        bar.append(btn);
      }
      bar.append(status);turn.append(bar);
    }
  }
  globalThis.merviveLessonExport=mount;
  mount();
  let timer;
  new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(mount,300);}).observe(document.body,{subtree:true,childList:true});
})();
