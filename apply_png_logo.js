const fs = require('fs');
const path = require('path');

function replaceSvgWithImg(filePath, isNested) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    const imgSrc = isNested ? '../logo.png' : 'logo.png';
    const imgTag = `<img src="${imgSrc}" class="logo-icon" alt="Mavy EduSolutions Logo" style="height: 1.5em; width: auto; object-fit: contain; vertical-align: middle; border-radius: 4px;">`;
    
    // Replace all matching SVGs
    const regex = /<svg class="logo-icon"[^>]*>.*?<\/svg>/gs;
    const occurrences = (content.match(regex) || []).length;
    
    if (occurrences > 0) {
        content = content.replace(regex, imgTag);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Replaced ${occurrences} occurrences in ${filePath}`);
    } else {
        console.log(`No matching SVGs found in ${filePath}`);
    }
}

replaceSvgWithImg('index.html', false);
replaceSvgWithImg('404.html', false);
replaceSvgWithImg('blog/index.html', true);
replaceSvgWithImg('generate-blogs.js', true);
