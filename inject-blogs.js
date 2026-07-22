const fs = require('fs');
const lines = fs.readFileSync('generate-blogs.js', 'utf8').split('\n');
const endLineIndex = lines.findIndex(l => l.trim() === '];' && lines[lines.indexOf(l)-1].includes('}'));

if (endLineIndex !== -1) {
  const newBlogs = fs.readFileSync('new-blogs.txt', 'utf8');
  lines.splice(endLineIndex, 0, newBlogs);
  fs.writeFileSync('generate-blogs.js', lines.join('\n'));
  console.log('Injected new blogs into generate-blogs.js');
} else {
  console.error('Could not find the end of the posts array.');
}
