const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Find the start of duplicate inline block: <script>\n/* — EDIT ME: Brand & config
const startMarker = '<script>\n/* — EDIT ME: Brand & config';
const endMarker = '});\n\n</script>\n<script>\n\n/* ================================================================\n   3D OVERHAUL JAVASCRIPT INJECTIONS';

const startIndex = indexHtml.indexOf(startMarker);
const endIndex = indexHtml.indexOf(endMarker);

console.log('Start index:', startIndex);
console.log('End index:', endIndex);

if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
  // Replace lines 518 to 1156 with nothing (or comments)
  const part1 = indexHtml.substring(0, startIndex);
  const part2 = indexHtml.substring(endIndex + '});\n\n</script>\n'.length);
  indexHtml = part1 + part2;
  fs.writeFileSync('index.html', indexHtml);
  console.log('Successfully removed duplicate inline script block from index.html!');
} else {
  console.error('Could not find markers for inline script block.');
}
