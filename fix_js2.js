const fs = require('fs');
let content = fs.readFileSync('generate-blogs.js', 'utf8');
const badStart = content.indexOf('const LOGO_SVG =');
const badEnd = content.indexOf('</div>`;', badStart) + 8;
const nextBadEnd = content.indexOf('</div>`;', badEnd) + 8; // There was a duplication

const oldCode = content.substring(badStart, nextBadEnd > 8 ? nextBadEnd : badEnd);
const newCode = "const LOGO_SVG = `<div class=\"logo-4d-wrapper logo-icon\" style=\"width: 2em; height: 2em;\">\n  <div class=\"logo-4d\">\n    <div class=\"orbit orbit-1\"></div>\n    <div class=\"orbit orbit-2\"></div>\n    <div class=\"orbit orbit-3\"></div>\n    <div class=\"core\"></div>\n  </div>\n  <div class=\"logo-4d-text\">M</div>\n</div>`;";

if(badStart !== -1) {
    content = content.replace(oldCode, newCode);
    fs.writeFileSync('generate-blogs.js', content, 'utf8');
    console.log("Fixed it permanently!");
}
