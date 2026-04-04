//==========================
// JAVASCRIPT MODULES IMPORTS
//==========================

// Import all the modules you need for this page from ../modules

// Pure utility functions - can be used directly without initialization


// DOM-dependent modules - require init
import { initScrollHeader } from '../modules/scrollHeader.js';
import { initBurgerMenu } from '../modules/burgerMenu.js';

import { initNoise } from '../modules/react/noise.js';
import { initFuzzyText } from '../modules/react/fuzzyText.js';

// Languages
import { initLangSwitcher } from '../modules/langSwitcher.js';

//==========================
// "404" PAGE CUSTOM JAVASCRIPT INSTRUCTIONS
//==========================

// All modules that interact with the DOM (event listeners, querySelector, MutationObserver)
// must be initialized here, after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initScrollHeader();
  initBurgerMenu();

    initNoise({ patternAlpha: 12 });

    initFuzzyText('fuzzy-container', {
        text: "404",
        color: '#00FFFF', 
        fontSize: 'clamp(5rem, 30vw, 15rem)', 
        fontWeight: 900,
        fuzzRange: 35
    });
  
  initLangSwitcher();
});
