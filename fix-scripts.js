const fs = require('fs');

function addScript(filePath, scriptTag) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes(scriptTag)) {
      content = content.replace('</body>', scriptTag + '\n</body>');
      fs.writeFileSync(filePath, content);
      console.log('Fixed ' + filePath);
    }
  }
}

addScript('index.html', '<script src="main.js"></script>');
addScript('404.html', '<script src="main.js"></script>');
addScript('blog-template.html', '<script src="../main.js"></script>');

const blogFiles = fs.readdirSync('./blog').filter(f => f.endsWith('.html'));
for (const file of blogFiles) {
  addScript('./blog/' + file, '<script src="../main.js"></script>');
}

console.log('Done.');
