const fs = require('fs');

const CSS_CODE = `
/* EDU 4D ROTATING LOGO */
.logo-edu-4d-wrapper {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  perspective: 1000px;
}
.logo-edu-4d {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  transform-style: preserve-3d;
  animation: edu-master-spin 12s linear infinite;
}

/* Orbits */
.logo-edu-4d .edu-orbit {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  border-radius: 50%;
  border: 2px solid transparent;
  transform-style: preserve-3d;
  box-sizing: border-box;
}
.logo-edu-4d .edu-orbit-1 {
  border-left: 2px solid #fde68a;
  border-right: 2px solid #fde68a;
  box-shadow: 0 0 10px #d97706, inset 0 0 10px #d97706;
  animation: edu-orbit-spin-1 4s linear infinite;
}
.logo-edu-4d .edu-orbit-2 {
  border-top: 2px solid #c084fc;
  border-bottom: 2px solid #c084fc;
  box-shadow: 0 0 10px #a855f7, inset 0 0 10px #a855f7;
  animation: edu-orbit-spin-2 5s linear infinite;
}
.logo-edu-4d .edu-orbit-3 {
  border: 1px dashed #67e8f9;
  box-shadow: 0 0 10px #06b6d4;
  animation: edu-orbit-spin-3 8s linear infinite;
}

/* 3D Book */
.logo-edu-4d .edu-book {
  position: absolute;
  bottom: 15%; left: 25%; width: 50%; height: 25%;
  transform-style: preserve-3d;
  transform: rotateX(70deg) rotateZ(45deg);
  animation: edu-book-levitate 3s ease-in-out infinite alternate;
}
.logo-edu-4d .edu-page {
  position: absolute;
  width: 50%; height: 100%;
  background: rgba(103, 232, 249, 0.15);
  border: 1px solid #67e8f9;
  box-shadow: 0 0 5px #06b6d4, inset 0 0 5px #06b6d4;
  top: 0;
  backdrop-filter: blur(2px);
}
.logo-edu-4d .edu-page-left {
  left: 0;
  transform-origin: right center;
  transform: rotateY(-40deg);
}
.logo-edu-4d .edu-page-right {
  right: 0;
  transform-origin: left center;
  transform: rotateY(40deg);
}

/* Extruded Hologram M */
.logo-edu-4d .edu-hologram {
  position: absolute;
  top: 25%; left: 0%; width: 100%; text-align: center;
  transform-style: preserve-3d;
  animation: edu-hologram-pulse 2s ease-in-out infinite alternate;
}
.logo-edu-4d .edu-hologram span {
  position: absolute;
  top: 0; left: 0; width: 100%;
  font-family: 'Outfit', sans-serif;
  font-weight: 900;
  font-size: 1.1em;
  line-height: 1;
}
.logo-edu-4d .edu-hologram span:nth-child(1) {
  color: #ffffff;
  text-shadow: 0 0 10px #fff, 0 0 20px #a855f7;
  transform: translateZ(0.1em);
}
.logo-edu-4d .edu-hologram span:nth-child(2) { color: #d8b4fe; transform: translateZ(0.08em); }
.logo-edu-4d .edu-hologram span:nth-child(3) { color: #c084fc; transform: translateZ(0.06em); }
.logo-edu-4d .edu-hologram span:nth-child(4) { color: #a855f7; transform: translateZ(0.04em); }
.logo-edu-4d .edu-hologram span:nth-child(5) { color: #9333ea; transform: translateZ(0.02em); }
.logo-edu-4d .edu-hologram span:nth-child(6) { color: #7e22ce; transform: translateZ(0em); }

/* Animations */
@keyframes edu-master-spin {
  0% { transform: rotateY(0deg) rotateX(-10deg); }
  100% { transform: rotateY(360deg) rotateX(-10deg); }
}
@keyframes edu-orbit-spin-1 {
  0% { transform: rotateX(60deg) rotateY(0deg) rotateZ(0deg); }
  100% { transform: rotateX(60deg) rotateY(360deg) rotateZ(360deg); }
}
@keyframes edu-orbit-spin-2 {
  0% { transform: rotateX(-60deg) rotateY(0deg) rotateZ(0deg); }
  100% { transform: rotateX(-60deg) rotateY(360deg) rotateZ(-360deg); }
}
@keyframes edu-orbit-spin-3 {
  0% { transform: rotateX(90deg) rotateY(0deg) rotateZ(0deg); }
  100% { transform: rotateX(90deg) rotateY(360deg) rotateZ(360deg); }
}
@keyframes edu-book-levitate {
  0% { transform: translateY(0px) rotateX(70deg) rotateZ(45deg); }
  100% { transform: translateY(-5px) rotateX(70deg) rotateZ(45deg); }
}
@keyframes edu-hologram-pulse {
  0% { transform: translateY(0px) scale(0.95); }
  100% { transform: translateY(-3px) scale(1.05); }
}
`;

// Append CSS if not exists
let styles = fs.readFileSync('styles.css', 'utf8');
if (!styles.includes('logo-edu-4d-wrapper')) {
    fs.writeFileSync('styles.css', styles + '\n' + CSS_CODE, 'utf8');
    console.log('Appended Edu 4D CSS to styles.css');
}

const HTML_EDU_4D = `<div class="logo-edu-4d-wrapper logo-icon" style="width: 2.2em; height: 2.2em;">
  <div class="logo-edu-4d">
    <div class="edu-orbit edu-orbit-1"></div>
    <div class="edu-orbit edu-orbit-2"></div>
    <div class="edu-orbit edu-orbit-3"></div>
    <div class="edu-book">
      <div class="edu-page edu-page-left"></div>
      <div class="edu-page edu-page-right"></div>
    </div>
    <div class="edu-hologram">
      <span>M</span><span>M</span><span>M</span><span>M</span><span>M</span><span>M</span>
    </div>
  </div>
</div>`;

function injectEdu4D(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace old 4D logo wrappers
    const old4DRegex = /<div class="logo-4d-wrapper[^>]*>.*?<\/div>\s*<\/div>/gs;
    if (content.match(old4DRegex)) {
        content = content.replace(old4DRegex, HTML_EDU_4D);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected Edu 4D logo into ${filePath}`);
}

['index.html', '404.html', 'blog/index.html'].forEach(injectEdu4D);

// Fix generate-blogs.js exactly
let genBlogs = fs.readFileSync('generate-blogs.js', 'utf8');
const badStart = genBlogs.indexOf('const LOGO_SVG = `');
if(badStart !== -1) {
    const end = genBlogs.indexOf('</div>`;', badStart) + 8;
    const oldCode = genBlogs.substring(badStart, end);
    const newCode = 'const LOGO_SVG = `' + HTML_EDU_4D + '`;';
    genBlogs = genBlogs.replace(oldCode, newCode);
    fs.writeFileSync('generate-blogs.js', genBlogs, 'utf8');
    console.log('Fixed generate-blogs.js logo const');
}

// Fix page-reveal size in index.html to be large
let indexHtml = fs.readFileSync('index.html', 'utf8');
const revealRegex = /<div class="reveal-logo"[^>]*>.*?<\/div>\s*<\/div>\s*<\/div>/s;
const reveal4D = `<div class="reveal-logo" style="display:flex; justify-content:center; align-items:center;">
  <div class="logo-edu-4d-wrapper" style="width: 7em; height: 7em; font-size: 1.5rem;">
    <div class="logo-edu-4d">
      <div class="edu-orbit edu-orbit-1"></div>
      <div class="edu-orbit edu-orbit-2"></div>
      <div class="edu-orbit edu-orbit-3"></div>
      <div class="edu-book">
        <div class="edu-page edu-page-left"></div>
        <div class="edu-page edu-page-right"></div>
      </div>
      <div class="edu-hologram">
        <span>M</span><span>M</span><span>M</span><span>M</span><span>M</span><span>M</span>
      </div>
    </div>
  </div>
</div></div>`;
if (indexHtml.includes('reveal-logo')) {
    // A bit tricky regex to catch nested divs in reveal-logo. We can just replace the old HTML_EDU_4D in there with a bigger one.
    const revealTarget = '<div id="page-reveal" class="page-reveal">';
    const endTarget = '</div>\n\n    <!-- Main Navigation -->';
    const startIdx = indexHtml.indexOf(revealTarget);
    const endIdx = indexHtml.indexOf(endTarget);
    
    if (startIdx !== -1 && endIdx !== -1) {
        const oldReveal = indexHtml.substring(startIdx, endIdx);
        const newReveal = `<div id="page-reveal" class="page-reveal">
    <div class="reveal-content">
        <div class="reveal-logo" style="display:flex; justify-content:center; align-items:center;">
          <div class="logo-edu-4d-wrapper" style="width: 7em; height: 7em; font-size: 1.5rem;">
            <div class="logo-edu-4d">
              <div class="edu-orbit edu-orbit-1"></div>
              <div class="edu-orbit edu-orbit-2"></div>
              <div class="edu-orbit edu-orbit-3"></div>
              <div class="edu-book">
                <div class="edu-page edu-page-left"></div>
                <div class="edu-page edu-page-right"></div>
              </div>
              <div class="edu-hologram">
                <span>M</span><span>M</span><span>M</span><span>M</span><span>M</span><span>M</span>
              </div>
            </div>
          </div>
        </div>
    </div>`;
        indexHtml = indexHtml.replace(oldReveal, newReveal);
        fs.writeFileSync('index.html', indexHtml, 'utf8');
        console.log('Fixed page-reveal for Edu 4D logo');
    }
}
