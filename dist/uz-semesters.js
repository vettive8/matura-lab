const examPositions = new Map(questions.map((q, index) => [q.s + '/' + q.id, index + 1]));
const semesterSelect = document.getElementById('uz-semester');
const nextSemester = document.getElementById('uz-next');
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
  nextSemester.disabled = currentSemester === 12;
  nextSemester.setAttribute('aria-label', en ? 'Next semester' : 'Następny semestr');
  const courses = uzCourses.filter(c => c.semester === currentSemester);
  document.getElementById('uz-course-count').textContent = semester + ' ' + currentSemester + ' · ' +
    (en ? 'Course entries: ' : 'Liczba pozycji: ') + courses.length;
  const list = document.createDocumentFragment();
  for (const course of courses) {
    const position = examPositions.get(course.question);
    const question = questions[position - 1];
    const heading = element('dt', course.title[i]);
    const entry = document.createElement('dd');
    const description = element('p', course.connection[i]);
    const credit = course.ects + ' ECTS';
    description.append(' (' + credit + (course.elective ? (en ? ', elective' : ', do wyboru') : '') + ')');
    const base = 'https://sylabuz.uz.zgora.pl/index.php?/';
    const syllabus = sourceLink(course.uid ? (en ? 'Course syllabus' : 'Sylabus przedmiotu') : (en ? 'Study plan' : 'Plan studiów'),
      base + (course.uid ? 'course/showCourseDetails/' + course.uid : 'main/studyPlan/63604'));
    const subject = question.s === 'biologia' ? (en ? 'Biology' : 'Biologia') : (en ? 'Chemistry' : 'Chemia');
    const exercise = sourceLink((en ? 'Matura question ' : 'Zadanie maturalne ') + question.id, '/learn/matura/#' + course.question);
    exercise.title = subject + ' · Atlas ' + position + '/' + questions.length +
      (course.background ? (en ? ' · Background' : ' · Wiedza pomocnicza') : '');
    exercise.setAttribute('aria-label', exercise.textContent + ' · ' + exercise.title);
    entry.append(description, syllabus, ' · ', exercise);
    list.append(heading, entry);
  }
  document.getElementById('uz-subjects').replaceChildren(list);
}
function showSemester(number) {
  currentSemester = number;
  const url = new URL(location.href);
  url.searchParams.set('semester', currentSemester);
  url.hash = 'uz-semesters';
  history.replaceState(null, '', url);
  renderUzSemester();
}
semesterSelect.addEventListener('change', () => showSemester(Number(semesterSelect.value)));
nextSemester.addEventListener('click', () => showSemester(currentSemester + 1));
installPreferences(renderUzSemester);
