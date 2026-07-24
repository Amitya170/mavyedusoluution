const fs = require('fs');
let lines = fs.readFileSync('generate-blogs.js', 'utf8').split('\n');
let newLines = [];
let inBad = false;
for(let i=0; i<lines.length; i++) {
    if(lines[i].includes('const LOGO_SVG = <div class="logo-4d-wrapper')) {
        inBad = true;
        newLines.push('  const LOGO_SVG = `<div class="logo-4d-wrapper logo-icon" style="width: 2em; height: 2em;">');
        newLines.push('  <div class="logo-4d">');
        newLines.push('    <div class="orbit orbit-1"></div>');
        newLines.push('    <div class="orbit orbit-2"></div>');
        newLines.push('    <div class="orbit orbit-3"></div>');
        newLines.push('    <div class="core"></div>');
        newLines.push('  </div>');
        newLines.push('  <div class="logo-4d-text">M</div>');
        newLines.push('</div>`;');
    } else if (inBad && lines[i].includes('</div>;')) {
        inBad = false;
    } else if (!inBad) {
        newLines.push(lines[i]);
    }
}
fs.writeFileSync('generate-blogs.js', newLines.join('\n'), 'utf8');
console.log('Fixed exactly line by line');
