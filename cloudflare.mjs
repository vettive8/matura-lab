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
    if (["/learn", "/learn/matura", atlas + "zagadnienia", atlas + "koncepty"].includes(path)) path += "/";
    if (url.origin !== origin || path !== url.pathname) {
      return Response.redirect(origin + path + url.search, 302);
    }
    let asset;
    if (path === directory) asset = "/directory.html";
    else if (path === atlas) asset = "/index.html";
    else if (path === atlas + "zagadnienia/" || path === atlas + "koncepty/") asset = "/guide.html";
    else if (path.startsWith(atlas)) asset = path.slice(atlas.length - 1);
    if (!asset) return new Response("404", {status: 404});
    url.pathname = asset;
    return env.ASSETS.fetch(new Request(url, request));
  }
};
