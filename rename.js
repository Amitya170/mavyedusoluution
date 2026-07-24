const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('.git') && !file.includes('node_modules')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.xml') || file.endsWith('.txt')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(__dirname);
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let updated = false;
    
    if (content.includes('Mavy EduSolutions')) {
        content = content.replace(/Mavy EduSolutions/g, 'Mavy EduSolutionss');
        updated = true;
    }
    if (content.includes('Mavy <span>EduSolutions</span>')) {
        content = content.replace(/Mavy <span>EduSolutions<\/span>/g, 'Mavy <span>EduSolutions</span>');
        updated = true;
    }
    // Also catch "cat: 'EduSolutions'" or similar just in case, but let's stick to the brand name first.
    // Let's also fix standalone "EduSolutions" that refer to the brand if any.
    // To be safe, let's just globally replace "EduSolutions" with "EduSolutions" where it is not already "EduSolutions".
    // This is a much stronger fix.
    if (content.match(/EduSolutions(?!s)/)) {
        content = content.replace(/EduSolutions(?!s)/g, 'EduSolutions');
        updated = true;
    }

    if (updated) {
        fs.writeFileSync(f, content, 'utf8');
        console.log('Fixed:', f);
    }
});
