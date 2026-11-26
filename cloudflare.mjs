export default {
  async fetch(request, env) {
    const supplied = request.headers.get("Authorization") ?? "";
    const expected = "Basic " + btoa("atlas:" + env.ATLAS_PASSWORD);
    const encode = new TextEncoder();
    const digest = value => crypto.subtle.digest("SHA-256", encode.encode(value));
    const [actual, required] = await Promise.all([digest(supplied), digest(expected)]);
    if (!env.ATLAS_PASSWORD || !crypto.subtle.timingSafeEqual(actual, required)) {
      return new Response("Logowanie wymagane / Sign-in required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Atlas Matura", charset="UTF-8"',
          "Cache-Control": "private, no-store"
        }
      });
    }
    const headers = new Headers(request.headers);
    headers.delete("Authorization");
    const asset = await env.ASSETS.fetch(new Request(request, { headers }));
    const response = new Response(asset.body, asset);
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }
};
