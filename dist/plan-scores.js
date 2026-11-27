for (const field of document.querySelectorAll('input[data-score]')) {
  const key = 'matura-plan-90-' + field.dataset.score;
  const result = field.parentElement.querySelector('output');
  try { field.value = localStorage.getItem(key) || ''; } catch {}
  function showResult() {
    result.textContent = field.value && field.validity.valid
      ? ' · ' + (field.valueAsNumber * 100 / 60).toFixed(1) + '%' : '';
  }
  field.addEventListener('input', () => {
    showResult();
    if (!field.validity.valid) return;
    try {
      if (field.value) localStorage.setItem(key, field.value);
      else localStorage.removeItem(key);
    } catch {}
  });
  showResult();
}
