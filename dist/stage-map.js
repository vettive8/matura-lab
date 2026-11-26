const stageIds = ['foundation','matura','1','2','3','4','5','6','internship','practice','specialty'];
const stageLabels = {
  foundation:['Podstawy','Foundations'],matura:['Matura','Matura'],
  internship:['Staż podyplomowy','Supervised internship'],practice:['Praca lekarza','Medical practice'],specialty:['Specjalizacje','Specialty training']
};
// Each column follows the same topic across the eleven stages.
const nodeLabels = {
  atom:['Atom/Atom','Izotopy/Isotopes','Energia/Energy','Czułość/Sensitivity','Znacznik/Tracer','Rozkład znacznika/Tracer distribution','Obrazowanie/Imaging','Funkcja narządu/Organ function','Skierowanie/Referral','Dobór badania/Test selection','Medycyna jądrowa/Nuclear medicine'],
  water:['Roztwór/Solution','Stężenie/Concentration','Mol/Mole','Toniczność/Tonicity','Rozcieńczenie/Dilution','Bilans wody/Water balance','Bilans płynów/Fluid balance','Seria pomiarów/Serial results','Zmiana stężenia/Concentration shift','Trend/Trend','Osmolalność/Osmolality'],
  ph:['Jony H⁺/H⁺ ions','Skala pH/pH scale','Bufor/Buffer','Wodorowęglany/Bicarbonate','Płuca i nerki/Lungs and kidneys','Wentylacja/Ventilation','Gazometria/Blood gases','Zmiana pH/pH trend','Jakość próbki/Sample quality','Mechanizm/Mechanism','Intensywna terapia/Intensive care'],
  albumin:['Aminokwas/Amino acid','Mostek S–S/S–S bridge','Albumina w surowicy/Serum albumin','Ciśnienie onkotyczne/Oncotic pressure','Białkomocz/Proteinuria','Utrata białka/Protein loss','Wiązanie leku/Drug binding','Obrzęk/Oedema','Wywiad/History','Przyczyna obrzęku/Cause of oedema','Nefrologia/Nephrology'],
  membrane:['Błona/Membrane','Kanał jonowy/Ion channel','Dwuwarstwa/Bilayer','Potencjał czynnościowy/Action potential','Przewodzenie/Conduction','EKG/ECG','Lokalizacja/Localisation','Rozkład objawów/Pattern of signs','Strona objawów/Symptom side','Ocena funkcji/Function assessment','Elektrofizjologia/Electrophysiology'],
  dna:['Allel/Allele','Dziedziczenie/Inheritance','Ekspresja genu/Gene expression','Penetracja genu/Penetrance','Rodowód/Pedigree','Wywiad rodzinny/Family history','Środowisko/Environment','Źródło informacji/Information source','Dane krewnych/Relatives’ history','Konsultacja/Consultation','Genetyka kliniczna/Clinical genetics'],
  evidence:['Pomiar/Measurement','Próba kontrolna/Control','Zmienna/Variable','Przeciwciała/Antibodies','Grupa porównawcza/Comparison group','Niepewność/Uncertainty','Częstość choroby/Prevalence','Ocena dowodów/Evidence appraisal','Potwierdzenie/Confirmation','Rozpoznanie/Diagnosis','Epidemiologia/Epidemiology']
};
const edges = [
  ['atom','water','Cząsteczka wody składa się z dwóch atomów wodoru i jednego atomu tlenu.','A water molecule contains two hydrogen atoms and one oxygen atom.'],
  ['atom','dna','DNA składa się z nukleotydów. Ich atomy tworzą m.in. szkielet cukrowo-fosforanowy.','DNA consists of nucleotides whose atoms form, among other structures, the sugar–phosphate backbone.'],
  ['water','ph','W rozcieńczonym roztworze wodnym stężenie jonów H⁺ pozwala oszacować pH.','In a dilute aqueous solution, hydrogen-ion concentration lets you estimate pH.'],
  ['water','membrane','Różnica stężeń po obu stronach przepuszczalnej błony napędza dyfuzję netto substancji obojętnej.','A concentration difference across a permeable membrane drives net diffusion of a neutral solute.'],
  ['water','albumin','Albumina rozpuszcza się w osoczu. Jej obecność wpływa na przemieszczanie się wody między osoczem a tkankami.','Albumin dissolves in plasma. Its presence influences the movement of water between plasma and tissues.'],
  ['evidence','albumin','Pomiar stężenia albuminy dostarcza jednej obserwacji. Przyczynę zmiany ustalasz, zestawiając ją z innymi danymi.','Measuring albumin gives you one observation. To explain a change you compare it with other findings.'],
  ['evidence','dna','Rodowód dostarcza obserwacji, które mogą wspierać lub wykluczać model dziedziczenia.','A pedigree supplies observations that can support or rule out an inheritance model.']
];
const translate = pair => pair[lang==='pl'?0:1];
const nameOfStage = id => stageLabels[id]?translate(stageLabels[id]):translate(['UZ · rok ','UZ · year '])+id;
