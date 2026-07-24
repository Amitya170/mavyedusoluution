const fs = require('fs');

const oldIcon = "<link rel=\"icon\" href=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23050510'/%3E%3Ctext x='50' y='68' font-size='48' font-family='Georgia,serif' fill='%23a78bfa' text-anchor='middle'%3EME%3C/text%3E%3C/svg%3E\">";
const newIconTag = `<link rel="icon" type="image/svg+xml" href="../logo.svg">`;

let txt = fs.readFileSync('generate-blogs.js', 'utf8');
if (txt.includes(oldIcon)) {
    txt = txt.replace(oldIcon, newIconTag);
}
// Replace any remaining schema logo references
txt = txt.replace(/"logo": ".*og-image\.jpg"/g, '"logo": "https://www.mavyedusolutions.co.in/logo.svg"');
fs.writeFileSync('generate-blogs.js', txt, 'utf8');

console.log('Updated generate-blogs.js');
