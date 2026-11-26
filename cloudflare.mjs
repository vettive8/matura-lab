import guides from "./guide-routes.json";
import {entries} from "./search-meta.mjs";
const origin = "https://mervive.com";
const directory = "/learn/";
const atlas = "/learn/matura/";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let path = url.pathname;
    if (url.hostname.endsWith(".workers.dev")) {
      path = atlas + path.slice(1);
    }
    if (["/learn", "/learn/matura", atlas + "zagadnienia", atlas + "koncepty", atlas + "biblioteka", atlas + "medycyna", atlas + "graf", atlas + "mapa"].includes(path)) path += "/";
    if (guides.includes(path + "/")) path += "/";
    if (url.origin !== origin || path !== url.pathname) {
      return Response.redirect(origin + path + url.search, 301);
    }
    if (path === directory+"sitemap.xml") {
      const urls=[...Object.keys(entries).map(key=>directory+key),...guides];
      return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(p=>'<url><loc>'+origin+p+'</loc></url>').join('')+'</urlset>',{headers:{"Content-Type":"application/xml; charset=utf-8"}});
    }
    let asset;
    if (path === directory) asset = "/directory.html";
    else if (path === atlas || path === atlas + "biblioteka/") asset = "/index.html";
    else if (path === atlas + "zagadnienia/" || path === atlas + "koncepty/") asset = "/guide.html";
    else if (path === atlas + "medycyna/") asset = "/medicine.html";
    else if (path === atlas + "graf/") asset = "/graph.html";
    else if (path === atlas + "mapa/") asset = "/stage-map.html";
    else if (guides.includes(path)) asset = path.slice(atlas.length - 1)+"index.html";
    else if (path.startsWith(atlas)) asset = path.slice(atlas.length - 1);
    if (!asset) return new Response("404", {status: 404});
    url.pathname = asset;
    const response=await env.ASSETS.fetch(new Request(url, request));
    const meta=entries[path.slice(directory.length)];
    if (!meta || !response.ok || !response.headers.get("Content-Type")?.includes("text/html")) return response;
    return new HTMLRewriter()
      .on("title",{element(el){el.setAttribute("data-search-title",meta[0]+" | Mervive");el.setInnerContent(meta[0]+" | Mervive");}})
      .on("head",{element(el){el.append('<meta name="description" content="'+meta[1]+'"><link rel="canonical" href="'+origin+path+'">',{html:true});}})
      .transform(response);
  }
};
