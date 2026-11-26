function storedPreference(key, fallback) {
  try { return localStorage.getItem('matura-' + key) ?? fallback; }
  catch { return fallback; }
}
const linkedLanguage = new URLSearchParams(location.search).get('lang');
if (['en','pl'].includes(linkedLanguage)) {
  try {localStorage.setItem('matura-language', linkedLanguage);} catch {}
  const cleanUrl = new URL(location.href);
  cleanUrl.searchParams.delete('lang');
  history.replaceState(null,'',cleanUrl);
}
let lang = (['en','pl'].includes(linkedLanguage)?linkedLanguage:storedPreference('language', 'pl')) === 'en' ? 'en' : 'pl';
let theme = storedPreference('theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
function installPreferences(renderPage) {
  const languageButton = document.getElementById('language');
  const themeButton = document.getElementById('theme');
  const nav = document.querySelector('#sidebar nav');
  if (nav && !nav.querySelector('a[href="/learn/matura/formula-2015/"]')) {
    const track = document.createElement('a');
    track.href = '/learn/matura/formula-2015/';
    track.dataset.pl = 'Matura · Formuła 2015';
    track.dataset.en = 'Matura · Formula 2015';
    nav.prepend(track);
  }
  if (nav) {
    const track = nav.querySelector('a[href="/learn/matura/formula-2015/"]');
    let previous = track;
    for (const [route, pl, en] of [
      ['30-dni','Plan na 30 dni','30-day study plan'],
      ['tasks','Zadania z rozwiązaniami','Worked exam tasks'],
      ['concepts','Pojęcia od podstaw','Concepts from the beginning']
    ]) {
      const href = '/learn/matura/formula-2015/' + route + '/';
      if (nav.querySelector('a[href="' + href + '"]')) continue;
      const entry = document.createElement('a');
      entry.href = href;
      entry.dataset.pl = pl;
      entry.dataset.en = en;
      if (previous) previous.after(entry); else nav.append(entry);
      previous = entry;
    }
  }
  for (const anchor of document.querySelectorAll('#sidebar nav a[href="/learn/matura/biblioteka/"]')) {
    anchor.dataset.pl = 'Biblioteka · Formuła 2023';
    anchor.dataset.en = 'Library · Formula 2023';
  }
  const refreshSidebar = installSidebar();
  function apply() {
    refreshSidebar();
    document.documentElement.lang = lang;
    document.documentElement.dataset.theme = theme;
    languageButton.textContent = lang === 'pl' ? 'EN' : 'PL';
    languageButton.title = languageButton.ariaLabel = lang === 'pl' ? 'Przełącz na angielski' : 'Switch to Polish';
    themeButton.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeButton.title = themeButton.ariaLabel = lang === 'pl'
      ? (theme === 'dark' ? 'Włącz jasny motyw' : 'Włącz ciemny motyw')
      : (theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    document.querySelectorAll('[data-pl][data-en]').forEach(el => { el.textContent = el.dataset[lang]; });
    renderPage();
    const searchTitle = document.querySelector('title')?.dataset.searchTitle;
    if (lang === 'pl' && !location.hash && searchTitle) document.title = searchTitle;
  }
  function persist(key, value) {
    try { localStorage.setItem('matura-' + key, value); } catch {}
    apply();
  }
  languageButton.onclick = () => { lang = lang === 'pl' ? 'en' : 'pl'; persist('language', lang); };
  themeButton.onclick = () => { theme = theme === 'dark' ? 'light' : 'dark'; persist('theme', theme); };
  apply();
}
function installSidebar() {
  const panel = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebarToggle');
  const shade = document.getElementById('sidebarShade');
  const main = document.querySelector('main');
  const narrow = matchMedia('(max-width:760px)');
  const mac = /Mac|iPhone|iPad/.test(navigator.platform);
  toggle.querySelector('kbd').textContent = mac ? '⌘⇧S' : 'Ctrl+Shift+S';
  let open;
  function reset() {
    open = !narrow.matches && storedPreference(document.body.classList.contains('atlas-page')?'atlas-sidebar':'sidebar', document.body.classList.contains('atlas-page')?'closed':'open') === 'open';
    update();
  }
  function update() {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    const label = lang === 'pl' ? 'Przełącz panel boczny' : 'Toggle sidebar';
    toggle.ariaLabel = label;
    toggle.querySelector('.toggle-tip span').textContent = label;
    document.body.classList.toggle('sidebar-open', open);
    main.inert = open && narrow.matches;
    shade.hidden = !main.inert;
  }
  function change(value) {
    open = value;
    if (!narrow.matches) {
      try { localStorage.setItem(document.body.classList.contains('atlas-page')?'matura-atlas-sidebar':'matura-sidebar', open ? 'open' : 'closed'); } catch {}
    }
    update();
    if (!open) toggle.focus();
  }
  toggle.onclick = () => change(!open);
  shade.onclick = () => change(false);
  document.addEventListener('keydown', e => {
    if ((mac ? e.metaKey : e.ctrlKey) && e.shiftKey && !e.altKey && e.code === 'KeyS') {
      e.preventDefault();
      if (!e.repeat) change(!open);
    }
    if (open && e.key === 'Escape') change(false);
  });
  panel.querySelectorAll('nav a').forEach(link => {
    if (link.pathname === location.pathname) link.setAttribute('aria-current', 'page');
  });
  narrow.addEventListener('change', reset);
  reset();
  return update;
}
