const fs = require('fs');
const main = fs.readFileSync('node_modules/pxt-core/built/web/main.js', 'utf8');

// Find all gallerysegment occurrences with context
const regex = /gallerysegment/g;
let m;
while ((m = regex.exec(main)) !== null) {
    const snippet = main.substring(Math.max(0, m.index - 100), Math.min(main.length, m.index + 300));
    console.log('=== gallerysegment at', m.index, '===');
    console.log(snippet);
    console.log('');
}
