const workedLessons = {
  atom: [
    ['Co odróżnia węgiel-14 od węgla-12?', 'What distinguishes carbon-14 from carbon-12?'],
    ['Oba jądra mają 6 protonów. Liczba masowa liczy protony i neutrony razem. Węgiel-14 ma więc 14 − 6 = 8 neutronów, a węgiel-12 ma 12 − 6 = 6.','Both nuclei have 6 protons. The mass number counts protons and neutrons together. Carbon-14 therefore has 14 − 6 = 8 neutrons, while carbon-12 has 12 − 6 = 6.'],
    ['W modelu dodaj jeden neutron. Zmieni się izotop. Liczba protonów, a więc i nazwa pierwiastka, pozostanie taka sama.','Add one neutron in the model. The isotope changes. The proton count stays the same, so the element is still carbon.']
  ],
  water: [
    ['Co zmienia dolanie wody do roztworu?', 'What changes when you add water to a solution?'],
    ['Masz 0,01 mola substancji w 100 ml roztworu. Stężenie to liczba moli podzielona przez objętość w litrach. Otrzymujesz 0,01 / 0,10 = 0,10 mol/l.','You have 0.01 mol of solute in 100 mL of solution. Concentration is the amount in moles divided by volume in litres. That gives 0.01 / 0.10 = 0.10 mol/L.'],
    ['Dolej wody do objętości 200 ml. Ta sama ilość substancji zajmuje dwa razy większą objętość, więc stężenie spada do 0,05 mol/l.','Add water to reach 200 mL. The same amount of solute now occupies twice the volume, so its concentration falls to 0.05 mol/L.']
  ],
  ph: [
    ['Jak duża jest różnica między pH 6 a pH 7?', 'How big is the difference between pH 6 and pH 7?'],
    ['W rozcieńczonym roztworze przy pH 7 stężenie jonów H⁺ wynosi w przybliżeniu 10⁻⁷ mol/l. Przy pH 6 wynosi około 10⁻⁶ mol/l. Iloraz tych wartości wynosi 10.','In a dilute solution at pH 7, the hydrogen-ion concentration is approximately 10⁻⁷ mol/L. At pH 6 it is about 10⁻⁶ mol/L. The ratio of those values is 10.'],
    ['Przesuń suwak z 7 do 5. Dwa kroki oznaczają kolejno ×10 i ×10, czyli około 100 razy większe stężenie H⁺.','Move the slider from 7 to 5. Two steps multiply the concentration by 10 twice, giving about 100 times as much H⁺ per litre.']
  ],
  albumin: [
    ['Dlaczego 35 cystein daje najwyżej 17 mostków?', 'Why can 35 cysteines form at most 17 bridges?'],
    ['Reszta aminokwasowa to część aminokwasu wbudowana w łańcuch białka. Każda cysteina ma atom siarki w łańcuchu bocznym. Jeden mostek S–S łączy siarki dwóch reszt. Stąd 35 = 2 × 17 + 1.','A residue is the part of an amino acid incorporated into a protein chain. Cysteine has a sulfur atom in its side chain. One S–S bridge joins the sulfur atoms of two residues. Hence 35 = 2 × 17 + 1.'],
    ['Porównaj 34 i 35 w modelu. W obu przypadkach maksimum wynosi 17. Mostki pomagają utrzymać kształt białka. W zagłębieniach albuminy mogą się wiązać hydrofobowe fragmenty kwasów tłuszczowych, co ułatwia ich transport w osoczu.','Compare 34 and 35 in the model. Both give a maximum of 17. Bridges help maintain the protein’s shape. Pockets in albumin can bind the hydrophobic parts of fatty acids, helping carry them through plasma.']
  ],
  membrane: [
    ['Co oznacza dyfuzja netto?', 'What does net diffusion mean?'],
    ['Dwie komory o tej samej stałej objętości zawierają 9 i 5 mmol/l substancji obojętnej. Cząsteczki poruszają się w obie strony. Początkowo więcej przechodzi z lewej na prawą, bo po lewej jest ich więcej na jednostkę objętości.','Two compartments of equal fixed volume contain a neutral solute at 9 and 5 mmol/L. Molecules move both ways. Initially more cross from left to right because more molecules occupy each unit of volume on the left.'],
    ['Ustaw 9. Po wyrównaniu stężeń po obu stronach będzie (9 + 5) / 2 = 7 mmol/l. Cząsteczki nadal przechodzą przez błonę, ale przeciętne przepływy w obu kierunkach się równoważą.','Set the slider to 9. At equilibrium both sides reach (9 + 5) / 2 = 7 mmol/L. Molecules keep crossing the membrane, but the average flows in the two directions balance.']
  ],
  dna: [
    ['Jak policzyć szansę dla dwojga dzieci?', 'How do you calculate a chance across two children?'],
    ['W krzyżówce Aa × aa pierwszy rodzic przekazuje A lub a z równą szansą. Drugi zawsze przekazuje a. Każde dziecko ma więc szansę ½ na Aa i ½ na aa.','In an Aa × aa cross, the first parent is equally likely to pass on A or a. The second always passes on a. Each child therefore has a ½ chance of Aa and a ½ chance of aa.'],
    ['Dla dwóch niezależnych zdarzeń szansa na dwoje dzieci aa wynosi ½ × ½ = ¼. We wszystkich pozostałych przypadkach przynajmniej jedno ma Aa. Ich łączna szansa to 1 − ¼ = ¾.','For two independent births the chance of two aa children is ½ × ½ = ¼. Every other outcome includes at least one Aa child. Together those outcomes have probability 1 − ¼ = ¾.']
  ],
  evidence: [
    ['Ile dodatnich wyników jest prawdziwych?', 'How many positive results are true positives?'],
    ['W modelowej grupie 10 000 osób choruje 1%, czyli 100 osób. Przy czułości 90% wynik dodatni otrzyma 90 z nich. Spośród 9900 zdrowych, przy swoistości 90%, fałszywy wynik dodatni otrzyma 990.','In a model group of 10,000, a prevalence of 1% means 100 people have the condition. At 90% sensitivity, 90 of them test positive. Of the 9,900 without the condition, 990 test positive at 90% specificity.'],
    ['Ustaw 1%. Wśród 1080 wyników dodatnich tylko 90 jest prawdziwie dodatnich, czyli około 8,3%. Zwiększ częstość choroby i obserwuj, jak zmienia się skład grupy z dodatnim wynikiem.','Set prevalence to 1%. Of 1,080 positive results, only 90 are true positives, about 8.3%. Increase prevalence and observe how the make-up of the positive group changes.']
  ]
};
