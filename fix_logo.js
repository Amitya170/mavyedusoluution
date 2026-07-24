const fs = require('fs');

const oldIcon = "<link rel=\"icon\" href=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23050510'/%3E%3Ctext x='50' y='68' font-size='48' font-family='Georgia,serif' fill='%23a78bfa' text-anchor='middle'%3EME%3C/text%3E%3C/svg%3E\">";

const newIconSVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="22" fill="#050510"/><rect x="4" y="4" width="92" height="92" rx="18" stroke="#a78bfa" stroke-width="2" fill="none"/><path d="M25 70V35l15 25 15-25v35" stroke="#a78bfa" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M62 70V35h15M62 52.5h12M62 70h15" stroke="#f0f0ff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;

const newIconTag = `<link rel="icon" type="image/svg+xml" href="/logo.svg">`;

// 1. Create logo.svg
fs.writeFileSync('logo.svg', newIconSVG, 'utf8');

// 2. Update index.html
let index = fs.readFileSync('index.html', 'utf8');
if (index.includes(oldIcon)) {
    index = index.replace(oldIcon, newIconTag);
}
// Update schema logo
index = index.replace(/"logo": ".*og-image\.jpg"/g, '"logo": "https://www.mavyedusolutions.co.in/logo.svg"');
fs.writeFileSync('index.html', index, 'utf8');

// 3. Update blog-template.html
let blogTpl = fs.readFileSync('blog-template.html', 'utf8');
if (blogTpl.includes(oldIcon)) {
    blogTpl = blogTpl.replace(oldIcon, newIconTag);
}
// Update schema logo
blogTpl = blogTpl.replace(/"logo": ".*og-image\.jpg"/g, '"logo": "https://www.mavyedusolutions.co.in/logo.svg"');
fs.writeFileSync('blog-template.html', blogTpl, 'utf8');

console.log("Updated favicons and schemas.");
