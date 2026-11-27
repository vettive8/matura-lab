chrome.action.onClicked.addListener(async tab => {
  if (new URL(tab.url || "about:blank").hostname !== "chatgpt.com") {
    await chrome.action.setBadgeText({ tabId: tab.id, text: "GPT" });
    return;
  }
  await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["export.js"] });
});

// Chrome's own saved-page archive can contain displayed cross-origin images
// that a content script cannot read through fetch or canvas.
function archiveImages(raw, wanted) {
  const boundary = raw.slice(0, raw.indexOf("\r\n\r\n")).match(/boundary="([^"]+)"/i)?.[1];
  const images = {};
  if (!boundary) return images;
  for (const part of raw.split("--" + boundary)) {
    const cut = part.indexOf("\r\n\r\n");
    if (cut < 0) continue;
    const head = part.slice(0, cut).replace(/\r\n[ \t]+/g, "");
    const url = head.match(/^Content-Location:\s*([^\r\n]+)/im)?.[1]?.trim();
    const mime = head.match(/^Content-Type:\s*(image\/[a-z0-9.+-]+)/im)?.[1];
    if (!url || !wanted.has(url) || !mime || !/^Content-Transfer-Encoding:\s*base64/im.test(head)) continue;
    images[url] = "data:" + mime + ";base64," + part.slice(cut + 4).replace(/\s/g, "");
  }
  return images;
}

chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  if (msg.type !== "lesson-images" || !sender.tab || new URL(sender.url).hostname !== "chatgpt.com") return;
  chrome.pageCapture.saveAsMHTML({ tabId: sender.tab.id })
    .then(blob => blob.text())
    .then(raw => reply(archiveImages(raw, new Set(msg.urls))))
    .catch(() => reply({}));
  return true;
});
