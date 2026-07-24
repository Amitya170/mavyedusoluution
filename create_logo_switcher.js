const fs = require('fs');

const SVG_OPT_1 = `<svg class="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="opt1Purp" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6d28d9" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>
    <linearGradient id="opt1Gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <path d="M25 80 L25 30 L45 50 L55 50 L75 30 L75 80" stroke="url(#opt1Purp)" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M50 20 L55 35 L70 40 L55 45 L50 60 L45 45 L30 40 L45 35 Z" fill="url(#opt1Gold)" filter="url(#glow1)"/>
</svg>`.replace(/\r?\n\s*/g, '');

const SVG_OPT_2 = `<svg class="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="opt2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7c3aed" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="50" rx="40" ry="15" stroke="url(#opt2Grad)" stroke-width="4" transform="rotate(30 50 50)"/>
  <ellipse cx="50" cy="50" rx="40" ry="15" stroke="url(#opt2Grad)" stroke-width="4" transform="rotate(-30 50 50)"/>
  <path d="M30 65 L30 35 L50 55 L70 35 L70 65" stroke="#f59e0b" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="30" cy="35" r="5" fill="#ffffff"/>
  <circle cx="50" cy="55" r="5" fill="#ffffff"/>
  <circle cx="70" cy="35" r="5" fill="#ffffff"/>
</svg>`.replace(/\r?\n\s*/g, '');

const SVG_OPT_3 = `<svg class="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="opt3P1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4c1d95" />
      <stop offset="100%" stop-color="#9333ea" />
    </linearGradient>
    <linearGradient id="opt3G1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b45309" />
      <stop offset="100%" stop-color="#fbbf24" />
    </linearGradient>
  </defs>
  <polygon points="15,75 15,35 40,20 40,60" fill="url(#opt3P1)"/>
  <polygon points="85,75 85,35 60,20 60,60" fill="url(#opt3G1)"/>
  <polygon points="15,75 50,95 85,75 60,60 50,65 40,60" fill="#a855f7"/>
  <polygon points="15,35 50,55 85,35 60,20 50,25 40,20" fill="#fde68a"/>
</svg>`.replace(/\r?\n\s*/g, '');

// Save default to logo.svg
fs.writeFileSync('logo.svg', SVG_OPT_1, 'utf8');

function restoreSvg(filePath, isNested) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace <img src="logo.png"> back to SVG
    const imgRegex = /<img src="\.\.?\/logo\.png"[^>]*>/gs;
    content = content.replace(imgRegex, SVG_OPT_1);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
}

['index.html', '404.html', 'blog/index.html', 'generate-blogs.js'].forEach(file => {
    restoreSvg(file, file.includes('/') || file.includes('\\') || file === 'generate-blogs.js');
});

// For index.html, we also need to fix the page-reveal which has a cropped div wrapping the img
let indexHtml = fs.readFileSync('index.html', 'utf8');
const revealRegex = /<div class="reveal-logo"[^>]*>.*?<\/div>\s*<\/div>/s;
const revealSvg = `<div class="reveal-logo" style="display:flex; justify-content:center; align-items:center;">
    ${SVG_OPT_1.replace('class="logo-icon"', 'class="logo-icon" style="width: 5em; height: 5em;"')}
</div></div>`;
indexHtml = indexHtml.replace(revealRegex, revealSvg);

// Now, inject the Logo Switcher UI into index.html just before </body>
const logoSwitcherUI = `
<!-- LOGO SWITCHER UI -->
<div id="logo-switcher" style="position: fixed; bottom: 20px; left: 20px; z-index: 99999; background: rgba(5,5,16,0.9); border: 1px solid #333; padding: 15px; border-radius: 12px; backdrop-filter: blur(10px); display: flex; flex-direction: column; gap: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    <p style="margin: 0; color: #fff; font-size: 0.9rem; font-weight: 600; text-align: center;">Logo Concepts</p>
    <button onclick="switchLogo(1)" style="padding: 8px 12px; background: #6d28d9; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">Option 1 (AI Spark)</button>
    <button onclick="switchLogo(2)" style="padding: 8px 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">Option 2 (Orbit Nodes)</button>
    <button onclick="switchLogo(3)" style="padding: 8px 12px; background: #d97706; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">Option 3 (Isometric 3D)</button>
</div>
<script>
const svg1 = \`${SVG_OPT_1}\`;
const svg2 = \`${SVG_OPT_2}\`;
const svg3 = \`${SVG_OPT_3}\`;

function switchLogo(opt) {
    const newSvg = opt === 1 ? svg1 : opt === 2 ? svg2 : svg3;
    const logos = document.querySelectorAll('.logo-icon');
    logos.forEach(logo => {
        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = newSvg;
        const newEl = temp.firstElementChild;
        // Copy the style
        newEl.style.cssText = logo.style.cssText;
        if(logo.hasAttribute('style')) newEl.setAttribute('style', logo.getAttribute('style'));
        logo.replaceWith(newEl);
    });
}
</script>
</body>`;
if(!indexHtml.includes('id="logo-switcher"')) {
    indexHtml = indexHtml.replace('</body>', logoSwitcherUI);
}

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Injected Logo Switcher into index.html');
