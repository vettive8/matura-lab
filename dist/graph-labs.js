const labs = {
  atom: [6,8,6,'Neutrony w jądrze węgla','Neutrons in a carbon nucleus'],
  water: [1,5,1,'Objętość w porcjach po 100 ml','Volume in units of 100 mL'],
  ph: [2,9,7,'pH roztworu','Solution pH'],
  albumin: [1,35,35,'Reszty cysteiny w jednym łańcuchu','Cysteine residues in one chain'],
  membrane: [0,10,8,'Stężenie po lewej (mmol/l)','Left concentration (mmol/L)'],
  dna: [1,6,2,'Liczba dzieci w modelu Aa × aa','Number of children in the Aa × aa model'],
  evidence: [1,30,5,'Częstość choroby w badanej grupie (%)','Prevalence in the tested group (%)']
};
const labValues = {};
function experiment(id) {
  const [min,max,initial,pl,en] = labs[id];
  const value = labValues[id] ?? initial;
  return '<section class="bench"><h2>'+t('Doświadczenie na ekranie','On-screen experiment')+'</h2><label for="control">'+t(pl,en)+'</label><div class="knob"><input id="control" type="range" min="'+min+'" max="'+max+'" value="'+value+'"><output for="control" id="setting"></output></div><div id="observation" aria-live="polite"></div></section>';
}
function bindLab(id) {
  const slider = document.getElementById('control');
  const num = n => n.toLocaleString(lang,{maximumFractionDigits:4});
  function draw() {
    const v = Number(slider.value);
    labValues[id] = v;
    document.getElementById('setting').textContent = v;
    let result, fraction, caption;
    switch(id) {
      case 'atom':
        result = 'C–'+(6+v);
        fraction = v/(6+v);
        caption = t('Udział neutronów w jądrze. Sześć protonów oznacza węgiel. Dodanie neutronu zwiększa liczbę masową o jeden.','Fraction of nuclear particles that are neutrons. Six protons identify carbon. Adding one neutron raises the mass number by one.');
        break;
      case 'water':
        result = num(0.01/(v/10))+' mol/L';
        fraction = 1/v;
        caption = t('Stężenie względem początkowego. W '+v*100+' ml roztworu nadal jest 0,01 mol substancji. Podwojenie objętości zmniejsza stężenie o połowę.','Concentration relative to the starting value. The '+v*100+' mL solution still contains 0.01 mol of solute. Doubling its volume halves the concentration.');
        break;
      case 'ph':
        result = '[H⁺] ≈ 10<sup>−'+v+'</sup> mol/L';
        fraction = (v-2)/7;
        caption = t('Położenie na skali pH od 2 do 9. Przesuń suwak o jeden w prawo. W rozcieńczonym roztworze stężenie H⁺ spada wtedy dziesięciokrotnie.','Position on the pH scale from 2 to 9. Move one step right. In this dilute-solution model the hydrogen-ion concentration falls tenfold.');
        break;
      case 'albumin':
        result = t('Maksymalna liczba mostków','Maximum bridges')+' · '+Math.floor(v/2);
        fraction = (v-v%2)/v;
        caption = t('Część reszt w parach. Każdy mostek zużywa dwie reszty cysteiny. Liczba reszt bez pary','Fraction of residues paired. Each bridge uses two cysteine residues. Unpaired residues')+' · '+v%2;
        break;
      case 'membrane':
        result = num((v+5)/2)+' mmol/L';
        fraction = (v+5)/20;
        caption = t('Końcowe stężenie po obu stronach (skala 0–10). Objętości są równe i stałe, prawa strona zaczyna od 5 mmol/l, błona przepuszcza substancję obojętną. Początkowy przepływ netto','Final concentration on each side (scale 0–10). Volumes are equal and fixed, the right side starts at 5 mmol/L, and the neutral solute crosses freely. Initial net flow')+' · '+(v===5?t('brak','none'):v>5?'L → R':'R → L');
        break;
      case 'dna':
        fraction = 1-0.5**v;
        result = num(100*fraction)+'%';
        caption = t('Szansa, że przynajmniej jedno dziecko odziedziczy A. Dla każdego dziecka prawdopodobieństwo wynosi ½. Dla całej grupy odejmij od 1 szansę, że wszystkie odziedziczą aa.','Chance that at least one child inherits A. Each child has a ½ chance independently. For the group, subtract the probability that every child inherits aa from 1.');
        break;
      case 'evidence': {
        const truePos = 90*v, falsePos = 10*(100-v);
        fraction = truePos/(truePos+falsePos);
        result = num(fraction*100)+'%';
        caption = t('Odsetek prawdziwie dodatnich wśród dodatnich wyników. W modelu 10 000 osób czułość i swoistość wynoszą po 90%. Wyniki prawdziwie dodatnie / fałszywie dodatnie','Share of positive results that are true positives. In this hypothetical group of 10,000, sensitivity and specificity are both 90%. True positives / false positives')+' · '+truePos+' / '+falsePos;
        break;
      }
    }
    document.getElementById('observation').innerHTML = '<strong>'+result+'</strong><div class="meter" aria-hidden="true"><i style="width:'+100*fraction+'%"></i></div><p>'+caption+'</p>';
  }
  slider.oninput = draw;
  draw();
}
