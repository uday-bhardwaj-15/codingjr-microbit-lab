const fs = require('fs');
const main = fs.readFileSync('node_modules/pxt-core/built/web/main.js', 'utf8');

// Find all footer occurrences
const regex = /footer/gi;
let m;
while ((m = regex.exec(main)) !== null) {
  const snippet = main.substring(Math.max(0, m.index - 80), Math.min(main.length, m.index + 120));
  if (snippet.includes('jsx') || snippet.includes('className') || snippet.includes('div') || snippet.includes('logo')) {
    console.log('--- At', m.index, '---');
    console.log(snippet);
  }
}
