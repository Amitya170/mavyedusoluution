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
            if (file.endsWith('.html') || file.endsWith('.js')) {
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

    // Update LinkedIn
    const oldLinkedIn = '<a href="https://www.linkedin.com/company/mavyedusolutions/posts/?feedView=all" aria-label="LinkedIn" title="LinkedIn" target="_blank">in</a>';
    const newLinkedIn = '<a href="https://www.linkedin.com/company/mavyedusolutions/posts/?feedView=all" aria-label="LinkedIn" title="LinkedIn" target="_blank">in</a>';
    if (content.includes(oldLinkedIn)) {
        content = content.replace(new RegExp(oldLinkedIn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newLinkedIn);
        updated = true;
    }

    // Remove GitHub
    // We want to remove the line with GitHub, and optionally the leading whitespace.
    // The regex matches optional whitespace + the github link + optional newline
    const githubRegex = /[ \t]*<a href="#" aria-label="GitHub" title="GitHub">GH<\/a>\r?\n?/g;
    if (content.match(githubRegex)) {
        content = content.replace(githubRegex, '');
        updated = true;
    }

    if (updated) {
        fs.writeFileSync(f, content, 'utf8');
        console.log('Updated:', f);
    }
});
