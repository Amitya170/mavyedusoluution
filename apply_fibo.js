const fs = require('fs');

// Generate 3D Fibonacci Spheres (Math-driven CSS Particles)
function generateFiboSphere(numNodes, radiusEm, color, glowColor, sizeEm) {
    let html = '';
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numNodes; i++) {
        const y = 1 - (i / (numNodes - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;
        
        const xEm = (x * radiusEm).toFixed(3);
        const yEm = (y * radiusEm).toFixed(3);
        const zEm = (z * radiusEm).toFixed(3);
        
        html += `<div class="fibo-node" style="transform: translate3d(${xEm}em, ${yEm}em, ${zEm}em); background:${color}; box-shadow: 0 0 5px ${glowColor}, 0 0 10px ${glowColor}; width:${sizeEm}em; height:${sizeEm}em; margin-top:-${sizeEm/2}em; margin-left:-${sizeEm/2}em;"></div>\\n`;
    }
    return html;
}

const innerNodes = generateFiboSphere(35, 0.65, '#c084fc', '#a855f7', 0.2);
const outerNodes = generateFiboSphere(75, 1.1, '#22d3ee', '#06b6d4', 0.15);

const FIBO_HTML = `<div class="fibo-wrapper logo-icon" style="width: 2.8em; height: 2.8em;">
  <div class="fibo-globe-outer">
    ${outerNodes}
  </div>
  <div class="fibo-globe-inner">
    ${innerNodes}
  </div>
  <div class="fibo-core">M</div>
</div>`;

const CSS_CODE = `
/* MAVY FIBONACCI 3D PARTICLE MATRIX LOGO */
.fibo-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  perspective: 1200px;
  vertical-align: middle;
}
.fibo-globe-outer, .fibo-globe-inner {
  position: absolute;
  top: 50%; left: 50%;
  transform-style: preserve-3d;
}
.fibo-globe-outer {
  animation: fibo-spin-outer 25s linear infinite;
}
.fibo-globe-inner {
  animation: fibo-spin-inner 18s linear infinite;
}
.fibo-node {
  position: absolute;
  border-radius: 50%;
  transform-style: preserve-3d;
}
.fibo-core {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  font-size: 1.6em;
  color: #ffffff;
  text-shadow: 0 0 10px #fde68a, 0 0 20px #d97706, 0 0 40px #d97706;
  z-index: 10;
  pointer-events: none;
}

@keyframes fibo-spin-outer {
  0% { transform: rotateX(20deg) rotateY(0deg) rotateZ(-15deg); }
  100% { transform: rotateX(20deg) rotateY(360deg) rotateZ(-15deg); }
}
@keyframes fibo-spin-inner {
  0% { transform: rotateX(-20deg) rotateY(360deg) rotateZ(15deg); }
  100% { transform: rotateX(-20deg) rotateY(0deg) rotateZ(15deg); }
}
`;

// Append CSS
let styles = fs.readFileSync('styles.css', 'utf8');
if (!styles.includes('fibo-wrapper')) {
    fs.writeFileSync('styles.css', styles + '\n' + CSS_CODE, 'utf8');
    console.log('Appended Fibo 3D CSS to styles.css');
}

function injectFibo(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace premium holographic wrappers
    const oldRegex = /<div class="mavy-premium-wrapper[^>]*>.*?<\/div>\s*<\/div>\s*<\/div>/gs;
    if (content.match(oldRegex)) {
        content = content.replace(oldRegex, FIBO_HTML);
    }
    const oldRegex2 = /<div class="mavy-premium-wrapper[^>]*>.*?<\/div>\s*<\/div>/gs;
    if (content.match(oldRegex2)) {
        content = content.replace(oldRegex2, FIBO_HTML);
    }
    
    // Handle the old 4D logo wrappers if they somehow still exist
    const old4DRegex = /<div class="logo-edu-4d-wrapper[^>]*>.*?<\/div>\s*<\/div>\s*<\/div>/gs;
    if (content.match(old4DRegex)) {
        content = content.replace(old4DRegex, FIBO_HTML);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected Fibo logo into ${filePath}`);
}

['index.html', '404.html', 'blog/index.html'].forEach(injectFibo);

// Fix generate-blogs.js exactly
let genBlogs = fs.readFileSync('generate-blogs.js', 'utf8');
const badStart = genBlogs.indexOf('const LOGO_SVG = `');
if(badStart !== -1) {
    const end = genBlogs.indexOf('</div>`;', badStart) + 8;
    const oldCode = genBlogs.substring(badStart, end);
    const newCode = 'const LOGO_SVG = `' + FIBO_HTML.replace(/\n/g, '\\n') + '`;';
    genBlogs = genBlogs.replace(oldCode, newCode);
    fs.writeFileSync('generate-blogs.js', genBlogs, 'utf8');
    console.log('Fixed generate-blogs.js logo const');
}

// Fix page-reveal size in index.html to be large
let indexHtml = fs.readFileSync('index.html', 'utf8');
if (indexHtml.includes('reveal-logo')) {
    const revealTarget = '<div id="page-reveal" class="page-reveal">';
    const endTarget = '</div>\n\n    <!-- Main Navigation -->';
    const startIdx = indexHtml.indexOf(revealTarget);
    const endIdx = indexHtml.indexOf(endTarget);
    
    if (startIdx !== -1 && endIdx !== -1) {
        const oldReveal = indexHtml.substring(startIdx, endIdx);
        
        const REVEAL_FIBO_HTML = `<div class="fibo-wrapper" style="width: 8em; height: 8em; font-size: 1.5rem;">
  <div class="fibo-globe-outer">
    ${outerNodes}
  </div>
  <div class="fibo-globe-inner">
    ${innerNodes}
  </div>
  <div class="fibo-core" style="font-size: 3em;">M</div>
</div>`;
        
        const newReveal = `<div id="page-reveal" class="page-reveal">
    <div class="reveal-content">
        <div class="reveal-logo" style="display:flex; justify-content:center; align-items:center;">
          ${REVEAL_FIBO_HTML}
        </div>
    </div>`;
        indexHtml = indexHtml.replace(oldReveal, newReveal);
        fs.writeFileSync('index.html', indexHtml, 'utf8');
        console.log('Fixed page-reveal for Fibo logo');
    }
}
