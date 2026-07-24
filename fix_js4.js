const fs = require('fs');
let lines = fs.readFileSync('generate-blogs.js', 'utf8').split('\n');
let newLines = [];
let skip = false;
for(let i=0; i<lines.length; i++) {
    if(lines[i].includes('</div>`;    <div class="orbit orbit-2"></div>')) {
        newLines.push('</div>`;');
        skip = true;
    } else if (skip && lines[i].includes('</div>;')) {
        skip = false;
    } else if (!skip) {
        newLines.push(lines[i]);
    }
}
fs.writeFileSync('generate-blogs.js', newLines.join('\n'), 'utf8');
console.log('Fixed rogue HTML line by line');
