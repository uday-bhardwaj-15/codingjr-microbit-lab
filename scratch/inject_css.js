const fs = require('fs');

const customCSS = `
/* ==========================================================================
   CODING JR - Custom UI Overrides
   ========================================================================== */

/* 1. Hide Home Screen Hero Banner (Flashing Heart / Tutorial banner) */
.ui.segment.homecarousel,
.homecarousel,
.carousel.item,
.carousel-card,
.homescreen .homecarousel,
.homescreen .carousel {
  display: none !important;
  height: 0 !important;
  min-height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}

/* 2. Hide "0" Badge from Home button */
.ui.item.openproject span,
.ui.item.openproject .ui.label {
  display: none !important;
}

/* 3. Hide "?" Help button in Extensions page */
a.common-link.common-button.menu-button[title*="Help"],
a.common-link.common-button.menu-button[href="/extensions"],
a[title*="Help"].menu-button {
  display: none !important;
}

/* 4. Hide "Learn More" links in Extension cards */
a.common-link.link-button,
.common-card-footer a.common-link,
.common-card-footer a.link-button,
a.learnmore,
.common-card-footer a {
  display: none !important;
}

/* 5. Hide Footer Language Picker */
.homefooter #langpicker,
.homefooter .item.langpicker,
.homefooter .item[data-tooltip*="anguage"] {
  display: none !important;
}

/* 6. Hide Footer Copyright / Organization Text */
.homefooter .item.copyright,
.homefooter .copyright,
.homefooter .orgname,
.homefooter > .item:not(:has(img)):not(#langpicker) {
  display: none !important;
}
/* ========================================================================== */
`;

const files = ['built/web/semantic.css', 'built/web/rtlsemantic.css'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\/\* ==========================================================================[\s\S]*?CODING JR - Custom UI Overrides[\s\S]*?========================================================================== \*\//g, '');
    content += '\n' + customCSS;
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Successfully updated ${file}`);
  } else {
    console.warn(`File not found: ${file}`);
  }
});
