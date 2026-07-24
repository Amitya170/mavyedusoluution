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
            if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(__dirname);
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (content.includes('—')) {
        fs.writeFileSync(f, content.replace(/—/g, '—'), 'utf8');
        console.log('Fixed:', f);
    }
});
