const fs = require('fs');
const main = fs.readFileSync('node_modules/pxt-core/built/web/main.js', 'utf8');

// Find My Projects related class names
const regex = /myproject|my-project|MyProjects|my_project|projectsegment|projects-segment|homescreen.*project/gi;
let m;
while ((m = regex.exec(main)) !== null) {
    const snippet = main.substring(Math.max(0, m.index - 120), Math.min(main.length, m.index + 200));
    if (snippet.includes('className') || snippet.includes('class')) {
        console.log('--- At', m.index, '---');
        console.log(snippet);
    }
}
