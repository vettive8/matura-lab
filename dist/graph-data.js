const graphChapters = {
  c2: {"pre":[],"qs":["c1.1","c1.2","c5"],"intro":["Zacznij od jądra i elektronów. Liczba protonów identyfikuje pierwiastek; konfiguracja elektronowa pomaga przewidzieć jego zachowanie.","Start with nuclei and electrons. Proton count identifies the element; electron configuration helps predict its behaviour."]},
  c1: {"pre":["c2"],"qs":["c4","c11.1","c20"],"intro":["Indeksy we wzorze liczą atomy. Współczynniki równania określają proporcje molowe w reakcji.","Subscripts count atoms. Equation coefficients give the mole ratios in a reaction."]},
  c3: {"pre":["c2"],"qs":["c3","c6"],"intro":["Prześledź elektrony walencyjne. Sposób ich rozmieszczenia wpływa na kształt cząsteczki i jej oddziaływania z wodą.","Trace valence electrons. Their distribution affects molecular shape and interactions with water."]},
  c5: {"pre":["c1","c3"],"qs":["c11.2"],"intro":["Rozdziel ilość substancji od objętości. Dodanie wody zmienia stężenie, choć liczba moli substancji pozostaje taka sama.","Separate amount of solute from volume. Adding water changes concentration while solute amount stays constant."]},
  c4: {"pre":["c1","c3"],"qs":["c7"],"intro":["Szybkość opisuje zmianę w czasie. Równowaga oznacza zrównanie szybkości reakcji w obu kierunkach.","Rate describes change over time. At equilibrium the forward and reverse rates are equal."]},
  c6: {"pre":["c4","c5"],"qs":["c2","c10","c12","c13"],"intro":["Prześledź jony pozostające w roztworze i te, które tworzą osad, kwas lub zasadę.","Track the ions remaining in solution and those forming a precipitate, acid or base."]},
  c7: {"pre":["c3","c6"],"qs":["c2","c4"],"intro":["Odczytaj skład i ładunek, aby rozpoznać tlenek, sól, kwas lub wodorotlenek.","Read composition and charge to recognise an oxide, salt, acid or hydroxide."]},
  c8: {"pre":["c2","c1"],"qs":["c8","c19.2"],"intro":["Bilans elektronów łączy utlenianie jednego składnika z redukcją drugiego.","Electron balance connects oxidation of one species to reduction of another."]},
  c9: {"pre":["c5","c8"],"qs":["c9.1","c9.2"],"intro":["Rozdzielenie dwóch półreakcji pozwala elektronom płynąć obwodem zewnętrznym.","Separating two half-reactions lets electrons flow through an external circuit."]},
  c10: {"pre":["c7","c8"],"qs":["c1.1","c8"],"intro":["Położenie w układzie okresowym i stopień utlenienia pomagają przewidzieć produkty reakcji.","Periodic position and oxidation state help predict reaction products."]},
  c11: {"pre":["c7","c10"],"qs":["c6"],"intro":["Przejdź od właściwości związku do zastosowania. Struktura może wyjaśniać twardość, przewodnictwo lub rozpuszczalność.","Work from compound properties to uses. Structure can explain hardness, conductivity or solubility."]},
  c12: {"pre":["c3","c1"],"qs":["c15.1","c18.2","c23.1"],"intro":["Rysuj szkielet węglowy i zaznaczaj grupy funkcyjne. Ten sam wzór sumaryczny może opisywać różne struktury.","Draw the carbon skeleton and mark functional groups. One molecular formula can represent several structures."]},
  c13: {"pre":["c12"],"qs":["c14","c15.2","c19.1","c24"],"intro":["Porównaj łańcuch, pierścień i wiązanie podwójne. Ustal, gdzie może zmienić się połączenie atomów.","Compare a chain, a ring and a double bond. Locate where connectivity may change."]},
  c14: {"pre":["c12"],"qs":["c21","c22","c27"],"intro":["Położenie grupy hydroksylowej względem pierścienia wpływa na zachowanie związku.","The location of a hydroxyl group relative to a ring affects chemical behaviour."]},
  c15: {"pre":["c12","c8"],"qs":["c16.1","c16.2","c17"],"intro":["Zlokalizuj grupę karbonylową i sprawdź, z czym połączony jest jej atom węgla.","Locate the carbonyl group and identify what its carbon atom is bonded to."]},
  c16: {"pre":["c6","c12"],"qs":["c18.1","c20","c21","c23.2"],"intro":["Grupa karboksylowa może oddać proton. Śledź osobno zmiany ładunku i szkieletu węglowego.","A carboxyl group can donate a proton. Track charge and skeleton changes separately."]},
  c17: {"pre":["c14","c16"],"qs":["c7","c25.2"],"intro":["W estrze rozpoznaj fragment pochodzący od kwasu i fragment pochodzący od alkoholu.","Identify the acid-derived and alcohol-derived parts of an ester."]},
  c18: {"pre":["c12","c6"],"qs":["c25.1","c25.3","c26"],"intro":["Rozpoznaj azot w grupie aminowej lub amidowej. Połączenie aminokwasów tworzy wiązania peptydowe.","Identify nitrogen in an amino or amide group. Joining amino acids creates peptide bonds."]},
  c19: {"pre":["c18","c3"],"qs":["b1.1","b1.2","b12.1","c26"],"intro":["Przejdź od sekwencji aminokwasów do kształtu białka i miejsc wiązania innych cząsteczek.","Move from amino acid sequence to protein shape and binding sites."]},
  c20: {"pre":["c14","c15"],"qs":["c28","c29"],"intro":["Porównaj łańcuchową i pierścieniową postać cukru, zachowując numerację atomów węgla.","Compare open-chain and ring forms of a sugar while preserving carbon numbering."]},
  c21: {"pre":["c7","c12"],"qs":["c12","c25.1"],"intro":["Zacznij od obserwowalnej cechy produktu i wskaż odpowiedzialny składnik lub reakcję.","Start with an observable product property and identify the constituent or reaction responsible."]},
  c22: {"pre":["c5","c8"],"qs":["b23.1"],"intro":["Łącz postać chemiczną substancji, jej stężenie i warunki środowiska z obserwowanym skutkiem.","Relate a substance’s chemical form, concentration and environment to the observed effect."]},
  b1: {"pre":["c3","c5"],"qs":["b1.1","b1.2","c26"],"intro":["Porównaj wodę, białka, lipidy i cukry pod względem budowy i funkcji biologicznej.","Compare water, proteins, lipids and sugars by structure and biological function."]},
  b2: {"pre":["b1"],"qs":["b2.1","b7.2","b16.2"],"intro":["Ustal, gdzie w komórce zachodzi proces i co daje oddzielenie go błoną.","Locate a process within the cell and explain what membrane separation achieves."]},
  b3: {"pre":["b2","c4"],"qs":["b2.2","b2.3","b6.4","b6.5"],"intro":["Śledź oddzielnie przepływ energii, atomów węgla i elektronów.","Track the flow of energy, carbon atoms and electrons separately."]},
  b4: {"pre":["b2"],"qs":["b17.1","b17.2","b17.3"],"intro":["Najpierw skopiuj materiał genetyczny, potem prześledź jego rozdział między komórki potomne.","First copy the genetic material, then trace its distribution into daughter cells."]},
  b5: {"pre":["b2"],"qs":["b20.2"],"intro":["Porządkuj organizmy według cech i pokrewieństwa. Na drzewie odszukaj wspólnego przodka.","Organise organisms by traits and relatedness. Locate common ancestors on a tree."]},
  b6: {"pre":["b2","b5"],"qs":["b3.1","b3.2","b3.3","b4.1","b4.2"],"intro":["Zacznij od budowy komórki prokariotycznej i porównaj osłony komórek różnych grup.","Start with prokaryotic cell structure and compare the envelopes of different groups."]},
  b7: {"pre":["b2","b5"],"qs":[],"intro":["Połącz strzępki i grzybnię ze sposobem odżywiania grzybów oraz ich rolą w obiegu materii.","Connect hyphae and mycelium with fungal nutrition and nutrient cycling."]},
  b8: {"pre":["b2","b5"],"qs":["b8.1","b8.2","b8.3"],"intro":["Porównaj organizmy eukariotyczne o różnych sposobach odżywiania i cyklach życiowych.","Compare eukaryotes with differing modes of nutrition and life cycles."]},
  b9: {"pre":["b2","b3"],"qs":["b5.1","b5.2","b6.1","b6.2","b6.3","b6.4","b6.5","b7.1","b7.2"],"intro":["Prześledź wodę od korzenia przez drewno do liścia oraz węgiel od CO₂ do związków organicznych.","Trace water from root through xylem to leaf, and carbon from CO₂ into organic compounds."]},
  b10: {"pre":["b5"],"qs":["b20.1","b21.2","b22.1","b22.2"],"intro":["Porównaj plany budowy i strategie życiowe zwierząt, uwzględniając ich środowisko.","Compare animal body plans and life strategies in their environments."]},
  b11: {"pre":["b2","b3"],"qs":["b9","b10","b11.1","b11.2","b12.2","b12.3","b12.4","b13.1","b13.2","b14.1","b14.2","b14.3","b14.4","b14.5"],"intro":["Zacznij od tkanki i narządu. Potem połącz układy przez wspólne zadanie, np. dostarczenie tlenu komórkom.","Start with tissue and organ. Connect systems through a shared function such as delivering oxygen to cells."]},
  b12: {"pre":["b2"],"qs":["b15.1","b15.2"],"intro":["Porównaj budowę cząstki wirusa z budową komórki i odróżnij materiał wirusa od odpowiedzi odpornościowej.","Compare a virus particle with a cell and distinguish viral material from the immune response."]},
  b13: {"pre":["b2"],"qs":["b16.1","b16.2"],"intro":["Prześledź zapis informacji od sekwencji genu przez RNA do produktu.","Trace information from gene sequence through RNA to product."]},
  b14: {"pre":["b4","b13"],"qs":["b18.1","b18.2","b19"],"intro":["Rozdziel przekazywanie allelu od ujawniania się cechy. Sprawdź model na krzyżówce lub rodowodzie.","Distinguish transmission of an allele from expression of a trait. Test the model against a cross or pedigree."]},
  b15: {"pre":["b13","b14"],"qs":["b14.1","b14.3","b15.2"],"intro":["Zidentyfikuj, jaką informację biologiczną mierzy dana metoda i jakie są granice interpretacji wyniku.","Identify what biological information a method measures and the limits of interpretation."]},
  b16: {"pre":["b5","b14"],"qs":["b20.1","b20.2"],"intro":["Sprawdź, czy podobną cechę odziedziczono po wspólnym przodku, czy powstała niezależnie.","Ask whether a shared trait was inherited from a common ancestor or evolved independently."]},
  b17: {"pre":["b3","b5"],"qs":["b21.1","b22.1","b23.1","b23.2","b23.3"],"intro":["Połącz osobnika, populację i środowisko. Interpretuj zależności, zmieniając jedną zmienną naraz.","Connect organism, population and environment. Interpret relationships by varying one factor at a time."]},
  b18: {"pre":["b16","b17"],"qs":[],"intro":["Rozróżnij różnorodność genów, gatunków i ekosystemów. Dopasuj działanie ochronne do poziomu zagrożenia.","Distinguish genetic, species and ecosystem diversity. Match a conservation action to the level at risk."]},
};
const graphPaths = {
  atom: {
    "title": [
      "Atomy i izotopy",
      "Atoms and isotopes"
    ],
    "chapters": [
      "c2",
      "c1",
      "c8",
      "c10"
    ],
    "qs": [
      "c5"
    ],
    "intro": [
      "Liczba protonów określa pierwiastek. Neutrony zmieniają masę jądra, a elektrony odpowiadają za ładunek atomu lub jonu.",
      "Proton count identifies an element. Neutrons change nuclear mass, while electrons determine the charge of an atom or ion."
    ],
    "stages": [
      [
        "Matura: odejmij liczbę atomową od masowej, aby policzyć neutrony.",
        "On the matura, subtract atomic number from mass number to count neutrons."
      ],
      [
        "Na biofizyce rozdziel energię promieniowania od ilości substancji w próbce.",
        "In biophysics, distinguish radiation energy from the amount of substance in a sample."
      ],
      [
        "Powiąż stężenie śladowego składnika próbki z czułością pomiaru laboratoryjnego.",
        "Connect the concentration of a trace component with the sensitivity of a laboratory measurement."
      ],
      [
        "W medycynie nuklearnej połącz wykrycie emisji znacznika z informacją o funkcji narządu.",
        "In nuclear medicine, connect detection of tracer emissions to information about organ function."
      ],
      [
        "Rozróżnij obraz rozmieszczenia znacznika i obraz budowy narządu.",
        "Distinguish an image of tracer distribution from one showing organ anatomy."
      ],
      [
        "Porównaj, na jakie pytanie przed zabiegiem odpowie badanie czynnościowe, a na jakie anatomiczne.",
        "Compare the preoperative questions answered by functional and anatomical imaging."
      ],
      [
        "Przedstaw zespołowi, co wynik badania mówi o funkcji narządu i jaka niepewność pozostaje.",
        "Present what a study shows about organ function and what remains uncertain."
      ],
      [
        "Pod nadzorem omów wskazanie zapisane w skierowaniu i znaczenie wyniku dla dalszej oceny.",
        "With your supervisor, discuss the referral question and how the result informs the assessment."
      ],
      [
        "Dobierz pytanie diagnostyczne do możliwości badania i wytłumacz pacjentowi cel skierowania.",
        "Match the diagnostic question to what the study can reveal and explain the referral to the patient."
      ],
      [
        "Medycyna nuklearna łączy fizykę detekcji z rozmieszczeniem znacznika w organizmie.",
        "Nuclear medicine connects detection physics with tracer distribution in the body."
      ]
    ]
  },
  water: {
    "title": [
      "Woda, mole i stężenie",
      "Water, moles and concentration"
    ],
    "chapters": [
      "c1",
      "c5",
      "c6",
      "b1"
    ],
    "qs": [
      "c11.1"
    ],
    "intro": [
      "Mol pozwala liczyć cząstki, a stężenie molowe mówi, ile moli przypada na jednostkę objętości roztworu.",
      "The mole counts particles. Molar concentration tells you how many moles occupy a unit volume of solution."
    ],
    "stages": [
      [
        "Przelicz objętość na dm³, zanim podzielisz liczbę moli przez objętość.",
        "Convert volume to dm³ before dividing the amount in moles by volume."
      ],
      [
        "Rozróżnij masę substancji, liczbę moli i objętość surowicy w oznaczeniu biochemicznym.",
        "Distinguish solute mass, amount in moles and serum volume in a biochemical measurement."
      ],
      [
        "Wyjaśnij, co dzieje się z komórką w roztworach o różnej toniczności.",
        "Explain what happens to a cell in solutions of differing tonicity."
      ],
      [
        "Czytając wynik laboratoryjny, porównaj jednostki i uwzględnij wpływ rozcieńczenia próbki.",
        "When reading a lab result, compare units and account for sample dilution."
      ],
      [
        "W nefrologii połącz gospodarkę wodną ze zmianą stężenia substancji w osoczu.",
        "In nephrology, connect water balance to changing plasma solute concentrations."
      ],
      [
        "Interpretując bilans płynów, rozdziel zmianę ilości substancji od zmiany ilości wody.",
        "When interpreting fluid balance, distinguish a change in solute amount from a change in water."
      ],
      [
        "Zestaw kolejne wyniki z bilansem płynów i czasem pobrania próbek.",
        "Compare serial results with fluid balance and the timing of sample collection."
      ],
      [
        "Omów z opiekunem możliwe wyjaśnienia nagłej zmiany stężenia między dwoma pobraniami.",
        "Discuss possible explanations for an abrupt concentration change between samples with your supervisor."
      ],
      [
        "Oceń trend razem ze stanem pacjenta i wiarygodnością próbki.",
        "Interpret the trend alongside the patient’s condition and sample reliability."
      ],
      [
        "Nefrologia wiąże objętość płynów, osmolalność i wydalanie substancji przez nerki.",
        "Nephrology relates fluid volume, osmolality and renal solute excretion."
      ]
    ]
  },
  ph: {
    "title": [
      "Kwasy, zasady i pH",
      "Acids, bases and pH"
    ],
    "chapters": [
      "c4",
      "c5",
      "c6",
      "c16"
    ],
    "qs": [
      "c13"
    ],
    "intro": [
      "pH opisuje aktywność jonów wodorowych na skali logarytmicznej. W rozcieńczonym roztworze można ją przybliżyć stężeniem.",
      "pH describes hydrogen-ion activity on a logarithmic scale. Concentration is a useful approximation in dilute solutions."
    ],
    "stages": [
      [
        "Z równowagi reakcji wyznacz stężenie OH⁻, potem pOH i pH.",
        "Use equilibrium to find hydroxide concentration, then pOH and pH."
      ],
      [
        "Porównaj wodę z buforem i wyjaśnij, dlaczego jednakowy dodatek kwasu inaczej zmienia pH.",
        "Compare water with a buffer and explain why adding the same amount of acid changes their pH differently."
      ],
      [
        "Powiąż transport CO₂ z układem wodorowęglanowym krwi.",
        "Connect carbon dioxide transport with the blood bicarbonate system."
      ],
      [
        "Odróżnij udział płuc i nerek w zaburzeniu równowagi kwasowo-zasadowej.",
        "Distinguish the roles of lungs and kidneys in acid–base disturbance."
      ],
      [
        "Omawiając chorobę płuc, powiąż wentylację ze zmianami ciśnienia CO₂.",
        "Relate ventilation to carbon dioxide pressure when discussing lung disease."
      ],
      [
        "W opisie przypadku zestaw pH, CO₂ i wodorowęglany z przebiegiem choroby.",
        "Compare pH, carbon dioxide and bicarbonate with the course of illness in a case."
      ],
      [
        "Przedstaw wynik gazometrii w kontekście objawów i poprzedniego pomiaru.",
        "Present a blood gas result in the context of symptoms and the previous measurement."
      ],
      [
        "Sprawdź z opiekunem jakość próbki i czy interpretacja zgadza się ze stanem chorego.",
        "Check sample quality with your supervisor and ask whether the interpretation fits the patient."
      ],
      [
        "Wyjaśnij, który mechanizm może łączyć nieprawidłowe wyniki i co wymaga ponownej oceny.",
        "Explain which mechanism might connect the abnormal findings and what requires reassessment."
      ],
      [
        "Intensywna terapia łączy zmiany wentylacji, perfuzji i metabolizmu w czasie.",
        "Intensive care integrates changes in ventilation, perfusion and metabolism over time."
      ]
    ]
  },
  albumin: {
    "title": [
      "Cysteina, albumina i osocze",
      "Cysteine, albumin and plasma"
    ],
    "chapters": [
      "c3",
      "c18",
      "c19",
      "b1",
      "b11"
    ],
    "qs": [
      "b1.1",
      "b1.2"
    ],
    "intro": [
      "Aminokwasy tworzą łańcuch białka. Dwie reszty cysteiny mogą utworzyć mostek S–S stabilizujący zwinięty łańcuch.",
      "Amino acids form a protein chain. Two cysteine residues can form an S–S bridge that stabilises its fold."
    ],
    "stages": [
      [
        "Z 35 reszt cysteiny powstaje najwyżej 17 par. Powiąż przestrzenną budowę albuminy z transportem kwasów tłuszczowych.",
        "Thirty-five cysteine residues make at most 17 pairs. Relate albumin’s folded structure to fatty-acid transport."
      ],
      [
        "W laboratorium biochemicznym UZ oznaczasz stężenie albuminy w surowicy. Rozdziel mierzony wynik od jego możliwych przyczyn.",
        "In the UZ biochemistry lab you measure serum albumin concentration. Separate the measurement from its possible causes."
      ],
      [
        "Wyjaśnij, jak białka osocza wpływają na ciśnienie onkotyczne i ruch wody przez ścianę naczynia.",
        "Explain how plasma proteins influence oncotic pressure and water movement across the vessel wall."
      ],
      [
        "Zestaw obrzęk, małe stężenie albuminy i białkomocz. Utrata białka przez nerki może łączyć te obserwacje.",
        "Connect oedema, low albumin and proteinuria. Renal protein loss can link these observations."
      ],
      [
        "W nefrologii porównaj utratę białka w moczu z osłabioną syntezą w wątrobie jako możliwymi przyczynami hipoalbuminemii.",
        "In nephrology compare urinary protein loss with reduced liver synthesis as causes of hypoalbuminaemia."
      ],
      [
        "W farmakologii odróżnij całkowite stężenie leku od frakcji niezwiązanej z albuminą.",
        "In pharmacology distinguish total drug concentration from the fraction unbound to albumin."
      ],
      [
        "Przedstaw przypadek na internie, oddzielając obrzęk, wynik oznaczenia albuminy i hipotezę o utracie białka.",
        "Present an internal medicine case, separating oedema, the albumin measurement and the hypothesis of protein loss."
      ],
      [
        "Pod nadzorem zbierz wywiad o przebiegu obrzęków i omów wyniki krwi oraz moczu z opiekunem.",
        "Under supervision, take a history of the swelling and discuss the blood and urine findings."
      ],
      [
        "Ustal, jakie dane przemawiają za utratą, zaburzoną syntezą lub inną przyczyną. Wyjaśnij pacjentowi dalszy plan oceny.",
        "Weigh evidence for loss, impaired synthesis or another cause. Explain the assessment plan to the patient."
      ],
      [
        "Nefrolog interpretuje białkomocz i funkcję nerek. Hepatolog rozważa zdolność wątroby do syntezy białek.",
        "A nephrologist interprets proteinuria and kidney function. A hepatologist considers the liver’s capacity for protein synthesis."
      ]
    ]
  },
  membrane: {
    "title": [
      "Błona, dyfuzja i sygnał nerwowy",
      "Membranes, diffusion and nerve signals"
    ],
    "chapters": [
      "b2",
      "b11",
      "c5",
      "c9"
    ],
    "qs": [
      "b11.1",
      "b11.2"
    ],
    "intro": [
      "Błona oddziela dwa roztwory. Kierunek dyfuzji obojętnej cząsteczki zależy od gradientu stężenia i przepuszczalności błony.",
      "A membrane separates two solutions. The net diffusion of a neutral molecule depends on its concentration gradient and membrane permeability."
    ],
    "stages": [
      [
        "Na wykresie porównaj momenty otwierania kanałów Na⁺ i K⁺. Dla jonów liczą się zarówno stężenie, jak i napięcie elektryczne.",
        "Compare when sodium and potassium channels open. For ions, both concentration and electrical potential matter."
      ],
      [
        "Połącz dwuwarstwę lipidową z selektywną przepuszczalnością błony komórkowej.",
        "Link the lipid bilayer to selective cell membrane permeability."
      ],
      [
        "Prześledź narastanie i wygaszanie potencjału czynnościowego neuronu.",
        "Trace the rise and fall of a neuronal action potential."
      ],
      [
        "Wyjaśnij, dlaczego wpływ na kanał jonowy może zmieniać przewodzenie sygnału.",
        "Explain how altering an ion channel can change signal conduction."
      ],
      [
        "W kardiologii odróżnij napięcie jednej błony od zapisu sumarycznej aktywności serca w EKG.",
        "In cardiology distinguish a single membrane voltage from the heart’s aggregate electrical activity on ECG."
      ],
      [
        "W neurologii powiąż przerwanie przewodzenia z lokalizacją zaburzenia funkcji.",
        "In neurology relate impaired conduction to the localisation of a functional deficit."
      ],
      [
        "Połącz opis czucia i ruchu z rozmieszczeniem nieprawidłowości w badaniu.",
        "Connect reported sensory and motor changes with the distribution of findings on examination."
      ],
      [
        "Pod nadzorem zapisz, po której stronie i w jakim obszarze występują objawy.",
        "Under supervision, document the side and distribution of symptoms."
      ],
      [
        "Oddziel opis objawu od hipotezy o miejscu uszkodzenia i dobierz ocenę do obrazu klinicznego.",
        "Separate a symptom description from a localisation hypothesis and tailor assessment to the findings."
      ],
      [
        "Neurolog łączy anatomię drogi nerwowej z badaniem funkcji. Kardiolog stosuje elektrofizjologię do oceny rytmu.",
        "Neurologists connect neural anatomy with functional examination. Cardiologists apply electrophysiology to rhythm assessment."
      ]
    ]
  },
  dna: {
    "title": [
      "DNA, allele i dziedziczenie",
      "DNA, alleles and inheritance"
    ],
    "chapters": [
      "b2",
      "b4",
      "b13",
      "b14",
      "c3"
    ],
    "qs": [
      "b18.1",
      "b18.2",
      "b19"
    ],
    "intro": [
      "Gen to odcinek DNA. Różne wersje sekwencji w tym samym miejscu to allele; ich dziedziczenie można śledzić w rodzinie.",
      "A gene is a region of DNA. Sequence variants at the same locus are alleles; their inheritance can be traced in families."
    ],
    "stages": [
      [
        "Z rodowodu wyklucz model dziedziczenia, używając konkretnej relacji rodzic–dziecko.",
        "Use a specific parent–child relationship to rule out an inheritance model."
      ],
      [
        "Prześledź drogę od sekwencji DNA przez RNA do produktu genu.",
        "Trace the path from DNA sequence through RNA to a gene product."
      ],
      [
        "W genetyce porównaj prawdopodobieństwo odziedziczenia wariantu z prawdopodobieństwem wystąpienia objawów.",
        "In genetics distinguish the chance of inheriting a variant from the chance of developing symptoms."
      ],
      [
        "W pediatrii uzupełnij rodowód o wiek pojawienia się objawów u członków rodziny.",
        "In paediatrics add age of symptom onset to the family pedigree."
      ],
      [
        "Rozważ, jak wywiad rodzinny zmienia pytania zadawane w poradnictwie przed ciążą.",
        "Consider how family history changes the questions asked in preconception counselling."
      ],
      [
        "Porównaj dwa możliwe wyjaśnienia rodzinnego skupienia choroby: wspólne allele i wspólne środowisko.",
        "Compare shared alleles and shared environment as explanations for clustering of disease in a family."
      ],
      [
        "Przedstaw historię rodziny, zaznaczając dane potwierdzone i informacje z relacji pacjenta.",
        "Present a family history separating confirmed findings from patient-reported information."
      ],
      [
        "Z opiekunem przećwicz pytania o krewnych oraz sposób zapisu niepewnych danych.",
        "With your supervisor practise questions about relatives and documenting uncertainty."
      ],
      [
        "Wyjaśnij pacjentowi, co można wywnioskować z rodowodu i jakie pytania wymagają konsultacji genetycznej.",
        "Explain what the pedigree can establish and which questions merit genetics consultation."
      ],
      [
        "Genetyka kliniczna łączy cechy pacjenta, rodowód i znaczenie wykrytego wariantu.",
        "Clinical genetics integrates the patient’s features, pedigree and interpretation of a detected variant."
      ]
    ]
  },
  evidence: {
    "title": [
      "Pomiar, próba kontrolna i wynik badania",
      "Measurement, controls and test results"
    ],
    "chapters": [
      "b3",
      "b17",
      "c1",
      "c4"
    ],
    "qs": [
      "b13.1",
      "b13.2",
      "b15.1"
    ],
    "intro": [
      "Pomiar opisuje obserwację. Próba kontrolna pokazuje, czego można oczekiwać bez badanego czynnika.",
      "A measurement describes an observation. A control shows what to expect in the absence of the factor being studied."
    ],
    "stages": [
      [
        "Porównaj obie krzywe pomiaru tlenu i oddziel to, co widać, od wniosku o przyczynie.",
        "Compare both oxygen curves and distinguish what was observed from a causal interpretation."
      ],
      [
        "W biostatystyce ustal zmienną, jednostkę i sposób doboru próby.",
        "In biostatistics identify the variable, measurement unit and sampling method."
      ],
      [
        "W diagnostyce laboratoryjnej odróżnij obecność przeciwciał od aktualnego zakażenia.",
        "In laboratory diagnostics distinguish antibody presence from current infection."
      ],
      [
        "Oceniając badanie kliniczne, sprawdź grupę porównawczą i to, czy wynik odpowiada na zadane pytanie.",
        "When appraising a clinical study, inspect the comparison group and whether the outcome addresses the question."
      ],
      [
        "W zespole medycznym przekaż osobno wynik, własną interpretację i źródło niepewności.",
        "In a medical team communicate the result, interpretation and source of uncertainty separately."
      ],
      [
        "W medycynie rodzinnej uwzględnij częstość choroby w populacji badanej przesiewowo.",
        "In family medicine consider disease prevalence in the screened population."
      ],
      [
        "W prezentacji przypadku powiedz, które nowe dane zmieniłyby Twoją ocenę.",
        "In a case presentation identify what new evidence would change your assessment."
      ],
      [
        "Omów z opiekunem, czy dodatni wynik wymaga potwierdzenia i jak to wyjaśnić pacjentowi.",
        "Discuss with your supervisor whether a positive test needs confirmation and how to explain this."
      ],
      [
        "Łącz wywiad, badanie i wyniki, zamiast przypisywać rozpoznanie jednemu pomiarowi.",
        "Integrate history, examination and investigations when making a diagnosis."
      ],
      [
        "Diagnostyka laboratoryjna analizuje jakość oznaczenia; epidemiologia ocenia działanie testu w populacji.",
        "Laboratory medicine examines assay performance; epidemiology evaluates test performance in a population."
      ]
    ]
  },
};
