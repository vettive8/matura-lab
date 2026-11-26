const examItems = new Map(questions.map(q => [q.s + '/' + q.id, q]));
const semesterSelect = document.getElementById('uz-semester');
function linkedSemester() {
  const number = Number(new URLSearchParams(location.search).get('semester'));
  return Number.isInteger(number) && number >= 1 && number <= 12 ? number : 1;
}
let currentSemester = linkedSemester();
function element(tag, content) {
  const node = document.createElement(tag);
  node.textContent = content;
  return node;
}
function sourceLink(text, href) {
  const link = element('a', text);
  link.href = href;
  return link;
}
function renderUzSemester() {
  const en = lang === 'en';
  const i = en ? 1 : 0;
  const semester = en ? 'Semester' : 'Semestr';
  document.title = document.querySelector('h1').textContent + ' · Atlas Matura';
  semesterSelect.replaceChildren();
  for (let n = 1; n <= 12; n++) semesterSelect.add(new Option(semester + ' ' + n, String(n)));
  semesterSelect.value = String(currentSemester);
  const courses = uzCourses.filter(c => c.semester === currentSemester);
  document.getElementById('uz-course-count').textContent = semester + ' ' + currentSemester + ' · ' +
    (en ? 'Course entries: ' : 'Liczba pozycji: ') + courses.length;
  const list = document.createDocumentFragment();
  for (const course of courses) {
    const question = examItems.get(course.question);
    const card = document.createElement('article');
    card.className = 'uz-course';
    card.append(element('h4', course.title[i]));
    const meta = element('small', course.ects + ' ECTS · ' +
      (course.elective ? (en ? 'Elective · ' : 'Do wyboru · ') : ''));
    const base = 'https://sylabuz.uz.zgora.pl/index.php?/';
    meta.append(sourceLink(course.uid ? (en ? 'Course syllabus' : 'Karta przedmiotu') : (en ? 'Study plan' : 'Plan studiów'),
      base + (course.uid ? 'course/showCourseDetails/' + course.uid : 'main/studyPlan/63604')));
    card.append(meta, element('p', course.connection[i]));
    const subject = question.s === 'biologia' ? (en ? 'Biology' : 'Biologia') : (en ? 'Chemistry' : 'Chemia');
    const match = course.background ? (en ? 'Background' : 'Wiedza pomocnicza') : (en ? 'Related topic' : 'Powiązany temat');
    const exercise = document.createElement('div');
    exercise.className = 'uz-exercise';
    exercise.append(element('small', match + ' · ' + subject + ' · ' + question.id),
      element('p', question.prompt[i]), element('strong', en ? 'Answer' : 'Odpowiedź'),
      element('p', question.modelAnswer[i]),
      sourceLink(en ? 'See the illustration and marking guidance' : 'Zobacz ilustrację i zasady punktacji', '/learn/matura/#' + course.question));
    card.append(exercise);
    list.append(card);
  }
  document.getElementById('uz-subjects').replaceChildren(list);
}
semesterSelect.addEventListener('change', () => {
  currentSemester = Number(semesterSelect.value);
  const url = new URL(location.href);
  url.searchParams.set('semester', currentSemester);
  url.hash = 'uz-semesters';
  history.replaceState(null, '', url);
  renderUzSemester();
});
installPreferences(renderUzSemester);
