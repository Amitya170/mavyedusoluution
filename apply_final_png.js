const fs = require('fs');

function applyPngLogo(filePath, isNested) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    const imgSrc = isNested ? '../logo.png' : 'logo.png';
    
    // Replace SVGs in navbars and footers
    const svgRegex = /<svg class="logo-icon"[^>]*>.*?<\/svg>/gs;
    const imgTag = `<img src="${imgSrc}" class="logo-icon" alt="Mavy EduSolutions Logo" style="height: 1.5em; width: auto; object-fit: contain; vertical-align: middle; border-radius: 4px;">`;
    
    content = content.replace(svgRegex, imgTag);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
}

['index.html', '404.html', 'blog/index.html', 'generate-blogs.js'].forEach(file => {
    applyPngLogo(file, file.includes('/') || file.includes('\\') || file === 'generate-blogs.js');
});

// Fix page-reveal in index.html to show ONLY the logo part of the PNG, cropping out the text
let indexHtml = fs.readFileSync('index.html', 'utf8');
// Replace the reveal-logo inner content
const revealRegex = /<div class="reveal-logo"[^>]*>.*?<\/div>/s;
// Use object-fit cover and a shorter height to crop out the bottom text
const revealImg = `<div class="reveal-logo" style="display:flex; justify-content:center; align-items:center; overflow: hidden; width: 150px; height: 120px; border-radius: 12px;">
    <img src="logo.png" alt="Mavy EduSolutions Logo" style="width: 150px; height: 150px; object-fit: cover; object-position: top;">
</div>`;
indexHtml = indexHtml.replace(revealRegex, revealImg);
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Fixed page-reveal cropping in index.html');
