const fs = require('fs');
const file = 'blog/index.html';
let content = fs.readFileSync(file, 'utf8');

const OLD_SVG = `<svg class="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="22" fill="#050510"/><rect x="4" y="4" width="92" height="92" rx="18" stroke="#a78bfa" stroke-width="2" fill="none"/><path d="M25 70V35l15 25 15-25v35" stroke="#a78bfa" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M62 70V35h15M62 52.5h12M62 70h15" stroke="#f0f0ff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
const NEW_SVG = fs.readFileSync('logo.svg', 'utf8').trim();

const occurrences = content.split(OLD_SVG).length - 1;
if(occurrences > 0) {
    content = content.split(OLD_SVG).join(NEW_SVG);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Replaced ' + occurrences + ' occurrences in ' + file);
} else {
    console.log('Old SVG not found');
}
