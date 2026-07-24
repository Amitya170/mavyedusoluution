const fs = require('fs');
let content = fs.readFileSync('generate-blogs.js', 'utf8');
const badStart = content.indexOf('const LOGO_SVG = <div');
if(badStart !== -1) {
    const end = content.indexOf('</div>\n', badStart) + 7;
    const oldCode = content.substring(badStart, end);
    const newCode = "const LOGO_SVG = `<div class=\"logo-4d-wrapper logo-icon\" style=\"width: 2em; height: 2em;\">\n  <div class=\"logo-4d\">\n    <div class=\"orbit orbit-1\"></div>\n    <div class=\"orbit orbit-2\"></div>\n    <div class=\"orbit orbit-3\"></div>\n    <div class=\"core\"></div>\n  </div>\n  <div class=\"logo-4d-text\">M</div>\n</div>`;";
    content = content.replace(oldCode, newCode);
    fs.writeFileSync('generate-blogs.js', content, 'utf8');
    console.log("Fixed generate-blogs.js syntax error");
} else {
    console.log("Could not find the bad code");
}
