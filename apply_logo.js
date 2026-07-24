const fs = require('fs');
const path = require('path');

const OLD_SVG = `<svg class="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="22" fill="#050510"/><rect x="4" y="4" width="92" height="92" rx="18" stroke="#a78bfa" stroke-width="2" fill="none"/><path d="M25 70V35l15 25 15-25v35" stroke="#a78bfa" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M62 70V35h15M62 52.5h12M62 70h15" stroke="#f0f0ff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;

const NEW_SVG = `<svg class="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="globeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a78bfa" />
      <stop offset="100%" stop-color="#6d28d9" />
    </linearGradient>
    <linearGradient id="globeGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="22" fill="#050510"/>
  <circle cx="50" cy="50" r="28" stroke="url(#globeGrad1)" stroke-width="4"/>
  <ellipse cx="50" cy="50" rx="28" ry="12" stroke="url(#globeGrad1)" stroke-width="3"/>
  <ellipse cx="50" cy="50" rx="12" ry="28" stroke="url(#globeGrad1)" stroke-width="3"/>
  <circle cx="50" cy="22" r="5" fill="url(#globeGrad2)"/>
  <circle cx="50" cy="78" r="5" fill="url(#globeGrad2)"/>
  <circle cx="22" cy="50" r="5" fill="url(#globeGrad2)"/>
  <circle cx="78" cy="50" r="5" fill="url(#globeGrad2)"/>
  <circle cx="50" cy="50" r="4" fill="#ffffff"/>
</svg>`.replace(/\r?\n\s*/g, '');

const filesToUpdate = ['index.html', '404.html', 'generate-blogs.js'];

filesToUpdate.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let occurrences = content.split(OLD_SVG).length - 1;
        if (occurrences > 0) {
            content = content.split(OLD_SVG).join(NEW_SVG);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated ${file} (${occurrences} replacements)`);
        } else {
            console.log(`Old SVG not found in ${file}`);
        }
    }
});

// Update logo.svg as well
fs.writeFileSync('logo.svg', NEW_SVG, 'utf8');
console.log('Updated logo.svg');
