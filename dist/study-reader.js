const studyFilter = document.querySelector('#study-filter');
function updateReader() {
  const title = document.querySelector('h1 .' + lang) || document.querySelector('h1');
  document.title = title.textContent + ' | Mervive';
  if (!studyFilter) return;
  const normalise = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('ł','l');
  const query = normalise(studyFilter.value.trim());
  let count = 0;
  for (const row of document.querySelectorAll('.searchable li')) {
    row.hidden = !normalise(row.textContent).includes(query);
    if (!row.hidden) count++;
  }
  document.querySelector('#study-count').textContent = query ? (lang === 'pl' ? 'Wyniki · ' : 'Results · ') + count : '';
}
studyFilter?.addEventListener('input',updateReader);
installPreferences(updateReader);
