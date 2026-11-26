// Read the atlas's data-only declarations without running its browser UI.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const dir = path.join(__dirname, '../../dist');
const files = ['questions','graph-data','curriculum','chapter-practice','media','map-lessons'];
const code = files.map(name => fs.readFileSync(path.join(dir,name+'.js'),'utf8')).join('\n');
const data = vm.runInNewContext(code+'\n;({questions,graphChapters,curriculum,chapterPractice,photoCredits,workedLessons})');
process.stdout.write(JSON.stringify(data));
