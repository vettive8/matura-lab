function storedPreference(key, fallback) {
  try { return localStorage.getItem('matura-' + key) ?? fallback; }
  catch { return fallback; }
}
let lang = storedPreference('language', 'pl') === 'en' ? 'en' : 'pl';
let theme = storedPreference('theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
function installPreferences(renderPage) {
  const languageButton = document.getElementById('language');
  const themeButton = document.getElementById('theme');
  function apply() {
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
