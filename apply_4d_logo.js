const fs = require('fs');

const CSS_CODE = `
/* 4D ROTATING LOGO */
.logo-4d-wrapper {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  perspective: 1000px;
}
.logo-4d {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  transform-style: preserve-3d;
  animation: master-spin 15s linear infinite;
}
.logo-4d .orbit {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  border-radius: 50%;
  border: 2px solid transparent;
  transform-style: preserve-3d;
  box-sizing: border-box;
}
.logo-4d .orbit-1 {
  border-left: 2px solid #c084fc;
  border-right: 2px solid #c084fc;
  box-shadow: 0 0 10px #a855f7, inset 0 0 10px #a855f7;
  animation: orbit-spin-1 3s linear infinite;
}
.logo-4d .orbit-2 {
  border-top: 2px solid #fde68a;
  border-bottom: 2px solid #fde68a;
  box-shadow: 0 0 10px #d97706, inset 0 0 10px #d97706;
  animation: orbit-spin-2 4.5s linear infinite;
}
.logo-4d .orbit-3 {
  border-left: 2px solid #67e8f9;
  border-right: 2px solid #67e8f9;
  box-shadow: 0 0 10px #06b6d4, inset 0 0 10px #06b6d4;
  animation: orbit-spin-3 6s linear infinite;
}
.logo-4d .core {
  position: absolute;
  top: 35%; left: 35%; right: 35%; bottom: 35%;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 15px #ffffff, 0 0 30px #c084fc;
  animation: core-pulse 2s ease-in-out infinite alternate;
}
.logo-4d-text {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  font-size: 0.9em;
  color: #050510;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff;
  z-index: 10;
}

@keyframes master-spin {
  0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
}
@keyframes orbit-spin-1 {
  0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  100% { transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg); }
}
@keyframes orbit-spin-2 {
  0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  100% { transform: rotateX(180deg) rotateY(360deg) rotateZ(180deg); }
}
@keyframes orbit-spin-3 {
  0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(0deg); }
}
@keyframes core-pulse {
  0% { transform: scale(0.8); box-shadow: 0 0 10px #ffffff, 0 0 20px #c084fc; }
  100% { transform: scale(1.2); box-shadow: 0 0 20px #ffffff, 0 0 40px #67e8f9; }
}
`;

// Append CSS if not exists
let styles = fs.readFileSync('styles.css', 'utf8');
if (!styles.includes('logo-4d-wrapper')) {
    fs.writeFileSync('styles.css', styles + '\n' + CSS_CODE, 'utf8');
    console.log('Appended 4D CSS to styles.css');
}

const HTML_4D = `<div class="logo-4d-wrapper logo-icon" style="width: 2em; height: 2em;">
  <div class="logo-4d">
    <div class="orbit orbit-1"></div>
    <div class="orbit orbit-2"></div>
    <div class="orbit orbit-3"></div>
    <div class="core"></div>
  </div>
  <div class="logo-4d-text">M</div>
</div>`;

function inject4D(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace SVGs that have class="logo-icon" with the 4D HTML
    const svgRegex = /<svg class="logo-icon"[^>]*>.*?<\/svg>/gs;
    content = content.replace(svgRegex, HTML_4D);
    
    // Remove the switcher UI if it exists
    const switcherRegex = /<!-- LOGO SWITCHER UI -->.*?<\/script>\n/s;
    if (content.match(switcherRegex)) {
        content = content.replace(switcherRegex, '');
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected 4D logo into ${filePath}`);
}

['index.html', '404.html', 'blog/index.html', 'generate-blogs.js'].forEach(inject4D);

// Fix page-reveal size in index.html to be large
let indexHtml = fs.readFileSync('index.html', 'utf8');
const revealRegex = /<div class="reveal-logo"[^>]*>.*?<\/div>\s*<\/div>/s;
const reveal4D = `<div class="reveal-logo" style="display:flex; justify-content:center; align-items:center;">
  <div class="logo-4d-wrapper" style="width: 6em; height: 6em; font-size: 1.5rem;">
    <div class="logo-4d">
      <div class="orbit orbit-1"></div>
      <div class="orbit orbit-2"></div>
      <div class="orbit orbit-3"></div>
      <div class="core"></div>
    </div>
    <div class="logo-4d-text" style="font-size: 2em;">M</div>
  </div>
</div></div>`;
indexHtml = indexHtml.replace(revealRegex, reveal4D);
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Fixed page-reveal for 4D logo');
