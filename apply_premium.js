const fs = require('fs');

const CSS_CODE = `
/* MAVY 4D PREMIUM HOLOGRAPHIC LOGO */
.mavy-premium-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  perspective: 1200px;
  transform-style: preserve-3d;
}
.mavy-4d-hologram {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  transform-style: preserve-3d;
  animation: hologram-spin 12s linear infinite;
}
.mavy-4d-layer {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  display: flex; justify-content: center; align-items: center;
}
.mavy-4d-layer:nth-child(1) { transform: translateZ(8px); opacity: 1; }
.mavy-4d-layer:nth-child(2) { transform: translateZ(0px); opacity: 0.5; filter: blur(1px); }
.mavy-4d-layer:nth-child(3) { transform: translateZ(-8px); opacity: 0.2; filter: blur(3px); }

.hologram-orbit-1 {
  transform-origin: 50px 50px;
  animation: spin-orbit-1 12s linear infinite;
}
.hologram-orbit-2 {
  transform-origin: 50px 50px;
  animation: spin-orbit-2 8s linear infinite reverse;
}
.hologram-beam {
  animation: pulse-beam 1s linear infinite;
}

@keyframes hologram-spin {
  0% { transform: rotateY(0deg) rotateX(15deg); }
  100% { transform: rotateY(360deg) rotateX(15deg); }
}
@keyframes spin-orbit-1 { 100% { transform: rotate(360deg); } }
@keyframes spin-orbit-2 { 100% { transform: rotate(360deg); } }
@keyframes pulse-beam { 100% { stroke-dashoffset: 12; } }
`;

let styles = fs.readFileSync('styles.css', 'utf8');
if (!styles.includes('mavy-premium-wrapper')) {
    fs.writeFileSync('styles.css', styles + '\n' + CSS_CODE, 'utf8');
    console.log('Appended Premium 4D CSS to styles.css');
}

const RAW_SVG = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%; overflow:visible;">
  <defs>
    <linearGradient id="premGold" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FCD34D" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="premPurple" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D8B4FE" />
      <stop offset="100%" stop-color="#7E22CE" />
    </linearGradient>
    <linearGradient id="premCyan" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#22D3EE" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>
    <filter id="premGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <circle cx="50" cy="50" r="45" stroke="url(#premCyan)" stroke-width="1" stroke-dasharray="10 5" class="hologram-orbit-1" />
  <circle cx="50" cy="50" r="38" stroke="url(#premPurple)" stroke-width="1.5" stroke-dasharray="30 10" class="hologram-orbit-2" />
  <path d="M 50 80 L 80 65 L 50 50 L 20 65 Z" fill="url(#premPurple)" opacity="0.3" stroke="url(#premPurple)" stroke-width="1"/>
  <path d="M 30 65 L 30 25 L 50 45 L 70 25 L 70 65" stroke="url(#premGold)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#premGlow)"/>
  <circle cx="30" cy="25" r="4" fill="#fff" filter="url(#premGlow)"/>
  <circle cx="50" cy="45" r="4" fill="#fff" filter="url(#premGlow)"/>
  <circle cx="70" cy="25" r="4" fill="#fff" filter="url(#premGlow)"/>
  <circle cx="50" cy="80" r="4" fill="#22D3EE" filter="url(#premGlow)"/>
  <path d="M 50 80 L 50 45" stroke="#22D3EE" stroke-width="1.5" stroke-dasharray="2 4" class="hologram-beam"/>
</svg>`;

const HTML_PREMIUM = `<div class="mavy-premium-wrapper logo-icon" style="width: 2.2em; height: 2.2em;">
  <div class="mavy-4d-hologram">
    <div class="mavy-4d-layer">${RAW_SVG}</div>
    <div class="mavy-4d-layer">${RAW_SVG}</div>
    <div class="mavy-4d-layer">${RAW_SVG}</div>
  </div>
</div>`;

function injectPremium(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace old edu-4d wrappers
    const old4DRegex = /<div class="logo-edu-4d-wrapper[^>]*>.*?<\/div>\s*<\/div>\s*<\/div>/gs;
    if (content.match(old4DRegex)) {
        content = content.replace(old4DRegex, HTML_PREMIUM);
    }
    
    // Also try to replace if it wasn't nested as deeply
    const old4DRegex2 = /<div class="logo-edu-4d-wrapper[^>]*>.*?<\/div>\s*<\/div>/gs;
    if (content.match(old4DRegex2)) {
        content = content.replace(old4DRegex2, HTML_PREMIUM);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected Premium logo into ${filePath}`);
}

['index.html', '404.html', 'blog/index.html'].forEach(injectPremium);

// Fix generate-blogs.js exactly
let genBlogs = fs.readFileSync('generate-blogs.js', 'utf8');
const badStart = genBlogs.indexOf('const LOGO_SVG = `');
if(badStart !== -1) {
    const end = genBlogs.indexOf('</div>`;', badStart) + 8;
    const oldCode = genBlogs.substring(badStart, end);
    const newCode = 'const LOGO_SVG = `' + HTML_PREMIUM + '`;';
    genBlogs = genBlogs.replace(oldCode, newCode);
    fs.writeFileSync('generate-blogs.js', genBlogs, 'utf8');
    console.log('Fixed generate-blogs.js logo const');
}

// Fix page-reveal size in index.html to be large
let indexHtml = fs.readFileSync('index.html', 'utf8');
const revealRegex = /<div class="reveal-logo"[^>]*>.*?<\/div>\s*<\/div>\s*<\/div>/s;
const revealPremium = `<div class="reveal-logo" style="display:flex; justify-content:center; align-items:center;">
  <div class="mavy-premium-wrapper" style="width: 8em; height: 8em; font-size: 1.5rem;">
    <div class="mavy-4d-hologram">
      <div class="mavy-4d-layer">${RAW_SVG}</div>
      <div class="mavy-4d-layer">${RAW_SVG}</div>
      <div class="mavy-4d-layer">${RAW_SVG}</div>
    </div>
  </div>
</div>`;
if (indexHtml.includes('reveal-logo')) {
    const revealTarget = '<div id="page-reveal" class="page-reveal">';
    const endTarget = '</div>\n\n    <!-- Main Navigation -->';
    const startIdx = indexHtml.indexOf(revealTarget);
    const endIdx = indexHtml.indexOf(endTarget);
    
    if (startIdx !== -1 && endIdx !== -1) {
        const oldReveal = indexHtml.substring(startIdx, endIdx);
        const newReveal = `<div id="page-reveal" class="page-reveal">
    <div class="reveal-content">
        ${revealPremium}
    </div>`;
        indexHtml = indexHtml.replace(oldReveal, newReveal);
        fs.writeFileSync('index.html', indexHtml, 'utf8');
        console.log('Fixed page-reveal for Premium logo');
    }
}
