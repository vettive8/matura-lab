const questions = [
 {
  "s": "biologia",
  "id": "1.1",
  "page": 3,
  "key": 3,
  "title": [
   "Wykaż, ile mostków mogą utworzyć reszty cysteiny.",
   "Show how many bridges the cysteine residues can form."
  ],
  "points": 1,
  "modelAnswer": [
   "Każdy mostek łączy dwie reszty cysteiny. Z 35 reszt można utworzyć 17 pełnych par. Jedna reszta zostaje wolna, więc osiemnasty mostek nie może powstać.",
   "Each bridge uses two cysteine residues. With 35 residues there are 17 complete pairs and one residue left over, so an eighteenth bridge cannot form."
  ],
  "criterion": [
   "Połącz liczbę 35 z liczbą pełnych par i wyjaśnij, dlaczego jedna reszta nie wystarcza.",
   "Connect 35 residues to the number of complete pairs and explain why one remaining residue cannot make a bridge."
  ],
  "prompt": [
   "Dlaczego 35 reszt cysteiny pozwala utworzyć najwyżej 17 mostków?",
   "Why can 35 cysteine residues form at most 17 bridges?"
  ],
  "explanation": [
   "Cysteina jest aminokwasem zawierającym siarkę. Mostek S–S łączy atomy siarki dwóch cystein. Po połączeniu 34 reszt w pary ostatnia nie ma partnera.",
   "Cysteine contains sulfur. An S–S bridge joins sulfur atoms from two cysteines. After pairing 34 residues, the last one has no partner."
  ],
  "learn": [
   "Reszta aminokwasowa, wiązanie S–S, liczenie par.",
   "Amino acid residues, S–S bonds and counting pairs."
  ]
 },
 {
  "s": "biologia",
  "id": "1.2",
  "page": 3,
  "key": 3,
  "title": [
   "Wyjaśnij, jak albumina umożliwia transport kwasów tłuszczowych.",
   "Explain how albumin carries fatty acids in blood."
  ],
  "points": 1,
  "modelAnswer": [
   "Długołańcuchowe kwasy tłuszczowe słabo rozpuszczają się w wodnym osoczu. Albumina dobrze się w nim rozpuszcza. Gdy zwiąże kwas tłuszczowy, przenosi go wraz z krwią.",
   "Long-chain fatty acids dissolve poorly in aqueous plasma. Albumin dissolves readily in plasma. When a fatty acid binds to albumin, the soluble protein carries it through the blood."
  ],
  "criterion": [
   "Podaj rozpuszczalność obu substancji w osoczu i powiąż związanie kwasu z jego transportem.",
   "State how well each substance dissolves in plasma and connect binding to transport."
  ],
  "prompt": [
   "Dlaczego związanie z albuminą umożliwia transport długołańcuchowych kwasów tłuszczowych we krwi?",
   "Why does binding to albumin allow long-chain fatty acids to travel in blood?"
  ],
  "explanation": [
   "Osocze to płynna część krwi. Jego głównym składnikiem jest woda. Długi ogon kwasu słabo oddziałuje z wodą, ale mieści się w miejscu wiążącym albuminy. Zewnętrzna powierzchnia białka nadal oddziałuje z wodą, więc cały kompleks może płynąć z osoczem.",
   "Plasma is the liquid part of blood and consists mainly of water. The acid’s long tail interacts poorly with water but fits into albumin’s binding pocket. The protein surface still interacts with water, so the whole complex travels in plasma."
  ],
  "learn": [
   "Osocze, rozpuszczalność, hydrofobowość, białko transportowe.",
   "Plasma, solubility, hydrophobicity and carrier proteins."
  ]
 },
 {
  "s": "biologia",
  "id": "2.1",
  "page": 4,
  "key": 4,
  "title": [
   "Wskaż położenie fotosystemu II w chloroplaście.",
   "Locate photosystem II in the chloroplast."
  ],
  "points": 1,
  "modelAnswer": [
   "B. Fotosystem II znajduje się w błonie tylakoidu.",
   "B. Photosystem II is in the thylakoid membrane."
  ],
  "prompt": [
   "Gdzie w chloroplaście znajduje się fotosystem II?",
   "Where in a chloroplast is photosystem II located?"
  ],
  "explanation": [
   "Tylakoidy to spłaszczone woreczki. Ich błona utrzymuje barwniki i białka fotosystemu w położeniu umożliwiającym przekazywanie elektronów.",
   "Thylakoids are flattened sacs. Their membranes hold the pigments and proteins in position for electron transfer."
  ],
  "learn": [
   "Błona tylakoidu, jego wnętrze i stroma.",
   "Thylakoid membrane, lumen and stroma."
  ]
 },
 {
  "s": "biologia",
  "id": "2.2",
  "page": 5,
  "key": 5,
  "title": [
   "Powiąż rozszczepienie wody z uzupełnianiem elektronów.",
   "Connect water splitting to electron replacement."
  ],
  "points": 1,
  "modelAnswer": [
   "Po pochłonięciu światła chlorofil centrum reakcji oddaje elektron. Enzym rozszczepia wodę, a pochodzące z niej elektrony uzupełniają ten ubytek. Dzięki temu centrum może ponownie przekazać elektron.",
   "Light excites the reaction-centre chlorophyll, which donates an electron. The enzyme splits water, supplying replacement electrons and allowing the centre to donate an electron again."
  ],
  "prompt": [
   "Dlaczego centrum reakcji PS II potrzebuje enzymu rozszczepiającego wodę?",
   "Why does the PS II reaction centre need the water-splitting enzyme?"
  ],
  "explanation": [
   "Światło wzbudza elektron chlorofilu. Po przekazaniu elektronu na akceptor pozostaje niedobór. Elektron z wody uzupełnia go i umożliwia powtórzenie cyklu.",
   "Light excites an electron in chlorophyll. Transfer to an acceptor leaves a vacancy. An electron from water replaces it so the cycle can repeat."
  ],
  "learn": [
   "Donor, akceptor i fotoliza wody.",
   "Donors, acceptors and water splitting."
  ]
 },
 {
  "s": "biologia",
  "id": "2.3",
  "page": 5,
  "key": 6,
  "title": [
   "Prześledź los elektronów i protonów na schemacie.",
   "Trace electrons and protons in the diagram."
  ],
  "points": 1,
  "modelAnswer": [
   "B i C. NADP⁺ przyjmuje elektrony. Powstający NADPH dostarcza siły redukcyjnej w fazie redukcji cyklu Calvina.",
   "B and C. NADP⁺ accepts electrons. The resulting NADPH supplies reducing power in the reduction stage of the Calvin cycle."
  ],
  "prompt": [
   "Co przyjmuje elektrony z PS I i gdzie cykl Calvina wykorzystuje produkt?",
   "What accepts electrons from PS I, and where does the Calvin cycle use the product?"
  ],
  "explanation": [
   "NADP⁺ ulega redukcji do NADPH. W tej postaci przenosi elektrony z fazy świetlnej do redukcji związków węgla.",
   "NADP⁺ is reduced to NADPH. It carries electrons from the light reactions to the reduction of carbon compounds."
  ],
  "learn": [
   "ATP jako nośnik energii, NADPH jako donor elektronów.",
   "ATP as an energy carrier and NADPH as an electron donor."
  ]
 },
 {
  "s": "biologia",
  "id": "3.1",
  "page": 7,
  "key": 6,
  "title": [
   "Wyjaśnij wzrost kolonii na pożywce minimalnej.",
   "Explain colony growth on minimal medium."
  ],
  "points": 1,
  "modelAnswer": [
   "Wymiana genów przywróciła części bakterii zdolność syntezy wszystkich potrzebnych aminokwasów i witamin. Tylko takie komórki mogły namnażać się na pożywce minimalnej.",
   "Gene transfer restored the ability of some bacteria to synthesise all the amino acids and vitamins they needed. Only those cells could multiply on minimal medium."
  ],
  "prompt": [
   "Dlaczego tylko niektóre bakterie z doświadczenia utworzyły kolonie na pożywce minimalnej?",
   "Why did only some bacteria in the experiment form colonies on minimal medium?"
  ],
  "explanation": [
   "Wyjściowe szczepy miały braki w syntezie związków potrzebnych do wzrostu. Wymiana genów uzupełniła te zdolności u części komórek, dzięki czemu mogły się dzielić.",
   "The original strains lacked some biosynthetic abilities. Gene exchange restored these abilities in some cells, allowing them to divide."
  ],
  "learn": [
   "Gen a cecha metaboliczna; znaczenie pożywki minimalnej.",
   "Genes, metabolic traits and minimal medium."
  ]
 },
 {
  "s": "biologia",
  "id": "3.2",
  "page": 7,
  "key": 7,
  "title": [
   "Zinterpretuj rolę filtra w doświadczeniu Davisa.",
   "Interpret the filter in Davis’s experiment."
  ],
  "points": 1,
  "modelAnswer": [
   "Filtr oddzielał komórki obu szczepów. Koniugacja wymaga bezpośredniego kontaktu bakterii, więc DNA nie zostało przekazane tą drogą.",
   "The filter kept cells of the two strains apart. Conjugation requires direct cell contact, so DNA could not pass by this route."
  ],
  "prompt": [
   "Dlaczego filtr w doświadczeniu Davisa uniemożliwił koniugację?",
   "Why did the filter in Davis’s experiment prevent conjugation?"
  ],
  "explanation": [
   "Płyn przechodził przez filtr, a komórki pozostały po przeciwnych stronach. Bez kontaktu komórek nie mogło dojść do bezpośredniego przekazania DNA.",
   "Fluid crossed the filter while cells remained on opposite sides. Direct DNA transfer requires cell contact."
  ],
  "learn": [
   "Koniugacja i rola bariery w doświadczeniu.",
   "Conjugation and the purpose of an experimental barrier."
  ]
 },
 {
  "s": "biologia",
  "id": "3.3",
  "page": 7,
  "key": 8,
  "title": [
   "Rozpoznaj mechanizm przekazywania informacji genetycznej.",
   "Recognise the mechanism of genetic transfer."
  ],
  "points": 1,
  "modelAnswer": [
   "A2. Transdukcja to przenoszenie materiału genetycznego bakterii za pośrednictwem bakteriofaga.",
   "A2. Transduction is the transfer of bacterial genetic material by a bacteriophage."
  ],
  "prompt": [
   "Która odpowiedź w arkuszu dotyczy transdukcji?",
   "Which option on the paper identifies transduction?"
  ],
  "explanation": [
   "Podczas transdukcji DNA bakterii jest przenoszone przez bakteriofaga. Odróżnia to ten mechanizm od kontaktu komórek podczas koniugacji i pobierania wolnego DNA podczas transformacji.",
   "A bacteriophage carries bacterial DNA in transduction. This distinguishes it from direct cell contact in conjugation and uptake of free DNA in transformation."
  ],
  "learn": [
   "Trzy mechanizmy poziomego transferu genów.",
   "The three mechanisms of horizontal gene transfer."
  ]
 },
 {
  "s": "biologia",
  "id": "4.1",
  "page": 8,
  "key": 9,
  "title": [
   "Powiąż budowę rybosomu z syntezą białek.",
   "Connect ribosome assembly to protein synthesis."
  ],
  "points": 1,
  "modelAnswer": [
   "Linezolid uniemożliwia złożenie czynnego rybosomu z dwóch podjednostek. Hamuje to translację, więc bakteria nie może prawidłowo syntetyzować białek.",
   "Linezolid prevents assembly of a functional ribosome from its two subunits. Translation is inhibited, impairing bacterial protein synthesis."
  ],
  "prompt": [
   "Dlaczego zablokowanie łączenia podjednostek rybosomu szkodzi bakterii?",
   "Why does preventing ribosome assembly harm a bacterium?"
  ],
  "explanation": [
   "Czynny rybosom odczytuje mRNA i łączy aminokwasy. Zahamowanie jego składania ogranicza syntezę białek, w tym enzymów potrzebnych komórce.",
   "An active ribosome reads mRNA and joins amino acids. Blocking its assembly impairs production of proteins, including essential enzymes."
  ],
  "learn": [
   "Podjednostki rybosomu, mRNA, translacja.",
   "Ribosomal subunits, mRNA and translation."
  ]
 },
 {
  "s": "biologia",
  "id": "4.2",
  "page": 8,
  "key": 9,
  "title": [
   "Porównaj osłony komórek bakterii Gram-dodatnich i Gram-ujemnych.",
   "Compare Gram-positive and Gram-negative cell envelopes."
  ],
  "points": 1,
  "modelAnswer": [
   "U bakterii Gram-dodatnich warstwa peptydoglikanu jest gruba. U Gram-ujemnych jest cienka i przykryta dodatkową błoną zewnętrzną.",
   "Gram-positive cells have thick peptidoglycan. Gram-negative cells have thin peptidoglycan beneath an additional outer membrane."
  ],
  "prompt": [
   "Czym różnią się osłony bakterii Gram-dodatnich i Gram-ujemnych?",
   "How do Gram-positive and Gram-negative envelopes differ?"
  ],
  "explanation": [
   "Porównaj tę samą warstwę obu komórek. Peptydoglikan usztywnia ścianę. U bakterii Gram-ujemnych ponad jego cienką warstwą leży jeszcze błona zewnętrzna.",
   "Compare the same layer in both cells. Peptidoglycan stiffens the wall. In Gram-negative cells an outer membrane lies outside its thin layer."
  ],
  "learn": [
   "Ściana, peptydoglikan i błona zewnętrzna.",
   "Cell wall, peptidoglycan and outer membrane."
  ]
 },
 {
  "s": "biologia",
  "id": "5.1",
  "page": 9,
  "key": 10,
  "title": [
   "Rozpoznaj cechy liścia zwiększające powierzchnię transpiracji.",
   "Identify leaf features that increase transpiring surface area."
  ],
  "points": 1,
  "modelAnswer": [
   "T, T. Zarówno żywe włoski, jak i uwypuklenia skórki zwiększają powierzchnię liścia dostępną do parowania.",
   "Yes, yes (T, T). Both living hairs and epidermal projections increase the leaf surface available for evaporation."
  ],
  "prompt": [
   "Czy włoski i uwypuklenia skórki zwiększają powierzchnię parowania liścia?",
   "Do hairs and epidermal projections increase evaporating leaf area?"
  ],
  "explanation": [
   "Powierzchnia pofałdowana ma więcej odsłoniętej tkanki niż płaska o tym samym obrysie. W tym zadaniu oceniamy wpływ obu cech właśnie na pole powierzchni.",
   "A textured surface exposes more tissue than a flat surface of the same outline. The question asks specifically about this surface-area effect."
  ],
  "learn": [
   "Rzeczywista powierzchnia liścia i transpiracja.",
   "Actual leaf surface area and transpiration."
  ]
 },
 {
  "s": "biologia",
  "id": "5.2",
  "page": 9,
  "key": 11,
  "title": [
   "Powiąż transpirację z przepływem wody przez roślinę.",
   "Relate transpiration to water movement through the plant."
  ],
  "points": 1,
  "modelAnswer": [
   "Przepływ przyspiesza. Parowanie obniża potencjał wody w liściu i zwiększa siłę ssącą, która ciągnie spójny słup wody przez drewno.",
   "Flow accelerates. Evaporation lowers leaf water potential and increases the pull on the cohesive column of water in the xylem."
  ],
  "prompt": [
   "Jak nasilone parowanie z liści wpływa na przepływ wody w drewnie?",
   "How does increased evaporation affect water flow through xylem?"
  ],
  "explanation": [
   "Ubytek wody obniża jej potencjał w liściu. W słupie wody powstaje napięcie. Kohezja sprawia, że woda przemieszczająca się w górę pociąga kolejne cząsteczki.",
   "Evaporation lowers leaf water potential. Tension develops in the water column. Cohesion lets upward-moving water pull more molecules behind it."
  ],
  "learn": [
   "Potencjał wody, kohezja, siła ssąca.",
   "Water potential, cohesion and transpiration pull."
  ]
 },
 {
  "s": "biologia",
  "id": "6.1",
  "page": 10,
  "key": 12,
  "title": [
   "Wyjaśnij wynik kiełkowania w grupie pierwszej.",
   "Explain the germination result in group one."
  ],
  "points": 1,
  "modelAnswer": [
   "Suche podłoże nie dostarczało nasionom wody. Nie mogły więc napęcznieć i uruchomić procesów metabolicznych potrzebnych do kiełkowania.",
   "The dry substrate supplied no water. The seeds could not imbibe water, swell and activate the metabolism needed for germination."
  ],
  "prompt": [
   "Dlaczego nasiona rzodkiewki w grupie 1 nie wykiełkowały?",
   "Why did group 1 radish seeds fail to germinate?"
  ],
  "explanation": [
   "Początek kiełkowania wymaga pobrania wody. Pęcznienie i wznowienie pracy enzymów umożliwiają wzrost zarodka. Suche podłoże blokuje pierwszy etap.",
   "Germination starts with water uptake. Swelling and renewed enzyme activity enable embryo growth. Dry substrate prevents that first step."
  ],
  "learn": [
   "Spoczynek, pobieranie wody i kiełkowanie.",
   "Dormancy, water uptake and germination."
  ]
 },
 {
  "s": "biologia",
  "id": "6.2",
  "page": 10,
  "key": 13,
  "title": [
   "Uzasadnij pomiar suchej masy.",
   "Explain why dry mass was measured."
  ],
  "points": 1,
  "modelAnswer": [
   "Świeża masa zależy również od ilości pobranej wody, która różni się między grupami. Suszenie usuwa tę zmienność i pozwala porównać zmiany masy związków zawierających węgiel.",
   "Fresh mass includes water, and water uptake varies between groups. Drying removes this source of variation so changes in carbon-containing material can be compared."
  ],
  "prompt": [
   "Po co mierzono suchą masę zamiast świeżej?",
   "Why measure dry rather than fresh mass?"
  ],
  "explanation": [
   "Siewka może stać się cięższa przez samo nawodnienie. Woda nie zawiera węgla. Po wysuszeniu zmiana masy lepiej odzwierciedla bilans związków organicznych.",
   "A seedling can gain weight by absorbing water alone. Water contains no carbon. Dry mass therefore better reflects changes in organic material."
  ],
  "learn": [
   "Sucha masa a świeża masa.",
   "Dry versus fresh mass."
  ]
 },
 {
  "s": "biologia",
  "id": "6.3",
  "page": 11,
  "key": 14,
  "title": [
   "Wybierz grupę porównawczą do analizy bilansu węgla.",
   "Choose a comparison group for carbon balance."
  ],
  "points": 1,
  "modelAnswer": [
   "Grupa 1. Suche nasiona pozostały w spoczynku i zachowały w przybliżeniu początkową ilość związków organicznych. Dają więc punkt odniesienia dla grupy 2.",
   "Group 1. The dry seeds remained dormant and retained approximately their initial organic matter, providing a baseline for group 2."
  ],
  "prompt": [
   "Która grupa daje punkt odniesienia dla bilansu węgla grupy 2?",
   "Which group gives a baseline for group 2’s carbon balance?"
  ],
  "explanation": [
   "Punkt odniesienia powinien zachować początkowy zapas materii. Suche nasiona grupy 1 pozostały w spoczynku, więc ich sucha masa przybliża stan wyjściowy.",
   "A baseline should preserve the initial stores. Dry group 1 seeds remained dormant, so their dry mass approximates the starting state."
  ],
  "learn": [
   "Grupa odniesienia i bilans zysku oraz strat.",
   "Baseline groups and net gain or loss."
  ]
 },
 {
  "s": "biologia",
  "id": "6.4",
  "page": 11,
  "key": 15,
  "title": [
   "Odczytaj dowód fotosyntezy z wyników doświadczenia.",
   "Identify evidence of photosynthesis in the results."
  ],
  "points": 1,
  "modelAnswer": [
   "Końcowa sucha masa grupy 2 była większa od wyjściowej. Przyrost suchej materii oznacza, że rośliny przyswoiły węgiel z CO₂ podczas fotosyntezy.",
   "Group 2 ended with more dry matter than it started with. This gain shows that the plants incorporated carbon from CO₂ through photosynthesis."
  ],
  "prompt": [
   "Który wynik świadczy o fotosyntezie w grupie 2?",
   "Which result is evidence of photosynthesis in group 2?"
  ],
  "explanation": [
   "Samo oświetlenie to warunek procesu. Przyrost suchej materii jest wynikiem pomiaru wskazującym, że roślina wbudowała dodatkowy węgiel w związki organiczne.",
   "Light is a condition for the process. A measured increase in dry matter indicates that the plants incorporated additional carbon into organic material."
  ],
  "learn": [
   "Warunki procesu a dowód, że zaszedł.",
   "Conditions for a process versus evidence of it."
  ]
 },
 {
  "s": "biologia",
  "id": "6.5",
  "page": 11,
  "key": 16,
  "title": [
   "Porównaj oddychanie komórkowe w grupach.",
   "Compare cellular respiration across groups."
  ],
  "points": 1,
  "modelAnswer": [
   "T, T. Kiełkujące rośliny oddychają zarówno w świetle, jak i w ciemności.",
   "Yes, yes (T, T). Germinating plants respire in both light and darkness."
  ],
  "prompt": [
   "Czy rośliny w grupach 2 i 3 oddychały komórkowo?",
   "Did plants in groups 2 and 3 respire?"
  ],
  "explanation": [
   "Rosnące komórki potrzebują ATP. Rozkładają związki organiczne również w świetle, kiedy równocześnie może zachodzić fotosynteza.",
   "Growing cells need ATP. They break down organic compounds even in the light, when photosynthesis can also occur."
  ],
  "learn": [
   "Oddychanie komórkowe w dzień i w nocy.",
   "Cellular respiration in light and darkness."
  ]
 },
 {
  "s": "biologia",
  "id": "7.1",
  "page": 12,
  "key": 16,
  "title": [
   "Rozpoznaj organ rośliny na przekroju.",
   "Identify the plant organ in cross section."
  ],
  "points": 1,
  "modelAnswer": [
   "B2. Jest to korzeń. Drewno i łyko są rozmieszczone naprzemiennie.",
   "B2. This is a root. Xylem and phloem alternate."
  ],
  "prompt": [
   "Który organ widać na przekroju i po czym można go rozpoznać?",
   "Which organ is shown in cross section and how is it identifiable?"
  ],
  "explanation": [
   "Odszukaj pasma drewna oraz łyka. Ich naprzemienne ułożenie jest cechą widocznego korzenia.",
   "Find the xylem and phloem strands. Their alternating arrangement identifies the root in this section."
  ],
  "learn": [
   "Układ tkanek przewodzących korzenia.",
   "Root vascular arrangement."
  ]
 },
 {
  "s": "biologia",
  "id": "7.2",
  "page": 12,
  "key": 16,
  "title": [
   "Nazwij tkanki przewodzące widoczne na zdjęciu.",
   "Identify the vascular tissues in the micrograph."
  ],
  "points": 1,
  "modelAnswer": [
   "I – łyko (floem). II – drewno (ksylem).",
   "I – phloem. II – xylem."
  ],
  "prompt": [
   "Jakie tkanki oznaczono I i II?",
   "Which tissues are labelled I and II?"
  ],
  "explanation": [
   "Drewno przewodzi głównie wodę i sole, a łyko m.in. cukry. Na przekroju rozpoznaje się pasma tych tkanek na podstawie ich położenia i budowy.",
   "Xylem mainly carries water and minerals, while phloem carries substances including sugars. Their positions and structure distinguish the strands."
  ],
  "learn": [
   "Floem i ksylem: położenie i funkcje.",
   "Phloem and xylem: positions and functions."
  ]
 },
 {
  "s": "biologia",
  "id": "8.1",
  "page": 13,
  "key": 17,
  "title": [
   "Oceń twierdzenie o gametach pasożyta.",
   "Evaluate the claim about the parasite’s gametes."
  ],
  "points": 1,
  "modelAnswer": [
   "Fałsz. Człowiek jest żywicielem pośrednim T. gondii. Pasożyt rozmnaża się u niego bezpłciowo, więc nie tworzy gamet.",
   "False. Humans are intermediate hosts of T. gondii. The parasite reproduces asexually in humans, so it does not produce gametes there."
  ],
  "prompt": [
   "Czy T. gondii wytwarza gamety w organizmie człowieka?",
   "Does T. gondii produce gametes in humans?"
  ],
  "explanation": [
   "Typ żywiciela wskazuje stadium cyklu. U człowieka pasożyt rozmnaża się bezpłciowo; etap płciowy zachodzi u kotowatych.",
   "Host type identifies the life-cycle stage. The parasite reproduces asexually in humans; the sexual stage occurs in felids."
  ],
  "learn": [
   "Żywiciel pośredni i ostateczny.",
   "Intermediate and definitive hosts."
  ]
 },
 {
  "s": "biologia",
  "id": "8.2",
  "page": 13,
  "key": 18,
  "title": [
   "Oceń zasady profilaktyki toksoplazmozy.",
   "Evaluate toxoplasmosis prevention measures."
  ],
  "points": 1,
  "modelAnswer": [
   "P, P. Oba podane zalecenia są prawidłowe. Zachowaj higienę po kontakcie z kotem i unikaj surowego lub niedogotowanego mięsa.",
   "True, true (P, P on the paper). Both prevention statements are correct. Practise hygiene after contact with cats and avoid raw or undercooked meat."
  ],
  "prompt": [
   "Czy higiena przy kontakcie z kotami i unikanie niedogotowanego mięsa pomagają w profilaktyce?",
   "Do hygiene around cats and avoiding undercooked meat help prevent toxoplasmosis?"
  ],
  "explanation": [
   "Oba zalecenia ograniczają narażenie drogą pokarmową. Higiena zmniejsza możliwość połknięcia form pasożyta z zanieczyszczeń, a obróbka mięsa dotyczy drugiego źródła.",
   "Both measures address oral exposure. Hygiene reduces accidental ingestion after contact with contamination; cooking addresses exposure through meat."
  ],
  "learn": [
   "Powiązanie drogi zarażenia z profilaktyką.",
   "Matching prevention to the exposure route."
  ]
 },
 {
  "s": "biologia",
  "id": "8.3",
  "page": 13,
  "key": 18,
  "title": [
   "Uzasadnij ocenę ryzyka kontaktu z chorym.",
   "Explain the risk associated with contact with a patient."
  ],
  "points": 1,
  "modelAnswer": [
   "Nie. Zwykły kontakt z osobą chorą nie jest drogą zarażenia toksoplazmozą.",
   "No. Ordinary social contact with an infected person does not transmit toxoplasmosis."
  ],
  "prompt": [
   "Czy ciężarna powinna unikać zwykłego kontaktu z osobą chorą na toksoplazmozę?",
   "Should a pregnant person avoid ordinary social contact with a person with toxoplasmosis?"
  ],
  "explanation": [
   "Ryzyko dla płodu dotyczy zarażenia matki. Rozmowa ani podanie ręki nie stanowią typowej drogi zarażenia matki.",
   "Risk to the fetus concerns maternal infection. Talking or shaking hands is not a usual way for the mother to acquire it."
  ],
  "learn": [
   "Droga zarażenia a transmisja przez łożysko.",
   "Maternal exposure versus placental transmission."
  ]
 },
 {
  "s": "biologia",
  "id": "9",
  "page": 14,
  "key": 19,
  "title": [
   "Rozpoznaj kości obręczy kończyn górnych.",
   "Identify bones of the shoulder girdle."
  ],
  "points": 1,
  "modelAnswer": [
   "X – obojczyk. Y – łopatka.",
   "X – clavicle. Y – scapula."
  ],
  "prompt": [
   "Które kości obręczy kończyny górnej oznaczono X i Y?",
   "Which shoulder girdle bones are labelled X and Y?"
  ],
  "explanation": [
   "Obojczyk jest wydłużony i łączy mostek z okolicą barku. Łopatka jest szeroką, płaską kością z tyłu klatki piersiowej. Ich kształty pozwalają odczytać rysunek.",
   "The clavicle is elongated and links the sternum to the shoulder. The scapula is broad, flat and lies behind the chest. Shape identifies each bone."
  ],
  "learn": [
   "Położenie i kształt obojczyka oraz łopatki.",
   "Location and shape of the clavicle and scapula."
  ]
 },
 {
  "s": "biologia",
  "id": "10",
  "page": 14,
  "key": 19,
  "title": [
   "Wskaż produkt wydalania azotu.",
   "Identify the nitrogenous waste product."
  ],
  "points": 1,
  "modelAnswer": [
   "A i D. U ssaków azot pochodzący z metabolizmu białek jest usuwany głównie jako mocznik, syntetyzowany w wątrobie.",
   "A and D. Mammals excrete most nitrogen from protein metabolism as urea, which is synthesised in the liver."
  ],
  "prompt": [
   "Jaki główny produkt azotowy wydalają ssaki i gdzie on powstaje?",
   "What main nitrogenous waste do mammals excrete and where is it made?"
  ],
  "explanation": [
   "Rozkład aminokwasów uwalnia azot. Wątroba przekształca go w mocznik, który krew przenosi do nerek w celu wydalenia.",
   "Amino acid breakdown releases nitrogen. The liver incorporates it into urea, which blood carries to the kidneys for excretion."
  ],
  "learn": [
   "Miejsce syntezy mocznika i miejsce wydalania.",
   "Urea synthesis versus excretion."
  ]
 },
 {
  "s": "biologia",
  "id": "11.1",
  "page": 15,
  "key": 20,
  "title": [
   "Rozpoznaj warunki pobudzenia neuronu.",
   "Identify the conditions for neuron excitation."
  ],
  "points": 1,
  "modelAnswer": [
   "A i D. Wzrost przepuszczalności dla Na⁺ powoduje napływ jonów do neuronu i depolaryzację błony.",
   "A and D. Increased permeability to Na⁺ allows sodium to enter, depolarising the membrane."
  ],
  "prompt": [
   "Co dzieje się z przepuszczalnością błony dla Na⁺ i jej potencjałem po pobudzeniu neuronu?",
   "How do sodium permeability and membrane potential change on neuronal excitation?"
  ],
  "explanation": [
   "Otwarcie kanałów umożliwia napływ Na⁺. Dodatnie jony sprawiają, że wnętrze staje się mniej ujemne względem otoczenia. To depolaryzacja.",
   "Channels open and sodium enters. Positive ions make the inside less negative relative to the outside. This is depolarisation."
  ],
  "learn": [
   "Kanał jonowy, gradient i depolaryzacja.",
   "Ion channels, gradients and depolarisation."
  ]
 },
 {
  "s": "biologia",
  "id": "11.2",
  "page": 15,
  "key": 20,
  "title": [
   "Oceń stwierdzenia o potencjale czynnościowym.",
   "Evaluate statements about action potentials."
  ],
  "points": 1,
  "modelAnswer": [
   "P, P. Oba stwierdzenia dotyczące potencjału czynnościowego są prawdziwe. Kanały K⁺ otwierają się później niż kanały Na⁺ i dłużej pozostają otwarte, umożliwiając wypływ K⁺.",
   "True, true (P, P on the paper). Both action-potential statements are correct. K⁺ channels open after Na⁺ channels and remain open longer, allowing K⁺ to leave."
  ],
  "prompt": [
   "Czy kanały K⁺ otwierają się później i pozostają otwarte dłużej niż kanały Na⁺?",
   "Do potassium channels open later and stay open longer than sodium channels?"
  ],
  "explanation": [
   "Na wykresie wzrost przepuszczalności dla potasu jest przesunięty i rozciągnięty w czasie względem sodu. Wypływ K⁺ przywraca ujemny potencjał wnętrza.",
   "The potassium permeability rise is later and broader than the sodium rise. Potassium efflux restores the negative internal potential."
  ],
  "learn": [
   "Interpretacja kolejności i czasu trwania zmian na wykresie.",
   "Reading timing and duration from a graph."
  ]
 },
 {
  "s": "biologia",
  "id": "12.1",
  "page": 17,
  "key": 21,
  "title": [
   "Odczytaj warunki denaturacji białka CI2.",
   "Identify conditions that denature the CI2 protein."
  ],
  "points": 1,
  "modelAnswer": [
   "N, T. W pierwszym zestawie warunków CI2 zachowuje strukturę, w drugim ulega denaturacji.",
   "No, yes (N, T). CI2 retains its folded structure under the first set of conditions and denatures under the second."
  ],
  "prompt": [
   "Czy CI2 denaturuje w 60 °C z 4 mol/dm³ TMAO bez mocznika oraz z 8 mol/dm³ mocznika bez TMAO?",
   "Does CI2 denature at 60 °C with 4 mol/dm³ TMAO alone and with 8 mol/dm³ urea alone?"
  ],
  "explanation": [
   "Temperatura jest taka sama. Odszukaj na danych oba składy roztworu. W pierwszym białko zachowuje strukturę, w drugim traci swoje przestrzenne zwinięcie.",
   "Temperature is held constant. Locate each solution composition in the data. The fold is retained in the first and disrupted in the second."
  ],
  "learn": [
   "Denaturacja jako zmiana struktury przestrzennej.",
   "Denaturation as a change in protein folding."
  ]
 },
 {
  "s": "biologia",
  "id": "12.2",
  "page": 17,
  "key": 21,
  "title": [
   "Wyciągnij wniosek o wpływie TMAO na białko.",
   "Infer how TMAO affects protein structure."
  ],
  "points": 1,
  "modelAnswer": [
   "Przy 8 mol/dm³ mocznika TMAO chroni CI2 przed utratą prawidłowej struktury przestrzennej.",
   "At 8 mol/dm³ urea, TMAO protects CI2 against loss of its folded structure."
  ],
  "prompt": [
   "Jak TMAO wpływa na CI2 w obecności mocznika?",
   "How does TMAO affect CI2 in the presence of urea?"
  ],
  "explanation": [
   "Porównaj próby z tym samym stężeniem mocznika, różniące się obecnością TMAO. Zachowanie struktury z TMAO wskazuje na ochronę przed denaturacją.",
   "Compare samples at the same urea concentration with and without TMAO. Retention of the fold with TMAO shows protection against denaturation."
  ],
  "learn": [
   "Kontrolowane porównanie i stabilność białka.",
   "Controlled comparisons and protein stability."
  ]
 },
 {
  "s": "biologia",
  "id": "12.3",
  "page": 17,
  "key": 22,
  "title": [
   "Powiąż głębokość występowania ryb z zawartością TMAO.",
   "Relate fish habitat depth to TMAO content."
  ],
  "points": 1,
  "modelAnswer": [
   "Zarówno u ryb kostnoszkieletowych, jak i chrzęstnoszkieletowych większa głębokość występowania wiąże się z większą zawartością TMAO w mięśniach.",
   "In both bony and cartilaginous fish, greater habitat depth is associated with higher muscle TMAO content."
  ],
  "prompt": [
   "Jak głębokość występowania wiąże się z ilością TMAO w mięśniach obu grup ryb?",
   "How does habitat depth relate to muscle TMAO in both fish groups?"
  ],
  "explanation": [
   "Odczytaj trend osobno dla obu grup. Różne poziomy wyjściowe nie przeszkadzają temu, że obie serie rosną wraz z głębokością.",
   "Read each group’s trend independently. Different baseline levels are compatible with both series increasing with depth."
  ],
  "learn": [
   "Kierunek zależności a różnice między grupami.",
   "Direction of a trend versus group differences."
  ]
 },
 {
  "s": "biologia",
  "id": "12.4",
  "page": 17,
  "key": 23,
  "title": [
   "Oceń osmoregulację ryb chrzęstnoszkieletowych.",
   "Evaluate osmoregulation in cartilaginous fish."
  ],
  "points": 1,
  "modelAnswer": [
   "P, P. Gromadzenie mocznika zbliża stężenie osmotyczne płynów ciała do stężenia wody morskiej i ogranicza utratę wody.",
   "True, true (P, P). Accumulating urea brings body fluid osmolarity close to that of seawater, limiting water loss."
  ],
  "prompt": [
   "Czy mocznik zbliża osmolarność płynów ciała ryby do wody morskiej i ogranicza odpływ wody?",
   "Does urea bring fish body-fluid osmolarity closer to seawater and limit water loss?"
  ],
  "explanation": [
   "Rozpuszczony mocznik zwiększa stężenie osmotyczne płynów ciała. Mniejsza różnica między nimi a otoczeniem osłabia tendencję do utraty wody przez osmozę.",
   "Dissolved urea raises body-fluid osmolarity. A smaller difference from the surroundings reduces the tendency to lose water by osmosis."
  ],
  "learn": [
   "Osmoza, osmolarność i izotoniczność.",
   "Osmosis, osmolarity and isotonicity."
  ]
 },
 {
  "s": "biologia",
  "id": "13.1",
  "page": 19,
  "key": 24,
  "title": [
   "Wyjaśnij rolę próby kontrolnej w pomiarze tlenu.",
   "Explain the control in the oxygen measurements."
  ],
  "points": 1,
  "modelAnswer": [
   "Kontrola pokazuje, jak zmienia się pO₂ w bańce bez jaszczurki. Pozwala ocenić, czy spadek pO₂ w próbie badawczej wynika z pobierania tlenu przez zwierzę.",
   "The control shows how bubble pO₂ changes without a lizard. It provides the baseline for attributing the experimental decrease to oxygen uptake by the animal."
  ],
  "prompt": [
   "Po co mierzono pO₂ w bańce kontrolnej bez jaszczurki?",
   "Why measure oxygen partial pressure in a control bubble without a lizard?"
  ],
  "explanation": [
   "Tlen mógłby znikać z bańki także wskutek procesów fizycznych. Kontrola pozwala zmierzyć taką zmianę tła przed przypisaniem spadku obecności zwierzęcia.",
   "Physical processes might remove oxygen from a bubble. The control measures this background before the decline is attributed to the animal."
  ],
  "learn": [
   "Próba kontrolna i ciśnienie parcjalne.",
   "Controls and partial pressure."
  ]
 },
 {
  "s": "biologia",
  "id": "13.2",
  "page": 19,
  "key": 24,
  "title": [
   "Porównaj hipotezę z wynikami doświadczenia.",
   "Compare the hypothesis with the experimental results."
  ],
  "points": 1,
  "modelAnswer": [
   "Tak. W bańce na głowie jaszczurki pO₂ spadało, a w bańce kontrolnej nie obserwowano takiego spadku. Jaszczurka pobierała tlen z bańki.",
   "Yes. Oxygen partial pressure declined in the bubble on the lizard but did not show that decline in the control bubble. The lizard was taking oxygen from the bubble."
  ],
  "prompt": [
   "Czy wyniki potwierdzają pobieranie tlenu z bańki przez jaszczurkę?",
   "Do the results support oxygen uptake from the bubble by the lizard?"
  ],
  "explanation": [
   "Sam spadek pO₂ nie identyfikuje przyczyny. Brak podobnego spadku w kontroli łączy ubytek tlenu z oddychaniem zwierzęcia.",
   "A decline in pO₂ alone does not identify its cause. The absence of a similar decline in the control connects oxygen loss to respiration by the animal."
  ],
  "learn": [
   "Uzasadnienie hipotezy wynikami obu prób.",
   "Supporting a hypothesis with both experimental and control results."
  ]
 },
 {
  "s": "biologia",
  "id": "14.1",
  "page": 21,
  "key": 25,
  "title": [
   "Wyjaśnij znaczenie swoistości rozpoznawania antygenów.",
   "Explain why antigen specificity matters."
  ],
  "points": 1,
  "modelAnswer": [
   "Antygen nieswoisty może występować także na zdrowej komórce. Limfocyt CAR-T rozpoznający taki antygen mógłby zniszczyć również zdrową tkankę.",
   "A non-specific antigen can also occur on healthy cells. A CAR-T cell recognising it could therefore damage healthy tissue."
  ],
  "prompt": [
   "Dlaczego receptor CAR musi rozpoznawać odpowiednio swoisty antygen?",
   "Why must a CAR recognise a sufficiently specific antigen?"
  ],
  "explanation": [
   "Limfocyt reaguje na cel obecny na powierzchni komórki. Jeśli zdrowa tkanka ma taki sam cel, także może zostać uszkodzona.",
   "The T cell responds to its target on a cell surface. If healthy tissue carries the same target, it too can be damaged."
  ],
  "learn": [
   "Receptor, antygen i swoistość.",
   "Receptors, antigens and specificity."
  ]
 },
 {
  "s": "biologia",
  "id": "14.2",
  "page": 21,
  "key": 26,
  "title": [
   "Porównaj rozpoznawanie komórek nowotworowych przez limfocyty.",
   "Compare how T cells recognise tumour cells."
  ],
  "points": 1,
  "modelAnswer": [
   "Komórki nowotworowe mogą mieć mniej MHC na powierzchni, co utrudnia rozpoznanie przez zwykłe limfocyty T. CAR rozpoznaje antygen powierzchniowy bez prezentacji przez MHC.",
   "Tumour cells can express less surface MHC, impairing recognition by ordinary T cells. A CAR can recognise the surface antigen independently of MHC presentation."
  ],
  "prompt": [
   "Dlaczego komórka CAR-T może rozpoznać nowotwór o obniżonej ilości MHC?",
   "Why can a CAR-T cell recognise a tumour with reduced MHC expression?"
  ],
  "explanation": [
   "Zwykły limfocyt cytotoksyczny rozpoznaje fragment antygenu prezentowany przez MHC. Mniej MHC oznacza słabszą prezentację. CAR może bezpośrednio związać odpowiedni antygen powierzchniowy.",
   "An ordinary cytotoxic T cell recognises an antigen fragment presented by MHC. Less MHC impairs presentation. A CAR can bind a suitable surface antigen directly."
  ],
  "learn": [
   "Prezentacja przez MHC a bezpośrednie rozpoznanie antygenu.",
   "MHC presentation versus direct antigen recognition."
  ]
 },
 {
  "s": "biologia",
  "id": "14.3",
  "page": 21,
  "key": 27,
  "title": [
   "Zinterpretuj dane o obecności receptora CAR.",
   "Interpret the evidence about CAR receptor abundance."
  ],
  "points": 2,
  "modelAnswer": [
   "Gen CAR wbudowany w DNA limfocytu może być wielokrotnie przepisywany na mRNA. Dostarczone samo mRNA ulega rozkładowi, dlatego synteza receptora z tej matrycy trwa krócej.",
   "A CAR gene integrated into the cell’s DNA can be transcribed repeatedly. Supplied mRNA eventually degrades, so receptor synthesis from that template is shorter-lived."
  ],
  "prompt": [
   "Dlaczego gen CAR obecny w DNA daje dłuższą produkcję receptora niż samo mRNA?",
   "Why does a CAR gene in DNA support longer receptor production than mRNA alone?"
  ],
  "explanation": [
   "DNA może wielokrotnie służyć do syntezy nowych mRNA. Każdy transkrypt jest matrycą produkcji białka. Początkowa pula dostarczonego mRNA z czasem zanika.",
   "DNA can be transcribed repeatedly. Each new transcript can be translated into protein, whereas a finite supply of delivered mRNA gradually disappears."
  ],
  "learn": [
   "DNA → mRNA → białko; trwałość matrycy.",
   "DNA → mRNA → protein; template persistence."
  ]
 },
 {
  "s": "biologia",
  "id": "14.4",
  "page": 22,
  "key": 28,
  "title": [
   "Oceń stwierdzenia o limfocytach T.",
   "Evaluate statements about T cells."
  ],
  "points": 1,
  "modelAnswer": [
   "P, P. Limfocyty T uczestniczą w odporności swoistej. Rozpoznanie antygenu może prowadzić do namnażania odpowiedniego klonu.",
   "True, true (P, P on the paper). T cells participate in adaptive immunity. Antigen recognition can trigger expansion of the responding clone."
  ],
  "prompt": [
   "Czy limfocyty T odpowiadają swoiście i namnażają się po kontakcie z odpowiednim antygenem?",
   "Do T cells respond specifically and multiply after recognition of a matching antigen?"
  ],
  "explanation": [
   "Dany klon ma określoną swoistość receptora. Po aktywacji jego komórki dzielą się, co zwiększa liczbę limfocytów rozpoznających ten sam cel.",
   "Each clone has a particular receptor specificity. After activation its cells divide, increasing the number that recognise the target."
  ],
  "learn": [
   "Odporność swoista i ekspansja klonalna.",
   "Adaptive immunity and clonal expansion."
  ]
 },
 {
  "s": "biologia",
  "id": "14.5",
  "page": 22,
  "key": 29,
  "title": [
   "Nazwij narząd dojrzewania limfocytów T.",
   "Name the organ where T cells mature."
  ],
  "points": 1,
  "modelAnswer": [
   "Grasica. Jest miejscem dojrzewania limfocytów T.",
   "The thymus. This is where T cells mature."
  ],
  "prompt": [
   "Gdzie dojrzewają limfocyty T?",
   "Where do T cells mature?"
  ],
  "explanation": [
   "Prekursory pochodzą ze szpiku. Przechodzą dojrzewanie i selekcję w grasicy, zanim trafią do obwodowych narządów limfatycznych.",
   "Precursors originate in bone marrow. They mature and undergo selection in the thymus before reaching peripheral lymphoid organs."
  ],
  "learn": [
   "Pochodzenie komórki a miejsce jej dojrzewania.",
   "Cell origin versus site of maturation."
  ]
 },
 {
  "s": "biologia",
  "id": "15.1",
  "page": 22,
  "key": 30,
  "title": [
   "Odróżnij obecność przeciwciał od obecnej infekcji.",
   "Distinguish antibodies from evidence of current infection."
  ],
  "points": 1,
  "modelAnswer": [
   "Przeciwciała anty-HCV mogą utrzymywać się po wyeliminowaniu wirusa. Dodatni wynik dowodzi odpowiedzi immunologicznej, ale sam nie rozstrzyga, czy wirus nadal jest we krwi.",
   "Anti-HCV antibodies can persist after the virus has been cleared. A positive result shows an immune response and does not establish current viraemia."
  ],
  "prompt": [
   "Dlaczego przeciwciała anty-HCV nie przesądzają o obecności wirusa we krwi?",
   "Why do anti-HCV antibodies alone fail to establish current infection?"
  ],
  "explanation": [
   "Test wykrywa ślad odpowiedzi gospodarza. Przeciwciała mogą utrzymywać się po eliminacji wirusa, więc oba zjawiska nie muszą trwać jednocześnie.",
   "The test detects the host response. Antibodies can persist after viral clearance, so the two need not coincide in time."
  ],
  "learn": [
   "Przeciwciała a materiał genetyczny patogenu.",
   "Antibodies versus pathogen genetic material."
  ]
 },
 {
  "s": "biologia",
  "id": "15.2",
  "page": 23,
  "key": 30,
  "title": [
   "Wyjaśnij rolę odwrotnej transkrypcji w diagnostyce.",
   "Explain the role of reverse transcription in diagnosis."
  ],
  "points": 1,
  "modelAnswer": [
   "Genom HCV jest zbudowany z RNA. Odwrotna transkryptaza syntetyzuje na jego matrycy cDNA, które następnie może zostać powielone metodą PCR.",
   "HCV has an RNA genome. Reverse transcriptase copies the RNA into complementary DNA, which PCR can amplify."
  ],
  "prompt": [
   "Dlaczego przed PCR w diagnostyce HCV potrzebna jest odwrotna transkrypcja?",
   "Why is reverse transcription needed before PCR in HCV diagnosis?"
  ],
  "explanation": [
   "Genom HCV jest zbudowany z RNA, a matrycą dla PCR jest DNA. Kopia DNA zachowuje informację o sekwencji pierwotnego RNA.",
   "HCV has an RNA genome, while PCR uses DNA as its template. A DNA copy preserves the sequence information from the original RNA."
  ],
  "learn": [
   "RNA, cDNA i odwrotna transkrypcja.",
   "RNA, cDNA and reverse transcription."
  ]
 },
 {
  "s": "biologia",
  "id": "16.1",
  "page": 23,
  "key": 31,
  "title": [
   "Rozpoznaj skutki alternatywnego składania RNA.",
   "Identify the consequences of alternative RNA splicing."
  ],
  "points": 1,
  "modelAnswer": [
   "B i C. W genach nieciągłych alternatywne składanie łączy eksony w różnych kombinacjach.",
   "B and C. Alternative splicing joins exons of interrupted genes in different combinations."
  ],
  "prompt": [
   "Jakich genów dotyczy alternatywne składanie i które fragmenty są łączone?",
   "Which genes undergo alternative splicing and which segments are joined?"
  ],
  "explanation": [
   "Pierwotny transkrypt zawiera eksony i introny. Usunięcie intronów oraz połączenie różnych zestawów eksonów pozwala otrzymać różne mRNA z jednego genu.",
   "The primary transcript contains exons and introns. Removing introns and joining different exon combinations allows one gene to yield different mRNAs."
  ],
  "learn": [
   "Gen nieciągły, ekson, intron, splicing.",
   "Interrupted genes, exons, introns and splicing."
  ]
 },
 {
  "s": "biologia",
  "id": "16.2",
  "page": 23,
  "key": 32,
  "title": [
   "Porównaj transkrypcję w organellach człowieka.",
   "Compare transcription in human organelles."
  ],
  "points": 2,
  "modelAnswer": [
   "Jądro komórkowe – translacja nie zachodzi. Mitochondrium – translacja zachodzi. W obu organellach zachodzi transkrypcja.",
   "Nucleus – no translation. Mitochondrion – translation occurs. Transcription takes place in both."
  ],
  "prompt": [
   "W których dwóch organellach człowieka zachodzi transkrypcja i czy odbywa się tam translacja?",
   "Which two human organelles carry out transcription, and do they also carry out translation?"
  ],
  "explanation": [
   "Jądrowe mRNA opuszcza jądro przed translacją. Mitochondrium ma własne DNA i rybosomy, dlatego może zarówno przepisywać geny, jak i tłumaczyć transkrypty.",
   "Nuclear mRNA leaves the nucleus before translation. Mitochondria contain their own DNA and ribosomes and can both transcribe genes and translate transcripts."
  ],
  "learn": [
   "Transkrypcja, translacja i przedziały komórki.",
   "Transcription, translation and cell compartments."
  ]
 },
 {
  "s": "biologia",
  "id": "17.1",
  "page": 24,
  "key": 32,
  "title": [
   "Rozpoznaj wiązanie rozcinane przez separazę.",
   "Identify the bond cleaved by separase."
  ],
  "points": 1,
  "modelAnswer": [
   "Wiązanie peptydowe. Separaza przecina białko utrzymujące chromatydy razem.",
   "A peptide bond. Separase cleaves a protein that holds the chromatids together."
  ],
  "prompt": [
   "Jakie wiązanie rozcina separaza?",
   "Which bond does separase cleave?"
  ],
  "explanation": [
   "Separaza przecina białko spajające chromatydy. Szkielet białka tworzą aminokwasy połączone wiązaniami peptydowymi.",
   "Separase cuts a protein holding chromatids together. The protein backbone consists of amino acids joined by peptide bonds."
  ],
  "learn": [
   "Proteaza, hydroliza i budowa białka.",
   "Proteases, hydrolysis and protein structure."
  ]
 },
 {
  "s": "biologia",
  "id": "17.2",
  "page": 24,
  "key": 33,
  "title": [
   "Wskaż moment rozdzielenia chromatyd siostrzanych.",
   "Identify when sister chromatids separate."
  ],
  "points": 1,
  "modelAnswer": [
   "Na przejściu z metafazy do anafazy.",
   "At the transition from metaphase to anaphase."
  ],
  "prompt": [
   "Na granicy których faz mitozy rozdzielają się chromatydy siostrzane?",
   "At which mitotic transition do sister chromatids separate?"
  ],
  "explanation": [
   "W metafazie pary są ustawione w płaszczyźnie równikowej. Usunięcie połączenia umożliwia ruch ku przeciwnym biegunom w anafazie.",
   "Pairs align at the equator in metaphase. Releasing the connection allows movement towards opposite poles in anaphase."
  ],
  "learn": [
   "Kolejność faz mitozy.",
   "The sequence of mitotic stages."
  ]
 },
 {
  "s": "biologia",
  "id": "17.3",
  "page": 24,
  "key": 33,
  "title": [
   "Nazwij fazę replikacji DNA.",
   "Name the phase when DNA is replicated."
  ],
  "points": 1,
  "modelAnswer": [
   "Faza S interfazy. Wtedy kopiowane jest DNA.",
   "The S phase of interphase, when DNA is copied."
  ],
  "prompt": [
   "W której fazie cyklu powstają chromatydy siostrzane?",
   "During which cell-cycle phase are sister chromatids formed?"
  ],
  "explanation": [
   "Chromatydy są kopiami tego samego chromosomu. Powstają podczas kopiowania DNA, jeszcze przed mitozą.",
   "Sister chromatids are copies of one chromosome. They arise during DNA replication before mitosis begins."
  ],
  "learn": [
   "Fazy G₁, S, G₂ i M.",
   "G₁, S, G₂ and M phases."
  ]
 },
 {
  "s": "biologia",
  "id": "18.1",
  "page": 25,
  "key": 34,
  "title": [
   "Wyklucz modele dziedziczenia na podstawie rodowodu.",
   "Rule out inheritance patterns using a pedigree."
  ],
  "points": 1,
  "modelAnswer": [
   "N, T. Dziedziczenia autosomalnego dominującego nie można wykluczyć. Dziedziczenie recesywne sprzężone z płcią można wykluczyć.",
   "No, yes (N, T). Autosomal dominant inheritance remains possible. Sex-linked recessive inheritance can be excluded."
  ],
  "prompt": [
   "Czy rodowód wyklucza dziedziczenie autosomalne dominujące lub recesywne sprzężone z X?",
   "Does the pedigree exclude autosomal dominant or X-linked recessive inheritance?"
  ],
  "explanation": [
   "Prześledź, od którego rodzica dziecko mogło dostać allel. Syn otrzymuje X od matki, a córka po jednym X od każdego rodzica. Model musi pasować do wszystkich osób w rodowodzie.",
   "Trace the possible parental source of each allele. Sons receive their X from their mother; daughters receive one X from each parent. A model must fit everyone in the pedigree."
  ],
  "learn": [
   "Symbole rodowodu i przekazywanie chromosomu X.",
   "Pedigree symbols and X-chromosome transmission."
  ]
 },
 {
  "s": "biologia",
  "id": "18.2",
  "page": 25,
  "key": 34,
  "title": [
   "Określ sposób dziedziczenia genomu mitochondrialnego.",
   "Identify how the mitochondrial genome is inherited."
  ],
  "points": 1,
  "modelAnswer": [
   "A. Człowiek zazwyczaj dziedziczy mitochondrialne DNA od matki.",
   "A. Human mitochondrial DNA is normally inherited from the mother."
  ],
  "prompt": [
   "Od którego rodzica pochodzi zwykle ludzkie DNA mitochondrialne?",
   "Which parent usually transmits human mitochondrial DNA?"
  ],
  "explanation": [
   "Komórka jajowa dostarcza zygocie niemal całą cytoplazmę i mitochondria. Dlatego mitochondrialny rodowód przebiega zwykle linią matczyną.",
   "The egg supplies almost all the zygote’s cytoplasm and mitochondria. Mitochondrial inheritance therefore normally follows the maternal line."
  ],
  "learn": [
   "Dziedziczenie pozajądrowe.",
   "Extranuclear inheritance."
  ]
 },
 {
  "s": "biologia",
  "id": "19",
  "page": 26,
  "key": 35,
  "title": [
   "Przeanalizuj krzyżówkę genetyczną muszki owocowej.",
   "Analyse a fruit fly genetic cross."
  ],
  "points": 3,
  "modelAnswer": [
   "Samica: bd/bd. Gamety drugiego osobnika: BD i bd po (100% − 17,5%)/2 = 41,25%, Bd i bD po 17,5%/2 = 8,75%. Poszukiwany udział potomstwa: 41,25%. CKE uznaje również rozwiązanie biologiczne uwzględniające brak crossing-over u samców D. melanogaster: BD i bd po 50%, Bd i bD po 0%, szukane potomstwo 50%. Wybierz jeden spójny wariant.",
   "Female: bd/bd. Gametes of the other parent: BD and bd each (100% − 17.5%)/2 = 41.25%, Bd and bD each 17.5%/2 = 8.75%. Requested offspring frequency: 41.25%. CKE also accepts the biological alternative accounting for the absence of crossing-over in male D. melanogaster: BD and bd each 50%, Bd and bD each 0%, requested offspring 50%. Use one consistent model."
  ],
  "criterion": [
   "Pokaż układ alleli na chromosomach, wszystkie cztery gamety z częstościami i udział potomstwa. Zachowaj dokładne wartości.",
   "Show allele arrangement on the chromosomes, all four gametes with frequencies, and the offspring probability. Keep exact values."
  ],
  "prompt": [
   "Jak zapisać genotyp samicy, częstości gamet samca BD/bd i szansę brązowego potomstwa o normalnych odnóżach przy odległości 17,5 cM?",
   "What are the female genotype, BD/bd male gamete frequencies and probability of brown, normal-legged offspring for a map distance of 17.5 cM?"
  ],
  "explanation": [
   "Samica daje tylko gamety bd. W wariancie obliczeniowym klucza dwa typy rekombinantów dzielą 17,5%, a dwa typy rodzicielskie pozostałą część. Poszukiwany fenotyp wymaga od ojca gamety BD. Klucz dopuszcza także wariant uwzględniający brak crossing-over u samców muszki.",
   "The female contributes only bd. In the guide’s map-based model two recombinant types share 17.5%, while the parental types share the remainder. The requested phenotype requires paternal BD. The guide also accepts the male-specific absence of crossing-over."
  ],
  "learn": [
   "Sprzężenie genów, rekombinacja i krzyżówka testowa.",
   "Linkage, recombination and test crosses."
  ]
 },
 {
  "s": "biologia",
  "id": "20.1",
  "page": 27,
  "key": 36,
  "title": [
   "Wyjaśnij niezależne powstanie zębów szablastych.",
   "Explain the independent evolution of sabre teeth."
  ],
  "points": 1,
  "modelAnswer": [
   "Wspólny przodek miał zęby zwykłej długości. Szablaste zęby powstały niezależnie w linii torbacza Thylacosmilus i kota Smilodon, co wskazuje na konwergencję.",
   "The common ancestor had teeth of ordinary length. Sabre teeth evolved independently in the marsupial Thylacosmilus and the cat Smilodon, demonstrating convergence."
  ],
  "prompt": [
   "Dlaczego zęby szablaste obu rodzajów są przykładem konwergencji?",
   "Why do sabre teeth in the two genera illustrate convergence?"
  ],
  "explanation": [
   "Wspólny przodek miał zęby zwykłej długości. Długie zęby pojawiają się w dwóch oddzielnych gałęziach drzewa, więc podobieństwo powstało niezależnie.",
   "The ancestor had ordinary-length teeth. Long teeth appear on two separate branches, showing that the resemblance arose independently."
  ],
  "learn": [
   "Wspólny przodek i konwergencja.",
   "Common ancestry and convergence."
  ]
 },
 {
  "s": "biologia",
  "id": "20.2",
  "page": 27,
  "key": 37,
  "title": [
   "Odczytaj pokrewieństwo z drzewa ewolucyjnego.",
   "Read relatedness from an evolutionary tree."
  ],
  "points": 1,
  "modelAnswer": [
   "F, F. Oba twierdzenia o pokrewieństwie są fałszywe.",
   "False, false (F, F). Both claims about relatedness are false."
  ],
  "prompt": [
   "Czy Thylacosmilus jest bliższy Smilodon niż kangurom, a Smilodon bliższy słoniowi niż człowiekowi?",
   "Is Thylacosmilus closer to Smilodon than to kangaroos, and Smilodon closer to elephants than to humans?"
  ],
  "explanation": [
   "Pokrewieństwo odczytuje się z ostatniego wspólnego przodka. Cofnij się od końców gałęzi do ich połączenia. Kształt zębów sam nie przesądza o pokrewieństwie.",
   "Relatedness follows the most recent common ancestor. Trace each pair of branches back to its meeting point. Similar teeth alone cannot establish relatedness."
  ],
  "learn": [
   "Odczytywanie węzłów drzewa filogenetycznego.",
   "Reading phylogenetic tree nodes."
  ]
 },
 {
  "s": "biologia",
  "id": "21.1",
  "page": 28,
  "key": 37,
  "title": [
   "Nazwij zależność między pająkiem a żabą i ją uzasadnij.",
   "Identify and justify the spider–frog relationship."
  ],
  "points": 1,
  "modelAnswer": [
   "Mutualizm fakultatywny (protokooperacja). Pająk osłania żabę przed drapieżnikami, a żaba zjada mrówki zagrażające potomstwu pająka.",
   "Facultative mutualism. The spider protects the frog from predators, and the frog eats ants that threaten the spider’s offspring."
  ],
  "prompt": [
   "Jaka zależność łączy pająka i żabę i co zyskuje każdy gatunek?",
   "What relationship links the spider and frog, and how does each benefit?"
  ],
  "explanation": [
   "Oceń skutki osobno dla każdego partnera. Żaba uzyskuje ochronę, a potomstwu pająka zagraża mniej mrówek. Oba gatunki odnoszą korzyść.",
   "Assess each partner separately. The frog gains protection and the spider’s offspring face fewer ants. Both species benefit."
  ],
  "learn": [
   "Mutualizm i obustronne korzyści.",
   "Mutualism and reciprocal benefits."
  ]
 },
 {
  "s": "biologia",
  "id": "21.2",
  "page": 28,
  "key": 38,
  "title": [
   "Porównaj trawienie pokarmu u pająków i płazów.",
   "Compare digestion in spiders and amphibians."
  ],
  "points": 1,
  "modelAnswer": [
   "Pająk rozpoczyna trawienie poza swoim ciałem, w tkankach ofiary. U płazów pokarm jest trawiony wewnątrz przewodu pokarmowego.",
   "A spider starts digesting prey outside its own body. Amphibians digest food inside their digestive tract."
  ],
  "prompt": [
   "Gdzie zaczyna się trawienie u pająka i gdzie zachodzi u płaza?",
   "Where does digestion start in spiders and where does it occur in amphibians?"
  ],
  "explanation": [
   "Pająk uwalnia enzymy do ciała ofiary i pobiera upłynniony pokarm. Płaz połyka zdobycz i trawi ją w swoim przewodzie pokarmowym.",
   "A spider releases enzymes into prey and takes up liquefied food. An amphibian swallows prey and digests it inside its digestive tract."
  ],
  "learn": [
   "Trawienie zewnątrzustrojowe i wewnątrzustrojowe.",
   "Extraoral versus internal digestion."
  ]
 },
 {
  "s": "biologia",
  "id": "22.1",
  "page": 29,
  "key": 38,
  "title": [
   "Rozróżnij żywicieli pośrednich i ostatecznych.",
   "Distinguish intermediate and definitive hosts."
  ],
  "points": 1,
  "modelAnswer": [
   "Żywiciele pośredni: racicznica zmienna i ryby karpiowate. Żywiciele ostateczni: ryby rybożerne.",
   "Intermediate hosts: the zebra mussel and cyprinid fish. Definitive hosts: fish-eating fish."
  ],
  "prompt": [
   "Które zwierzęta są żywicielami pośrednimi i ostatecznymi przywry?",
   "Which animals are intermediate and definitive hosts of the fluke?"
  ],
  "explanation": [
   "Klasyfikuj żywiciela według stadium pasożyta. Larwy rozwijają się w małżu i rybach karpiowatych. Postać dojrzała występuje w rybach rybożernych.",
   "Classify hosts by parasite stage. Larvae develop in the mussel and cyprinids. Adults occur in fish-eating fish."
  ],
  "learn": [
   "Stadium larwalne, dojrzałość i typ żywiciela.",
   "Larval stages, maturity and host type."
  ]
 },
 {
  "s": "biologia",
  "id": "22.2",
  "page": 29,
  "key": 39,
  "title": [
   "Wyjaśnij rolę małża w cyklu życiowym przywry.",
   "Explain the mussel’s role in the fluke life cycle."
  ],
  "points": 1,
  "modelAnswer": [
   "Racicznica jest jedynym możliwym pierwszym żywicielem pośrednim w opisanym cyklu. Bez niej nie zachodzi niezbędny etap rozwoju larwalnego przywry.",
   "The zebra mussel is the only possible first intermediate host in this cycle. Without it the fluke cannot complete an essential larval stage."
  ],
  "prompt": [
   "Dlaczego przywra potrzebuje racicznicy do zamknięcia cyklu?",
   "Why does the fluke need the zebra mussel to complete its cycle?"
  ],
  "explanation": [
   "Pierwsze stadium larwalne zależy od określonego małża. Bez tego ogniwa nie powstają formy potrzebne na dalszych etapach rozwoju.",
   "The first larval stage depends on this particular mussel. Without that host, forms needed later in the cycle cannot develop."
  ],
  "learn": [
   "Swoistość żywiciela i kolejność etapów cyklu.",
   "Host specificity and sequence of life-cycle stages."
  ]
 },
 {
  "s": "biologia",
  "id": "23.1",
  "page": 30,
  "key": 39,
  "title": [
   "Odczytaj zakres tolerancji ekologicznej krewetki.",
   "Interpret the shrimp’s ecological tolerance."
  ],
  "points": 1,
  "modelAnswer": [
   "F, F. Przy 10 °C i 15‰ śmiertelność nie przekracza 50%. Przy tej samej temperaturze zmiana zasolenia może zmienić śmiertelność.",
   "False, false (F, F). At 10 °C and 15‰ mortality does not exceed 50%. At the same temperature mortality can vary with salinity."
  ],
  "prompt": [
   "Czy w 10 °C i 15‰ śmiertelność samic przekracza 50% i czy w 10 °C jest niezależna od zasolenia?",
   "At 10 °C and 15‰ does female mortality exceed 50%, and is mortality at 10 °C independent of salinity?"
  ],
  "explanation": [
   "Znajdź punkt na przecięciu zadanych wartości. Następnie trzymaj temperaturę stałą i zmieniaj zasolenie. Przejście między strefami wykresu oznacza zmianę śmiertelności.",
   "Locate the intersection of the given values. Then hold temperature constant and vary salinity. Crossing graph regions indicates changing mortality."
  ],
  "learn": [
   "Czytanie wykresu dwóch zmiennych i izolinii.",
   "Reading two-variable graphs and contour lines."
  ]
 },
 {
  "s": "biologia",
  "id": "23.2",
  "page": 31,
  "key": 40,
  "title": [
   "Odróżnij niszę ekologiczną od zasięgu geograficznego.",
   "Distinguish ecological niche from geographic range."
  ],
  "points": 1,
  "modelAnswer": [
   "Fałsz. Zachodnie wybrzeża Atlantyku to obszar geograficzny. Niszę podstawową określa zakres warunków i zasobów, przy których gatunek może przeżyć i się rozmnażać.",
   "False. The western Atlantic coast is a geographic area. A fundamental niche comprises conditions and resources under which the species can survive and reproduce."
  ],
  "prompt": [
   "Czy zachodnie wybrzeża Atlantyku to nisza podstawowa krewetki?",
   "Is the western Atlantic coast the shrimp’s fundamental niche?"
  ],
  "explanation": [
   "Wybrzeże to miejsce na mapie. Niszę opisują warunki i zasoby, np. temperatura i zasolenie, przy których gatunek może utrzymać populację.",
   "A coast is a place on a map. A niche describes conditions and resources, such as temperature and salinity, under which a population can persist."
  ],
  "learn": [
   "Zasięg geograficzny a nisza podstawowa.",
   "Geographic range versus fundamental niche."
  ]
 },
 {
  "s": "biologia",
  "id": "23.3",
  "page": 31,
  "key": 41,
  "title": [
   "Odczytaj optimum temperatury przy optymalnym zasoleniu.",
   "Read the temperature optimum at optimal salinity."
  ],
  "points": 1,
  "modelAnswer": [
   "Około 10–25 °C przy optymalnym zasoleniu. Podaj oba końce przedziału i jednostkę temperatury.",
   "Approximately 10–25 °C at optimal salinity. Give both ends of the interval and the temperature unit."
  ],
  "prompt": [
   "Jaki zakres temperatur jest optymalny dla samic przy optymalnym zasoleniu?",
   "What temperature range is optimal for females at optimal salinity?"
  ],
  "explanation": [
   "Wybierz optymalne zasolenie i znajdź strefę najmniejszej śmiertelności. Na osi temperatur odczytaj oba jej końce i dopisz jednostkę.",
   "At optimal salinity find the lowest-mortality region. Read both limits on the temperature axis and include the unit."
  ],
  "learn": [
   "Optimum i zakres tolerancji.",
   "Optimum and tolerance range."
  ]
 },
 {
  "s": "chemia",
  "id": "1.1",
  "page": 4,
  "key": 4,
  "title": [
   "Rozpoznaj pierwiastki, bloki i stopnie utlenienia.",
   "Identify the elements, blocks and oxidation states."
  ],
  "points": 2,
  "modelAnswer": [
   "A: Cr, blok d, +VI. Q: N, blok p, +V. W tabeli wpisujemy symbol atomu N. Cząsteczka tego gazu ma wzór N₂.",
   "A: Cr, d block, +VI. Q: N, p block, +V. Enter N as the element symbol. The gas consists of N₂ molecules."
  ],
  "prompt": [
   "Jakie symbole, bloki i maksymalne stopnie utlenienia mają metal A i niemetal Q opisane w arkuszu?",
   "What are the symbols, blocks and maximum oxidation states of metal A and nonmetal Q?"
  ],
  "explanation": [
   "Głównym dwuatomowym składnikiem powietrza jest azot. Ma pięć elektronów walencyjnych, więc szukany metal ma sześć niesparowanych elektronów zdolnych do wiązania. Układ 3d⁵4s¹ wskazuje chrom.",
   "Nitrogen is the main diatomic gas in air. Its five valence electrons imply six unpaired bonding electrons in the metal. The 3d⁵4s¹ arrangement identifies chromium."
  ],
  "learn": [
   "Grupy i bloki układu okresowego, elektrony walencyjne, chrom.",
   "Periodic groups and blocks, valence electrons and chromium."
  ]
 },
 {
  "s": "chemia",
  "id": "1.2",
  "page": 4,
  "key": 5,
  "title": [
   "Przedstaw elektrony za pomocą schematu klatkowego.",
   "Draw the electrons in an orbital box diagram."
  ],
  "points": 1,
  "modelAnswer": [
   "3d [↑][↑][↑][↑][↑]    4s [↑]. Sześć elektronów zajmuje osobne orbitale i ma równoległe spiny.",
   "3d [↑][↑][↑][↑][↑]    4s [↑]. All six electrons occupy separate orbitals with parallel spins."
  ],
  "prompt": [
   "Jak narysować orbitale elektronów chromu uczestniczących w wiązaniach?",
   "How do you draw the orbitals of chromium’s bonding electrons?"
  ],
  "explanation": [
   "Jedna klatka oznacza jeden orbital. Podpowłoka d ma pięć orbitali, s jeden. W stanie podstawowym chrom ma po jednym elektronie w każdym z tych sześciu orbitali.",
   "One box represents one orbital. A d subshell has five and an s subshell one. Ground-state chromium has one electron in each of these six orbitals."
  ],
  "learn": [
   "Reguła Hunda, spin i konfiguracja chromu.",
   "Hund’s rule, spin and chromium’s configuration."
  ]
 },
 {
  "s": "chemia",
  "id": "2",
  "page": 5,
  "key": 5,
  "title": [
   "Połącz obserwację z trwałością jonów w roztworze.",
   "Relate the observation to ion stability in solution."
  ],
  "points": 2,
  "modelAnswer": [
   "Probówka I. Żółty roztwór zmienił barwę na pomarańczową. Jony CrO₄²⁻ są trwałe w środowisku zasadowym, natomiast po zakwaszeniu przekształcają się w jony dichromianowe.",
   "Tube I. The yellow solution turned orange. Chromate ions are stable in alkaline solution and convert to dichromate on acidification."
  ],
  "prompt": [
   "W której probówce zmieniła się barwa i co to mówi o jonach chromianowych w kwasie i zasadzie?",
   "Which tube changed colour, and what does this show about chromate in acid and base?"
  ],
  "explanation": [
   "Żółta barwa odpowiada chromianom, pomarańczowa dichromianom. Dodanie kwasu przesuwa równowagę w stronę dichromianów. To tłumaczy zarówno obserwację, jak i wniosek o trwałości.",
   "Yellow corresponds to chromate and orange to dichromate. Acid shifts the equilibrium towards dichromate, explaining both the observation and the stability inference."
  ],
  "learn": [
   "Równowaga chemiczna, pH, obserwacja a wniosek.",
   "Chemical equilibrium, pH, observation versus inference."
  ]
 },
 {
  "s": "chemia",
  "id": "3",
  "page": 5,
  "key": 6,
  "title": [
   "Policz wiązania i wolne pary w cząsteczce Q₂.",
   "Count bonds and lone pairs in Q₂."
  ],
  "points": 1,
  "modelAnswer": [
   "N≡N ma jedno wiązanie σ, dwa wiązania π i dwie wolne pary elektronowe łącznie (po jednej na każdym N).",
   "N≡N contains one σ bond, two π bonds and two lone pairs in total (one on each N)."
  ],
  "prompt": [
   "Ile wiązań σ i π oraz wolnych par ma cząsteczka azotu N₂?",
   "How many σ bonds, π bonds and lone pairs does N₂ have?"
  ],
  "explanation": [
   "Dwa atomy azotu wnoszą łącznie dziesięć elektronów walencyjnych. Sześć tworzy wiązanie potrójne, a cztery pozostałe tworzą po jednej wolnej parze na atom.",
   "The two nitrogens contribute ten valence electrons in total. Six form a triple bond; the remaining four form one lone pair on each atom."
  ],
  "learn": [
   "Wzór Lewisa i skład wiązania potrójnego.",
   "Lewis structures and the components of a triple bond."
  ]
 },
 {
  "s": "chemia",
  "id": "4",
  "page": 6,
  "key": 7,
  "title": [
   "Wyznacz wzór związku z jego składu masowego.",
   "Determine a formula from mass composition."
  ],
  "points": 2,
  "modelAnswer": [
   "W 100 g związku stosunek molowy Ca:C:N = (50/40):(15/12):(35/14) = 1:1:2. Wzór: CaCN₂. Anion: [N=C=N]²⁻. Przy każdym końcowym N narysuj dwie wolne pary jako dwie kreski.",
   "In 100 g, the Ca:C:N mole ratio is (50/40):(15/12):(35/14) = 1:1:2. Formula: CaCN₂. Anion: [N=C=N]²⁻. Draw two lone-pair lines on each terminal N."
  ],
  "diagram": "  ─       ─\n[ N = C = N ]²⁻\n  ─       ─",
  "criterion": [
   "Pokaż stosunek molowy, wzór związku i wzór elektronowy anionu z parami wolnymi oraz ładunkiem.",
   "Show the mole ratio, compound formula and anion structure with lone pairs and charge."
  ],
  "prompt": [
   "Jak ze składu 50% Ca, 15% C i reszty N otrzymać wzór związku i narysować anion izoelektronowy z CO₂?",
   "How do 50% Ca, 15% C and the remainder N determine the compound and its CO₂-like anion?"
  ],
  "explanation": [
   "Wybierz 100 g próbki, aby procenty odczytać w gramach. Dziel masy przez masy molowe i skróć proporcje. Ładunek Ca²⁺ wymaga anionu 2−. Rozmieszczenie elektronów jak w CO₂ daje liniowy układ N=C=N.",
   "Choose a 100 g sample so percentages become grams. Divide by molar masses and simplify the ratio. Ca²⁺ requires a 2− anion. The CO₂-like electron arrangement gives linear N=C=N."
  ],
  "learn": [
   "Stosunek molowy, bilans ładunku i wolne pary.",
   "Mole ratios, charge balance and lone pairs."
  ]
 },
 {
  "s": "chemia",
  "id": "5",
  "page": 7,
  "key": 8,
  "title": [
   "Odczytaj zapis przemiany jądrowej.",
   "Interpret nuclear reaction notation."
  ],
  "points": 2,
  "modelAnswer": [
   "²³⁹₉₄Pu + ¹₀n → ¹⁴⁴₅₆Ba + ⁹⁴₃₈Sr + 2 ¹₀n. Jedno jądro Sr zawiera 94 − 38 = 56 neutronów. W molu: 56 × 6,02 × 10²³ = 3,37 × 10²⁵ neutronów.",
   "²³⁹₉₄Pu + ¹₀n → ¹⁴⁴₅₆Ba + ⁹⁴₃₈Sr + 2 ¹₀n. Each Sr nucleus contains 94 − 38 = 56 neutrons. One mole contains 56 × 6.02 × 10²³ = 3.37 × 10²⁵ neutrons."
  ],
  "prompt": [
   "Jak uzupełnić równanie rozszczepienia podane w zadaniu i policzyć neutrony w molu izotopu X?",
   "How do you complete the given nuclear equation and count neutrons in one mole of isotope X?"
  ],
  "explanation": [
   "Osobno zbilansuj liczby masowe i atomowe po obu stronach. Dla X różnica A − Z daje neutrony w jednym jądrze. Dopiero mnożenie przez stałą Avogadra daje wynik dla mola.",
   "Balance mass numbers and atomic numbers separately. For X, A − Z counts neutrons in one nucleus. Multiply by the Avogadro constant to obtain the count in a mole."
  ],
  "learn": [
   "Liczba masowa, atomowa i stała Avogadra.",
   "Mass number, atomic number and the Avogadro constant."
  ]
 },
 {
  "s": "chemia",
  "id": "6",
  "page": 7,
  "key": 9,
  "title": [
   "Rozpoznaj typ kryształu na podstawie właściwości.",
   "Infer crystal type from physical properties."
  ],
  "points": 1,
  "modelAnswer": [
   "A – kryształ molekularny. B – kryształ kowalencyjny (sieciowy).",
   "A – molecular crystal. B – covalent network crystal."
  ],
  "prompt": [
   "Jak na podstawie właściwości z tabeli rozpoznać typ kryształów A i B?",
   "How do the listed properties identify the crystal types of A and B?"
  ],
  "explanation": [
   "W krysztale molekularnym ogrzewanie pokonuje oddziaływania między cząsteczkami. W sieci kowalencyjnej atomy są połączone silnymi wiązaniami w całej strukturze, co zwykle wymaga znacznie więcej energii.",
   "Heating a molecular crystal overcomes attractions between molecules. In a covalent network, strong bonds extend through the solid, usually requiring much more energy to disrupt."
  ],
  "learn": [
   "Budowa sieci a właściwości fizyczne.",
   "Crystal structure and physical properties."
  ]
 },
 {
  "s": "chemia",
  "id": "7",
  "page": 8,
  "key": 9,
  "title": [
   "Zinterpretuj dane dotyczące szybkości hydrolizy.",
   "Interpret the hydrolysis rate data."
  ],
  "points": 1,
  "modelAnswer": [
   "Po 255 min ubytek stężenia A wynosi 0,10 − 0,04 = 0,06 mol/dm³. Z każdego mola A powstaje mol B i mol C, więc [B] + [C] = 2 × 0,06 = 0,12 mol/dm³.",
   "After 255 min the concentration of A has fallen by 0.10 − 0.04 = 0.06 mol/dm³. Each mole of A yields one mole each of B and C, so [B] + [C] = 0.12 mol/dm³."
  ],
  "prompt": [
   "Jakie jest łączne stężenie B i C po 255 min hydrolizy A → B + C?",
   "What is the combined concentration of B and C after 255 minutes of A → B + C?"
  ],
  "explanation": [
   "Wykres podaje stężenie pozostałego A. Od wartości początkowej odejmij wartość po 255 min. Każdy zużyty mol A daje po jednym molu obu produktów, dlatego ich suma jest dwukrotnością ubytku.",
   "The graph shows remaining A. Subtract the value at 255 minutes from the initial value. Each mole consumed produces one mole of each product, so their combined gain is twice that decrease."
  ],
  "learn": [
   "Odczyt wykresu, współczynniki i stężenie molowe.",
   "Reading graphs, coefficients and molarity."
  ]
 },
 {
  "s": "chemia",
  "id": "8",
  "page": 9,
  "key": 10,
  "title": [
   "Zinterpretuj obserwacje reakcji związku manganu.",
   "Interpret observations of a manganese reaction."
  ],
  "points": 3,
  "modelAnswer": [
   "Redukcja: MnO₄²⁻ + 2H₂O + 2e⁻ → MnO₂ + 4OH⁻. Utlenianie: SO₃²⁻ + 2OH⁻ → SO₄²⁻ + H₂O + 2e⁻. Suma cząsteczkowa: K₂MnO₄ + K₂SO₃ + H₂O → MnO₂ + K₂SO₄ + 2KOH.",
   "Reduction: MnO₄²⁻ + 2H₂O + 2e⁻ → MnO₂ + 4OH⁻. Oxidation: SO₃²⁻ + 2OH⁻ → SO₄²⁻ + H₂O + 2e⁻. Molecular equation: K₂MnO₄ + K₂SO₃ + H₂O → MnO₂ + K₂SO₄ + 2KOH."
  ],
  "criterion": [
   "Sprawdź osobno oba półrównania i równanie cząsteczkowe. W redukcji uwzględnij środowisko wskazane w poleceniu.",
   "Check both half-equations and the molecular equation separately. The reduction must match the stated medium."
  ],
  "prompt": [
   "Jak zapisać oba półrównania i pełne równanie reakcji manganianu z siarczynem?",
   "How do you write both half-equations and the overall manganate–sulfite equation?"
  ],
  "explanation": [
   "Mangan przechodzi z +VI na +IV i przyjmuje dwa elektrony. Siarka z +IV na +VI oddaje dwa. Zbilansuj tlen, wodór i ładunek, a po dodaniu półrównań skróć wspólne składniki.",
   "Manganese goes from +VI to +IV and gains two electrons. Sulfur goes from +IV to +VI and loses two. Balance O, H and charge, then add the halves and cancel common terms."
  ],
  "learn": [
   "Redukcja, utlenianie i bilans jonowo-elektronowy.",
   "Reduction, oxidation and half-equation balancing."
  ]
 },
 {
  "s": "chemia",
  "id": "9.1",
  "page": 10,
  "key": 11,
  "title": [
   "Powiąż potencjały półogniw z napięciem ogniwa.",
   "Relate half-cell potentials to cell voltage."
  ],
  "points": 4,
  "modelAnswer": [
   "Z wykresu E° = 0,342 V, więc metalem jest Cu. Ekat = 1,084 − 0,762 = 0,322 V. Z równania Nernsta log c = 2(0,322 − 0,342)/0,059, więc c = 0,210 mol/dm³. W 0,500 dm³ jest 0,105 mol Cu²⁺, czyli po 0,0525 mol każdego hydratu. Bilans mas w gramach: 22,05 = 0,0525(249,71 + 134,45 + 18,02x). Stąd x ≈ 2. Wzór: CuCl₂·2H₂O.",
   "The graph gives E° = 0.342 V, identifying Cu. E(cathode) = 1.084 − 0.762 = 0.322 V. Nernst gives log c = 2(0.322 − 0.342)/0.059, hence c = 0.210 mol/dm³. The 0.500 dm³ solution contains 0.105 mol Cu²⁺, hence 0.0525 mol of each hydrate. Mass balance in grams: 22.05 = 0.0525(249.71 + 134.45 + 18.02x). Thus x ≈ 2 and the formula is CuCl₂·2H₂O."
  ],
  "criterion": [
   "Wyprowadź stężenie z równania Nernsta i użyj bilansu mas obu hydratów. Zachowaj dokładność mas molowych wskazaną w zadaniu.",
   "Derive the concentration with the Nernst equation and use both hydrates in the mass balance. Use the molar-mass precision requested."
  ],
  "prompt": [
   "Jak z SEM 1,084 V, objętości 500 cm³ i masy 22,05 g równomolowej mieszaniny wyznaczyć wzór hydratu chlorku?",
   "How do a 1.084 V cell, 500 cm³ volume and 22.05 g equimolar mixture determine the chloride hydrate?"
  ],
  "explanation": [
   "Najpierw różnica potencjałów daje potencjał katody. Równanie Nernsta wiąże go ze stężeniem Cu²⁺. Objętość pozwala przejść do moli. Każda sól dostarcza tyle samo jonów Cu²⁺, więc liczba moli każdej to połowa sumy. Brakująca część masy przypada na wodę.",
   "Cell voltage gives cathode potential. The Nernst equation links that to copper concentration. Volume converts concentration to moles. Equal moles of the two salts each supply half the copper. The remaining mass determines the hydration water."
  ],
  "learn": [
   "SEM, równanie Nernsta, równomolowość i bilans mas hydratu.",
   "Cell voltage, Nernst equation, equimolar mixtures and hydrate mass balance."
  ]
 },
 {
  "s": "chemia",
  "id": "9.2",
  "page": 12,
  "key": 14,
  "title": [
   "Przeanalizuj ogniwo stężeniowe.",
   "Analyse a concentration cell."
  ],
  "points": 1,
  "modelAnswer": [
   "P, P. Niższe stężenie Ag⁺ oznacza niższy potencjał w zlewce 1. Tam srebro się utlenia. W zlewce 2 osadza się srebro, zwiększając masę blaszki.",
   "True, true (P, P). Lower Ag⁺ concentration gives beaker 1 the lower potential. Silver oxidises there. Silver deposits in beaker 2, increasing the electrode mass."
  ],
  "prompt": [
   "Czy rozcieńczone półogniwo srebrne jest anodą i czy blaszka w stężonym roztworze stanie się cięższa?",
   "Is the dilute silver half-cell the anode, and does the electrode in concentrated solution become heavier?"
  ],
  "explanation": [
   "Ogniwo działa w kierunku wyrównania stężeń. W rozcieńczonym roztworze utlenianie Ag wytwarza jony. W stężonym redukcja usuwa jony z roztworu przez osadzanie srebra.",
   "The cell operates towards equalising concentrations. Silver oxidation produces ions on the dilute side. Reduction removes ions from the concentrated side by depositing metal."
  ],
  "learn": [
   "Anoda, katoda i zmiana masy elektrod.",
   "Anode, cathode and electrode mass changes."
  ]
 },
 {
  "s": "chemia",
  "id": "10",
  "page": 12,
  "key": 14,
  "title": [
   "Zinterpretuj kolejne etapy doświadczenia z solą.",
   "Interpret the stages of the salt experiment."
  ],
  "points": 2,
  "modelAnswer": [
   "Probówka: AgNO₃. Pipeta: K₂CrO₄. Równanie jonowe skrócone: 2Ag⁺(aq) + CrO₄²⁻(aq) → Ag₂CrO₄(s).",
   "Tube: AgNO₃. Pipette: K₂CrO₄. Net ionic equation: 2Ag⁺(aq) + CrO₄²⁻(aq) → Ag₂CrO₄(s)."
  ],
  "prompt": [
   "Które sole znajdowały się w probówce i pipecie i jakie jest równanie jonowe strącania?",
   "Which salts were in the tube and pipette, and what is the net ionic precipitation equation?"
  ],
  "explanation": [
   "Odszukaj parę jonów tworzących osad chromianu srebra. Dwa Ag⁺ równoważą jeden CrO₄²⁻. Jony potasu i azotanowe pozostają w roztworze, więc pomija się je w równaniu skróconym.",
   "Identify the ions forming silver chromate. Two Ag⁺ balance one CrO₄²⁻. Potassium and nitrate stay dissolved and are omitted from the net ionic equation."
  ],
  "learn": [
   "Osad, jony obserwatorzy, bilans ładunku.",
   "Precipitates, spectator ions and charge balance."
  ]
 },
 {
  "s": "chemia",
  "id": "11.1",
  "page": 13,
  "key": 15,
  "title": [
   "Oblicz stężenie jonów z pomiarów osadu.",
   "Calculate ion concentration from precipitate measurements."
  ],
  "points": 2,
  "modelAnswer": [
   "n(Fe₂O₃) = 0,040/159,7 ≈ 0,000250 mol. Na jeden mol tlenku przypadają dwa mole Fe³⁺. Zatem c(Fe³⁺) = 2 × 0,000250 / 0,100 = 0,0050 mol/dm³.",
   "n(Fe₂O₃) = 0.040/159.7 ≈ 0.000250 mol. Each mole of oxide represents two moles of Fe³⁺. Thus c(Fe³⁺) = 2 × 0.000250 / 0.100 = 0.0050 mol/dm³."
  ],
  "prompt": [
   "Jak obliczyć stężenie Fe³⁺ w 100 cm³ próbki, skoro otrzymano 0,040 g Fe₂O₃?",
   "How does 0.040 g of Fe₂O₃ determine the Fe³⁺ concentration in a 100 cm³ sample?"
  ],
  "explanation": [
   "Przelicz gramy tlenku na mole. Indeks 2 przy Fe podwaja liczbę moli żelaza względem moli tlenku. Podziel liczbę moli żelaza przez objętość próbki w dm³.",
   "Convert oxide mass to moles. The subscript 2 doubles the amount of iron relative to oxide. Divide iron moles by sample volume in dm³."
  ],
  "learn": [
   "Masa molowa, stechiometria Fe₂O₃ i przeliczanie objętości.",
   "Molar mass, oxide stoichiometry and volume conversion."
  ]
 },
 {
  "s": "chemia",
  "id": "11.2",
  "page": 13,
  "key": 16,
  "title": [
   "Wybierz metodę wyodrębnienia osadu.",
   "Select a method for isolating the precipitate."
  ],
  "points": 1,
  "modelAnswer": [
   "C – sączenie. Osad pozostaje na sączku.",
   "C – filtration. The solid is retained on the filter."
  ],
  "prompt": [
   "Jak ilościowo oddzielić osad uwodnionego tlenku od cieczy?",
   "How can the hydrated oxide precipitate be quantitatively separated from the liquid?"
  ],
  "explanation": [
   "Ciecz przechodzi przez filtr, a cząstki osadu zostają zatrzymane. Samo zlanie cieczy mogłoby zabrać część drobnych cząstek.",
   "Liquid passes through the filter while solid particles remain. Simply pouring off the liquid could carry away fine particles."
  ],
  "learn": [
   "Sączenie, przesącz i osad.",
   "Filtration, filtrate and precipitate."
  ]
 },
 {
  "s": "chemia",
  "id": "12",
  "page": 14,
  "key": 16,
  "title": [
   "Porównaj barwy wskaźników pH.",
   "Compare pH indicator colours."
  ],
  "points": 3,
  "modelAnswer": [
   "Od lewej: NaCl – C, B (zielona, czerwona). NaOH – C, A (niebieska, malinowa). HCl – B, C (fioletowa, żółta). Każda para liter dotyczy kolejnych dwóch probówek.",
   "Left to right: NaCl – C, B (green, red). NaOH – C, A (blue, pink). HCl – B, C (purple, yellow). Each letter pair labels two consecutive tubes."
  ],
  "prompt": [
   "Których wskaźników użyto i które pary probówek zawierały NaCl, NaOH i HCl?",
   "Which indicators were used, and which tube pairs contained NaCl, NaOH and HCl?"
  ],
  "explanation": [
   "Błękit bromotymolowy daje trzy charakterystyczne kolory: żółty w kwasie, zielony przy odczynie obojętnym i niebieski w zasadzie. Malinowa fenoloftaleina rozpoznaje zasadę. Pozostałe barwy przypisz czerwieni Kongo.",
   "Bromothymol blue is yellow in acid, green near neutral and blue in base. Pink phenolphthalein identifies base. Assign the remaining colours to Congo red."
  ],
  "learn": [
   "Barwy trzech wskaźników i odczyn roztworów.",
   "Indicator colours and acidic, neutral and alkaline solutions."
  ]
 },
 {
  "s": "chemia",
  "id": "13",
  "page": 14,
  "key": 17,
  "title": [
   "Przeanalizuj równowagę jonów węglanowych w wodzie.",
   "Analyse carbonate equilibrium in water."
  ],
  "points": 2,
  "modelAnswer": [
   "Kᵦ = 10⁻¹⁴/(4,68 × 10⁻¹¹) = 2,14 × 10⁻⁴. Dla x = [OH⁻] mamy x²/(0,100 − x) = Kᵦ. Dodatni pierwiastek: x ≈ 0,00452 mol/dm³. pOH = 2,34, więc pH = 14 − 2,34 ≈ 11,7.",
   "Kᵦ = 10⁻¹⁴/(4.68 × 10⁻¹¹) = 2.14 × 10⁻⁴. Set x = [OH⁻], giving x²/(0.100 − x) = Kᵦ. The positive root is about 0.00452 mol/dm³. pOH = 2.34, hence pH = 14 − 2.34 ≈ 11.7."
  ],
  "prompt": [
   "Jak obliczyć pH roztworu węglanu o stężeniu 0,100 mol/dm³?",
   "How do you calculate the pH of 0.100 mol/dm³ carbonate?"
  ],
  "explanation": [
   "Węglan przyjmuje proton od wody i powstaje OH⁻. Dla sprzężonego HCO₃⁻ wybierz drugą stałą kwasową. Oblicz Kᵦ, rozwiąż równanie na [OH⁻], a potem przejdź od pOH do pH.",
   "Carbonate accepts a proton from water, producing OH⁻. Use the second acid constant for conjugate HCO₃⁻. Calculate Kᵦ, solve for hydroxide, then convert pOH to pH."
  ],
  "learn": [
   "Sprzężona para, Ka × Kb = Kw, logarytm stężenia.",
   "Conjugate pairs, Ka × Kb = Kw and concentration logarithms."
  ]
 },
 {
  "s": "chemia",
  "id": "14",
  "page": 16,
  "key": 19,
  "title": [
   "Rozpoznaj związki na podstawie wzorów strukturalnych.",
   "Identify compounds from structural formulas."
  ],
  "points": 1,
  "modelAnswer": [
   "Produkt reformingu – 3. Antydetonator – 1.",
   "Reforming product – 3. Anti-knock agent – 1."
  ],
  "prompt": [
   "Który wzór przedstawia produkt reformingu, a który dodatek przeciwstukowy?",
   "Which structure represents a reforming product and which an anti-knock additive?"
  ],
  "explanation": [
   "Porównaj szkielet węglowy i obecność tlenu. Reforming zmienia budowę węglowodorów. Tlen w połączeniu C–O–C pozwala rozpoznać eter stosowany jako dodatek do paliwa.",
   "Compare the carbon skeletons and look for oxygen. Reforming changes hydrocarbon structures. A C–O–C linkage identifies the ether used as a fuel additive."
  ],
  "learn": [
   "Reforming, węglowodory i grupa eterowa.",
   "Reforming, hydrocarbons and ether groups."
  ]
 },
 {
  "s": "chemia",
  "id": "15.1",
  "page": 16,
  "key": 19,
  "title": [
   "Wyznacz indeks niedoboru wodoru.",
   "Determine the degree of unsaturation."
  ],
  "points": 1,
  "modelAnswer": [
   "Cykloheksan: 1 (jeden pierścień). Heks-1-en: 1 (jedno wiązanie podwójne).",
   "Cyclohexane: 1 (one ring). Hex-1-ene: 1 (one double bond)."
  ],
  "prompt": [
   "Jaki indeks niedoboru wodoru mają cykloheksan i heks-1-en?",
   "What is the degree of unsaturation of cyclohexane and hex-1-ene?"
  ],
  "explanation": [
   "Jeden pierścień lub jedno wiązanie podwójne oznacza o dwa wodory mniej niż w nasyconym, otwartym łańcuchu. Dlatego różne budowy mogą dać ten sam indeks.",
   "One ring or one double bond means two fewer hydrogens than in a saturated open chain. Different structures can therefore have the same index."
  ],
  "learn": [
   "Pierścienie, wiązania π i indeks niedoboru wodoru.",
   "Rings, π bonds and degree of unsaturation."
  ]
 },
 {
  "s": "chemia",
  "id": "15.2",
  "page": 17,
  "key": 20,
  "title": [
   "Porównaj budowę izomerycznych węglowodorów.",
   "Compare isomeric hydrocarbon structures."
  ],
  "points": 2,
  "modelAnswer": [
   "A: cyklo-[CH=CH–(CH₂)₄] + H₂ → cyklo-[(CH₂)₆] (Pt). Zamknij oba wzory w sześcioczłonowy pierścień. B: CH₃–CH=CH–CH=CH–CH₃.",
   "A: cyclic [CH=CH–(CH₂)₄] + H₂ → cyclic [(CH₂)₆] (Pt). Draw both structures as six-membered rings. B: CH₃–CH=CH–CH=CH–CH₃."
  ],
  "diagram": "    CH═CH                    CH₂─CH₂\n   /     \\                  /       \\\n CH₂     CH₂  + H₂  ─Pt→  CH₂       CH₂\n   \\     /                  \\       /\n    CH₂─CH₂                   CH₂─CH₂",
  "prompt": [
   "Jak zapisać uwodornienie A i wzór dienu B, gdy B zużywa dwa razy więcej H₂?",
   "How do you represent hydrogenation of A and identify diene B if B consumes twice as much H₂?"
  ],
  "explanation": [
   "W A jeden stopień nienasycenia przypada na pierścień, drugi na C=C. Uwodornienie usuwa tylko C=C. W B oba przypadają na wiązania podwójne, a wzór fragmentu polimeru ustala ich rozmieszczenie.",
   "In A one degree comes from the ring and one from C=C. Hydrogenation removes only C=C. In B both degrees are double bonds; the polymer fragment fixes their positions."
  ],
  "learn": [
   "Uwodornienie, dien sprzężony i wzór jednostki polimeru.",
   "Hydrogenation, conjugated dienes and polymer repeat units."
  ]
 },
 {
  "s": "chemia",
  "id": "16.1",
  "page": 18,
  "key": 20,
  "title": [
   "Dobierz strukturę aldehydu do warunków reakcji.",
   "Match an aldehyde structure to the reaction conditions."
  ],
  "points": 1,
  "modelAnswer": [
   "CH₃–C(CH₃)₂–CH₂–CHO. Węgiel sąsiadujący z grupą aldehydową ma atomy wodoru.",
   "CH₃–C(CH₃)₂–CH₂–CHO. The carbon adjacent to the aldehyde group bears hydrogen atoms."
  ],
  "prompt": [
   "Który dimetylobutanal nie ulega opisanej reakcji z KOH?",
   "Which dimethylbutanal does not undergo the stated KOH reaction?"
  ],
  "explanation": [
   "Sprawdź, czy węgiel bezpośrednio obok –CHO ma wodór. Podany izomer ma tam grupę –CH₂– i nie spełnia warunku dla opisanej dysproporcjonacji aldehydu.",
   "Inspect the carbon directly next to –CHO for hydrogen. The example has –CH₂– there and does not meet the condition for the stated aldehyde disproportionation."
  ],
  "learn": [
   "Wodór α i budowa aldehydu.",
   "Alpha hydrogen and aldehyde structure."
  ]
 },
 {
  "s": "chemia",
  "id": "16.2",
  "page": 18,
  "key": 21,
  "title": [
   "Prześledź przemianę mieszaniny aldehydów.",
   "Trace the reaction of an aldehyde mixture."
  ],
  "points": 1,
  "modelAnswer": [
   "C₆H₅–CHO + HCHO + OH⁻ → C₆H₅–CH₂OH + HCOO⁻. Metanal ulega utlenieniu, a benzaldehyd redukcji.",
   "C₆H₅–CHO + HCHO + OH⁻ → C₆H₅–CH₂OH + HCOO⁻. Methanal is oxidised and benzaldehyde is reduced."
  ],
  "prompt": [
   "Jakie równanie opisuje reakcję benzaldehydu z metanalem w zasadzie?",
   "What equation describes benzaldehyde reacting with methanal in base?"
  ],
  "explanation": [
   "Śledź osobno atomy węgla obu grup aldehydowych. Jeden aldehyd zostaje zredukowany do alkoholu, a drugi utleniony do anionu kwasu. Środowisko zasadowe wyjaśnia obecność HCOO⁻.",
   "Track the two aldehyde carbons separately. One aldehyde is reduced to an alcohol and the other oxidised to a carboxylate. The basic medium explains HCOO⁻."
  ],
  "learn": [
   "Utlenianie aldehydu, redukcja i zapis jonowy.",
   "Aldehyde oxidation, reduction and ionic equations."
  ]
 },
 {
  "s": "chemia",
  "id": "17",
  "page": 19,
  "key": 21,
  "title": [
   "Rozpoznaj przemianę ketonu w reakcji haloformowej.",
   "Identify the ketone transformation in a haloform reaction."
  ],
  "points": 1,
  "modelAnswer": [
   "CH₃–C(=O)–CH=C(CH₃)₂. Fragment R grupy R–CO–CH₃ musi być taki sam jak fragment R w produkcie R–COOH.",
   "CH₃–C(=O)–CH=C(CH₃)₂. The R group in R–CO–CH₃ must match R in the product R–COOH."
  ],
  "prompt": [
   "Który keton odpowiada kwasowi 3-metylobut-2-enowemu w podanej przemianie?",
   "Which ketone corresponds to 3-methylbut-2-enoic acid in the stated transformation?"
  ],
  "explanation": [
   "Rozpisz produkt jako R–COOH. Zachowaj fragment R z jego wiązaniem podwójnym i zastąp końcówkę kwasową fragmentem –CO–CH₃, aby odtworzyć metyloketon.",
   "Write the product as R–COOH. Keep R and its double bond, replacing the acid ending with –CO–CH₃ to reconstruct the methyl ketone."
  ],
  "learn": [
   "Identyfikacja grupy funkcyjnej i zachowanie szkieletu węglowego.",
   "Identifying functional groups and tracking the carbon skeleton."
  ]
 },
 {
  "s": "chemia",
  "id": "18.1",
  "page": 20,
  "key": 22,
  "title": [
   "Wywnioskuj strukturę kwasu z produktu reakcji.",
   "Infer the acid structure from the reaction product."
  ],
  "points": 1,
  "modelAnswer": [
   "CH₃–CH₂–COOH. Po odłączeniu grupy karboksylowej pozostają fragmenty dwuwęglowe. Połączenie dwóch takich fragmentów daje butan.",
   "CH₃–CH₂–COOH. Loss of the carboxyl group leaves two-carbon fragments. Two of them join to form butane."
  ],
  "prompt": [
   "Który kwas daje w opisanej reakcji alkan czterowęglowy?",
   "Which acid gives a four-carbon alkane in the stated reaction?"
  ],
  "explanation": [
   "Produkt składa się z dwóch jednakowych fragmentów, więc każdy ma dwa węgle. Przed odłączeniem CO₂ każdy miał jeszcze węgiel karboksylowy. Kwas ma zatem trzy węgle.",
   "The product joins two identical fragments, so each has two carbons. Before CO₂ loss each also had a carboxyl carbon. The acid therefore contains three carbons."
  ],
  "learn": [
   "Dekarboksylacja i liczenie atomów węgla.",
   "Decarboxylation and carbon counting."
  ]
 },
 {
  "s": "chemia",
  "id": "18.2",
  "page": 21,
  "key": 22,
  "title": [
   "Porównaj izomery o wzorze C₈H₁₈.",
   "Compare isomers with formula C₈H₁₈."
  ],
  "points": 1,
  "modelAnswer": [
   "C. Związek III można otrzymać przez połączenie dwóch identycznych fragmentów węglowych.",
   "C. Compound III can be obtained by joining two identical carbon fragments."
  ],
  "prompt": [
   "Który z czterech izomerów C₈H₁₈ najłatwiej otrzymać przez łączenie jednakowych fragmentów?",
   "Which C₈H₁₈ isomer is best obtained by joining identical fragments?"
  ],
  "explanation": [
   "Poszukaj wiązania, którego przecięcie daje dwie identyczne części, także pod względem rozgałęzienia. Wzór III spełnia ten warunek i nie wymaga łączenia dwóch różnych rodników.",
   "Find a bond whose cleavage gives two identical fragments, including their branching. Structure III satisfies this condition without requiring two different radicals."
  ],
  "learn": [
   "Symetria szkieletu i rozpoznawanie równoważnych fragmentów.",
   "Carbon skeleton symmetry and equivalent fragments."
  ]
 },
 {
  "s": "chemia",
  "id": "19.1",
  "page": 22,
  "key": 23,
  "title": [
   "Dobierz substrat do reakcji Hecka.",
   "Select the reactant for a Heck reaction."
  ],
  "points": 1,
  "modelAnswer": [
   "B.",
   "B."
  ],
  "prompt": [
   "Który substrat z arkusza prowadzi do związku Q w reakcji Hecka?",
   "Which reactant in the paper gives compound Q in the Heck reaction?"
  ],
  "explanation": [
   "Prześledź w produkcie miejsce, gdzie fragment alkenowy łączy się z pierścieniem. W substracie właśnie ten węgiel pierścienia powinien być związany z bromem; zachowaj położenie pozostałego podstawnika.",
   "Trace the point where the alkene fragment joins the ring in Q. In the reactant this ring carbon must bear bromine; keep the other substituent in its original position."
  ],
  "learn": [
   "Mapowanie atomów i położenie podstawników pierścienia.",
   "Atom mapping and ring substitution patterns."
  ]
 },
 {
  "s": "chemia",
  "id": "19.2",
  "page": 23,
  "key": 23,
  "title": [
   "Określ stopień utlenienia i hybrydyzację atomów węgla.",
   "Determine carbon oxidation states and hybridisation."
  ],
  "points": 2,
  "modelAnswer": [
   "Atom a: −I, sp². Atom b: 0, sp².",
   "Atom a: −I, sp². Atom b: 0, sp²."
  ],
  "prompt": [
   "Jakie stopnie utlenienia i hybrydyzację mają atomy a i b?",
   "What oxidation states and hybridisations do atoms a and b have?"
  ],
  "explanation": [
   "Przypisz elektrony wiązań bardziej elektroujemnemu atomowi, a w C–C podziel je po równo. Hybrydyzację ustal osobno: węgiel z trzema kierunkami wiązań σ i orbitalem p ma hybrydyzację sp².",
   "Assign bond electrons to the more electronegative atom, splitting C–C bonds equally. Determine hybridisation separately: three σ-bond directions and one p orbital imply sp²."
  ],
  "learn": [
   "Elektroujemność, formalny stopień utlenienia i geometria sp².",
   "Electronegativity, oxidation state and sp² geometry."
  ]
 },
 {
  "s": "chemia",
  "id": "20",
  "page": 23,
  "key": 24,
  "title": [
   "Oblicz wydajność reakcji z podanych mas.",
   "Calculate reaction yield from the given masses."
  ],
  "points": 3,
  "modelAnswer": [
   "n(C₆H₅Br) = 0,1570/157,0 = 0,00100 mol. n(C₃H₄O₂) = 0,1081/72,0 ≈ 0,00150 mol. Reagują 1:1, więc kwas propenowy jest w nadmiarze. Masa teoretyczna = 0,00100 × 148 = 0,148 g. Wydajność = (0,1245/0,148) × 100% = 84,1%.",
   "n(C₆H₅Br) = 0.1570/157.0 = 0.00100 mol. n(C₃H₄O₂) = 0.1081/72.0 ≈ 0.00150 mol. The ratio is 1:1, so propenoic acid is in excess. Theoretical mass = 0.00100 × 148 = 0.148 g. Yield = (0.1245/0.148) × 100% = 84.1%."
  ],
  "criterion": [
   "Wykaż obliczeniami, który substrat jest w nadmiarze. Oblicz masę teoretyczną z ilości substratu ograniczającego, następnie wydajność.",
   "Use the mole amounts to identify the excess reactant. Calculate theoretical mass from the limiting reactant, then percentage yield."
  ],
  "prompt": [
   "Jaka jest wydajność reakcji 0,1570 g bromobenzenu z 0,1081 g kwasu propenowego, jeśli powstało 0,1245 g produktu? Który substrat jest w nadmiarze?",
   "What is the yield from 0.1570 g bromobenzene and 0.1081 g propenoic acid if 0.1245 g product forms? Which reactant is in excess?"
  ],
  "explanation": [
   "Przelicz obie masy na mole, bo substraty reagują w stosunku molowym 1:1. Mniejsza liczba moli wyznacza teoretyczny pułap produktu. Porównaj masę rzeczywistą z tym pułapem.",
   "Convert both masses to moles because the reaction ratio is 1:1 in moles. The smaller amount limits the theoretical product. Compare the actual mass with that maximum."
  ],
  "learn": [
   "Substrat ograniczający, nadmiar i wydajność procentowa.",
   "Limiting reactant, excess and percentage yield."
  ]
 },
 {
  "s": "chemia",
  "id": "21",
  "page": 24,
  "key": 26,
  "title": [
   "Porównaj cechy kwasu cynamonowego i kawowego.",
   "Compare cinnamic acid and caffeic acid."
  ],
  "points": 1,
  "modelAnswer": [
   "F, P. Obie cząsteczki są achiralne. Przy każdym atomie węgla wiązania C=C są dwa różne podstawniki, więc możliwa jest izomeria geometryczna.",
   "False, true (F, P). Both molecules are achiral. Each carbon in the C=C bond bears two different groups, permitting geometric isomerism."
  ],
  "prompt": [
   "Czy kwasy cynamonowy i kawowy są chiralne i czy mają izomery geometryczne?",
   "Are cinnamic and caffeic acids chiral, and do they have geometric isomers?"
  ],
  "explanation": [
   "Chiralność dotyczy nakładania się cząsteczki na jej odbicie lustrzane. Izomeria E/Z wynika z ograniczonego obrotu wokół C=C z różnymi podstawnikami na każdym węglu. To dwa odrębne kryteria.",
   "Chirality concerns whether a molecule superimposes on its mirror image. E/Z isomerism arises from restricted rotation at C=C with different substituents on each carbon. These are separate criteria."
  ],
  "learn": [
   "Chiralność a izomeria E/Z.",
   "Chirality versus E/Z isomerism."
  ]
 },
 {
  "s": "chemia",
  "id": "22",
  "page": 24,
  "key": 26,
  "title": [
   "Dobierz odczynnik pozwalający rozróżnić oba kwasy.",
   "Choose a reagent to distinguish the two acids."
  ],
  "points": 1,
  "modelAnswer": [
   "FeCl₃(aq). Fenolowe grupy –OH kwasu kawowego umożliwiają powstanie barwnego kompleksu z jonami Fe³⁺. Kwas cynamonowy nie ma tych grup i nie daje takiego zabarwienia.",
   "FeCl₃(aq). The phenolic –OH groups of caffeic acid form a coloured complex with Fe³⁺. Cinnamic acid lacks these groups and does not give that colour."
  ],
  "prompt": [
   "Który odczynnik odróżni kwas kawowy od cynamonowego i skąd weźmie się różnica barwy?",
   "Which reagent distinguishes caffeic from cinnamic acid and why do the colours differ?"
  ],
  "explanation": [
   "Zwróć uwagę na grupy hydroksylowe przy pierścieniu kwasu kawowego. Mogą tworzyć barwny kompleks z Fe³⁺. Wspólne dla obu kwasów wiązanie C=C nie pozwala ich tak rozróżnić.",
   "Look for hydroxyl groups on the caffeic acid ring. They can form a coloured complex with Fe³⁺. The double bond shared by both acids does not distinguish them here."
  ],
  "learn": [
   "Grupy fenolowe i kompleksowanie jonów żelaza(III).",
   "Phenolic groups and iron(III) complex formation."
  ]
 },
 {
  "s": "chemia",
  "id": "23.1",
  "page": 25,
  "key": 27,
  "title": [
   "Rozpoznaj chiralne izomery związku X.",
   "Identify chiral isomers of compound X."
  ],
  "points": 3,
  "modelAnswer": [
   "X: HO–CH₂–CH₂–CH₂–COOH. Izomer: CH₃–CH(OH)–CH₂–COOH. Równanie: CH₃–CH(OH)–CH₂–COOH + NaOH → CH₃–CH(OH)–CH₂–COONa + H₂O.",
   "X: HO–CH₂–CH₂–CH₂–COOH. Isomer: CH₃–CH(OH)–CH₂–COOH. Equation: CH₃–CH(OH)–CH₂–COOH + NaOH → CH₃–CH(OH)–CH₂–COONa + H₂O."
  ],
  "prompt": [
   "Jakie są wzory X i jego opisanego chiralnego izomeru i jak ten izomer reaguje z NaOH?",
   "What are the formulas of X and its specified chiral isomer, and how does the isomer react with NaOH?"
  ],
  "explanation": [
   "Zachowaj prosty łańcuch i grupę karboksylową. Przeniesienie –OH na wskazaną pozycję daje węgiel z czterema różnymi podstawnikami. Zasada zobojętnia –COOH, pozostawiając alkoholowe –OH.",
   "Keep the straight chain and carboxyl group. Moving –OH to the specified position creates a carbon with four different substituents. Base neutralises –COOH while the alcoholic –OH remains."
  ],
  "learn": [
   "Izomeria położenia, centrum chiralne i zobojętnianie.",
   "Positional isomers, chiral centres and neutralisation."
  ]
 },
 {
  "s": "chemia",
  "id": "23.2",
  "page": 25,
  "key": 28,
  "title": [
   "Przedstaw produkt odwodnienia kwasu bursztynowego.",
   "Represent the product of succinic acid dehydration."
  ],
  "points": 1,
  "modelAnswer": [
   "Bezwodnik bursztynowy. Wzór cykliczny: [–C(=O)–CH₂–CH₂–C(=O)–O–]. Ostatni atom O połącz z pierwszym węglem karbonylowym, zamykając pięcioczłonowy pierścień.",
   "Succinic anhydride. Cyclic structure: [–C(=O)–CH₂–CH₂–C(=O)–O–]. Join the last oxygen to the first carbonyl carbon to close the five-membered ring."
  ],
  "diagram": "       O\n     /   \\\n O=C       C=O\n    \\     /\n    CH₂—CH₂",
  "prompt": [
   "Jaki związek tworzy kwas bursztynowy, gdy jedna cząsteczka traci jedną H₂O?",
   "What forms when one succinic acid molecule loses one water molecule?"
  ],
  "explanation": [
   "Dwie końcowe grupy karboksylowe tej samej cząsteczki tworzą bezwodnik. Po utracie wody między węglami karbonylowymi pozostaje mostek tlenowy zamykający pierścień.",
   "The two terminal carboxyl groups of one molecule form an anhydride. After water loss an oxygen bridge between the carbonyl carbons closes the ring."
  ],
  "learn": [
   "Bezwodnik kwasowy, odwodnienie i zamykanie pierścienia.",
   "Acid anhydrides, dehydration and ring closure."
  ]
 },
 {
  "s": "chemia",
  "id": "24",
  "page": 26,
  "key": 28,
  "title": [
   "Prześledź kolejność podstawień w pierścieniu benzenu.",
   "Trace the order of substitutions on a benzene ring."
  ],
  "points": 1,
  "modelAnswer": [
   "Projekt 2. Obecna już w pierścieniu grupa –NO₂ kieruje kolejny podstawnik w położenie meta, co daje wymagane wzajemne położenie grup po redukcji.",
   "Plan 2. The nitro group already on the ring directs the next substituent to the meta position, giving the required relative positions after reduction."
  ],
  "prompt": [
   "Która kolejność podstawień prowadzi do wymaganego położenia chloru i grupy aminowej?",
   "Which substitution order gives the required positions of chlorine and the amino group?"
  ],
  "explanation": [
   "Pierwszy podstawnik wpływa na położenie następnego. Grupa nitrowa kieruje w położenie meta. Jej późniejsza redukcja do –NH₂ zachowuje pozycję na pierścieniu.",
   "The first substituent directs the next. A nitro group directs meta. Subsequent reduction to –NH₂ retains its position on the ring."
  ],
  "learn": [
   "Kierowanie podstawieniem i redukcja grupy nitrowej.",
   "Substituent directing effects and nitro-group reduction."
  ]
 },
 {
  "s": "chemia",
  "id": "25.1",
  "page": 27,
  "key": 29,
  "title": [
   "Wyjaśnij rozpuszczanie benzokainy po dodaniu kwasu.",
   "Explain why benzocaine dissolves on addition of acid."
  ],
  "points": 1,
  "modelAnswer": [
   "Grupa aminowa benzokainy przyłącza proton z HCl. Powstaje sól jonowa, która rozpuszcza się w wodzie, dlatego roztwór staje się klarowny.",
   "The amino group of benzocaine accepts a proton from HCl. The resulting ionic salt dissolves in water, producing a clear solution."
  ],
  "criterion": [
   "Uwzględnij reakcję z kwasem, powstanie soli i rozpuszczalność produktu w wodzie.",
   "Include the reaction with acid, formation of a salt and the product’s solubility in water."
  ],
  "prompt": [
   "Dlaczego po dodaniu HCl do benzokainy powstaje klarowny roztwór?",
   "Why does adding HCl to benzocaine give a clear solution?"
  ],
  "explanation": [
   "Wolna para azotu wiąże proton. Powstający kation wraz z chlorkiem tworzy sól. Woda stabilizuje jony, więc produkt rozpuszcza się i znika zawiesina.",
   "The nitrogen lone pair accepts a proton. The resulting cation and chloride form a salt. Water stabilises these ions, allowing the product to dissolve and the suspension to clear."
  ],
  "learn": [
   "Protonowanie aminy, sól i rozpuszczalność.",
   "Amine protonation, salts and solubility."
  ]
 },
 {
  "s": "chemia",
  "id": "25.2",
  "page": 27,
  "key": 30,
  "title": [
   "Zapisz równanie hydrolizy zasadowej benzokainy.",
   "Write the equation for alkaline hydrolysis of benzocaine."
  ],
  "points": 1,
  "modelAnswer": [
   "p-H₂N–C₆H₄–C(=O)OCH₂CH₃ + OH⁻ → p-H₂N–C₆H₄–COO⁻ + CH₃CH₂OH. Symbol p oznacza położenie 1,4 na pierścieniu.",
   "p-H₂N–C₆H₄–C(=O)OCH₂CH₃ + OH⁻ → p-H₂N–C₆H₄–COO⁻ + CH₃CH₂OH. The p prefix indicates a 1,4 arrangement on the ring."
  ],
  "prompt": [
   "Jak wygląda jonowe równanie zasadowej hydrolizy benzokainy?",
   "What is the net ionic equation for alkaline hydrolysis of benzocaine?"
  ],
  "explanation": [
   "Odszukaj wiązanie estrowe. Fragment z pierścieniem daje karboksylan, a fragment etylowy alkohol. Grupa aminowa przy pierścieniu pozostaje w tym zapisie bez zmian.",
   "Locate the ester linkage. The ring-containing fragment forms a carboxylate and the ethyl fragment forms an alcohol. The ring amino group is retained."
  ],
  "learn": [
   "Ester, hydroliza zasadowa, bilans atomów i ładunków.",
   "Esters, alkaline hydrolysis and atom and charge balance."
  ]
 },
 {
  "s": "chemia",
  "id": "25.3",
  "page": 27,
  "key": 30,
  "title": [
   "Rozpoznaj mechanizm bromowania pierścienia aromatycznego.",
   "Identify the mechanism of aromatic ring bromination."
  ],
  "points": 1,
  "modelAnswer": [
   "B1 – substytucja elektrofilowa.",
   "B1 – electrophilic substitution."
  ],
  "prompt": [
   "Jak sklasyfikować bromowanie aromatycznego pierścienia benzokainy w obecności FeBr₃?",
   "How is bromination of benzocaine’s aromatic ring with FeBr₃ classified?"
  ],
  "explanation": [
   "Atom bromu zastępuje wodór przy pierścieniu. Oddziałuje z bogatym w elektrony układem aromatycznym jako elektrofil, a pierścień odzyskuje aromatyczność.",
   "Bromine replaces a ring hydrogen. An electrophile reacts with the electron-rich aromatic system and aromaticity is restored."
  ],
  "learn": [
   "Substytucja elektrofilowa aromatyczna.",
   "Electrophilic aromatic substitution."
  ]
 },
 {
  "s": "chemia",
  "id": "26",
  "page": 28,
  "key": 31,
  "title": [
   "Ustal sekwencję tripeptydu na podstawie wskazówek.",
   "Determine the tripeptide sequence from the clues."
  ],
  "points": 1,
  "modelAnswer": [
   "Gly–Ala–Cys. Glicyna jest achiralna i najlżejsza, więc zajmuje koniec aminowy. Cysteina dostarcza grupę –SH. Po uwzględnieniu utraty dwóch H₂O masa środkowego aminokwasu wynosi 249 + 36 − 75 − 121 = 89 g/mol, czyli jest to alanina.",
   "Gly–Ala–Cys. Glycine is achiral and lightest, placing it at the amino terminus. Cysteine supplies –SH. Accounting for two lost water molecules gives a middle amino acid of 249 + 36 − 75 − 121 = 89 g/mol: alanine."
  ],
  "prompt": [
   "Jaka jest sekwencja tripeptydu o masie molowej 249 g/mol, jednej grupie –SH i achiralnej reszcie?",
   "What is the sequence of the 249 g/mol tripeptide with one –SH group and an achiral residue?"
  ],
  "explanation": [
   "Achiralność wskazuje glicynę, a siarkowa grupa –SH cysteinę. Tworząc dwa wiązania peptydowe, trzy aminokwasy tracą dwie cząsteczki wody. Dodaj ich masę z powrotem, aby wyznaczyć masę trzeciego aminokwasu. Wskazówki o końcach ustalają kolejność.",
   "Achirality identifies glycine and –SH identifies cysteine. Forming two peptide bonds removes two waters. Add that mass back to determine the third amino acid. The terminal-group clues fix the order."
  ],
  "learn": [
   "Kody aminokwasów, kondensacja i zapis od końca N do C.",
   "Amino acid codes, condensation and N-to-C notation."
  ]
 },
 {
  "s": "chemia",
  "id": "27",
  "page": 28,
  "key": 31,
  "title": [
   "Narysuj stereoizomery w projekcji Fischera.",
   "Draw stereoisomers in Fischer projection."
  ],
  "points": 2,
  "modelAnswer": [
   "W obu projekcjach Fischera wpisz CH₂OH u góry i u dołu. Erytrol: na obu poziomych ramionach OH po prawej, H po lewej. L-treitol: na górnym skrzyżowaniu OH po prawej, na dolnym OH po lewej. Pozostałe miejsca zajmuje H.",
   "Put CH₂OH at both ends of each Fischer projection. Erythritol: OH on the right at both intersections, H on the left. L-threitol: OH on the right at the upper intersection and on the left at the lower intersection. Fill the opposite positions with H."
  ],
  "diagram": "       CH₂OH          CH₂OH\n         │              │\n     H ─ C ─ OH     H ─ C ─ OH\n         │              │\n     H ─ C ─ OH    HO ─ C ─ H\n         │              │\n       CH₂OH          CH₂OH",
  "prompt": [
   "Jak narysować erytrol i L-treitol w projekcji Fischera?",
   "How do you draw erythritol and L-threitol in Fischer projection?"
  ],
  "explanation": [
   "Ustaw identyczne grupy CH₂OH na końcach osi pionowej. Erytrol jest formą mezo z symetrią wewnętrzną. W L-treitolu grupy OH są po przeciwnych stronach, a dolna OH leży po lewej.",
   "Place identical CH₂OH groups at the ends of the vertical axis. Erythritol is internally symmetric and meso. L-threitol has hydroxyls on opposite sides with the lower OH on the left."
  ],
  "learn": [
   "Projekcja Fischera, forma mezo i konfiguracja L.",
   "Fischer projections, meso compounds and the L configuration."
  ]
 },
 {
  "s": "chemia",
  "id": "28",
  "page": 29,
  "key": 32,
  "title": [
   "Przekształć wzór D-arabinozy w projekcję Hawortha.",
   "Convert the D-arabinose structure to a Haworth projection."
  ],
  "points": 1,
  "modelAnswer": [
   "W orientacji szablonu Hawortha (O na górze, C1 po prawej): C1 – H w górę, OH w dół. C2 – OH w górę, H w dół. C3 – H w górę, OH w dół. C4 – CH₂OH w górę, H w dół.",
   "In the paper’s Haworth orientation (ring O at the top, C1 on the right): C1 – H up, OH down. C2 – OH up, H down. C3 – H up, OH down. C4 – CH₂OH up, H down."
  ],
  "diagram": "                O\n              /   \\\n (CH₂OH↑ H↓) C4     C1 (H↑ OH↓)\n              \\   /\n    (H↑ OH↓) C3───C2 (OH↑ H↓)",
  "prompt": [
   "Jak przenieść D-arabinozę z projekcji Fischera do wzoru α-D-arabinofuranozy?",
   "How do you convert Fischer D-arabinose to α-D-arabinofuranose?"
  ],
  "explanation": [
   "W orientacji arkusza grupy OH z prawej strony Fischera trafiają pod pierścień, a z lewej nad pierścień. Forma furanozowa ma pięcioczłonowy pierścień. W anomerze α grupa OH na C1 jest po przeciwnej stronie niż końcowa CH₂OH.",
   "In the paper’s orientation, right-hand Fischer hydroxyls point down and left-hand ones up. The furanose ring has five members. In the α anomer the C1 hydroxyl is opposite the terminal CH₂OH."
  ],
  "learn": [
   "Anomer, węgiel anomeryczny i projekcja Hawortha.",
   "Anomers, anomeric carbon and Haworth projections."
  ]
 },
 {
  "s": "chemia",
  "id": "29",
  "page": 29,
  "key": 32,
  "title": [
   "Oceń wynik próby Tollensa dla cukrów.",
   "Interpret a Tollens test for sugars."
  ],
  "points": 1,
  "modelAnswer": [
   "P, F. Maltoza jest cukrem redukującym. Sacharoza nie daje dodatniej próby Tollensa, więc nie wszystkie wymienione cukry redukują odczynnik.",
   "True, false (P, F). Maltose is a reducing sugar. Sucrose does not give a positive Tollens test, so the listed sugars are not all reducing."
  ],
  "prompt": [
   "Czy maltoza daje pokazany wynik próby Tollensa i czy wszystkie cztery wymienione cukry są redukujące?",
   "Does maltose give the illustrated Tollens result, and are all four listed sugars reducing?"
  ],
  "explanation": [
   "Maltoza ma wolny koniec redukujący i może zredukować jony srebra do metalu. W sacharozie oba atomy anomeryczne uczestniczą w wiązaniu glikozydowym, dlatego sacharoza stanowi kontrprzykład.",
   "Maltose has a free reducing end and can reduce silver ions to silver metal. Both anomeric carbons in sucrose participate in its glycosidic bond, making sucrose the counterexample."
  ],
  "learn": [
   "Cukry redukujące i wolny węgiel anomeryczny.",
   "Reducing sugars and free anomeric carbons."
  ]
 }
];
