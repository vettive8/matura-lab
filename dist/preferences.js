function storedPreference(key, fallback) {
  try { return localStorage.getItem('matura-' + key) ?? fallback; }
  catch { return fallback; }
}
let lang = storedPreference('language', 'pl') === 'en' ? 'en' : 'pl';
let theme = storedPreference('theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
function installPreferences(renderPage) {
  const languageButton = document.getElementById('language');
  const themeButton = document.getElementById('theme');
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
  let open;
  function reset() {
    open = !narrow.matches && storedPreference('sidebar', 'open') === 'open';
    update();
  }
  function update() {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.title = toggle.ariaLabel = lang === 'pl'
      ? (open ? 'Ukryj menu' : 'Pokaż menu')
      : (open ? 'Hide menu' : 'Show menu');
    toggle.textContent = open ? '‹' : '☰';
    document.body.classList.toggle('sidebar-open', open);
    main.inert = open && narrow.matches;
    shade.hidden = !main.inert;
  }
  function change(value) {
    open = value;
    if (!narrow.matches) {
      try { localStorage.setItem('matura-sidebar', open ? 'open' : 'closed'); } catch {}
    }
    update();
    if (!open) toggle.focus();
  }
  toggle.onclick = () => change(!open);
  shade.onclick = () => change(false);
  document.addEventListener('keydown', e => {
    if (open && e.key === 'Escape') change(false);
  });
  panel.querySelectorAll('nav a').forEach(link => {
    if (link.pathname === location.pathname) link.setAttribute('aria-current', 'page');
  });
  narrow.addEventListener('change', reset);
  reset();
  return update;
}
