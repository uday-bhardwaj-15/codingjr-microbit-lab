const fs = require('fs');
const main = fs.readFileSync('node_modules/pxt-core/built/web/main.js', 'utf8');

// Find gallerysegment and related class names
const terms = ['gallerysegment', 'GallerySegment', 'cardsegment', 'CardSegment', 'My Projects', 'myProjects', 'projectssegment'];
terms.forEach(term => {
    const idx = main.indexOf(term);
    if (idx >= 0) {
        console.log('=== Found:', term, 'at', idx, '===');
        console.log(main.substring(Math.max(0, idx - 200), Math.min(main.length, idx + 400)));
        console.log('');
    } else {
        console.log('NOT FOUND:', term);
    }
});
