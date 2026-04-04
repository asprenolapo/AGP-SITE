//==========================
// JAVASCRIPT MODULES IMPORTS
//==========================

// Import all the modules you need for this page from ../modules

// Pure utility functions - can be used directly without initialization
import { showNotification } from '../modules/notification.js';

// DOM-dependent modules - require init
import { initScrollHeader } from '../modules/scrollHeader.js';
import { initBurgerMenu } from '../modules/burgerMenu.js';

// Languages
import { initLangSwitcher } from '../modules/langSwitcher.js';

//==========================
// "homepage" PAGE CUSTOM JAVASCRIPT INSTRUCTIONS
//==========================

// All modules that interact with the DOM (event listeners, querySelector, MutationObserver)
// must be initialized here, after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initScrollHeader();
    initBurgerMenu();

    initLangSwitcher();
});

// showNotification("Homepage notification");