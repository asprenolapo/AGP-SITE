//==========================
// JAVASCRIPT MODULES IMPORTS
//==========================

// Import all the modules you need for this page from ../modules

// Pure utility functions - can be used directly without initialization
import { initFormListener } from '../modules/form/form.js';

// DOM-dependent modules - require init
import { initScrollHeader } from '../modules/scrollHeader.js';
import { initBurgerMenu } from '../modules/burgerMenu.js';

// FORM
import { initCheckEmailProvider } from '../modules/form/checkEmailProvider.js';
import { initNormalizePhoneNumber } from '../modules/form/normalizePhoneNumber.js';
import { initTextAreaAutoExpand } from '../modules/form/textAreaAutoExpand.js';
import { initSelectArrowAnimation } from '../modules/form/selectArrowAnimation.js';
import { initContactFlip } from '../modules/form/contactFlip.js';

// Languages
import { initLangSwitcher } from '../modules/langSwitcher.js';


//==========================
// "contact-us" PAGE CUSTOM JAVASCRIPT INSTRUCTIONS
//==========================

// All modules that interact with the DOM (event listeners, querySelector, MutationObserver)
// must be initialized here, after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // UI CORE
    initScrollHeader();
    initBurgerMenu();
    initLangSwitcher();

    // JS PER FORMS
    // initFormListener si occuperà di intercettare il submit e usare showNotification
    initFormListener(); 
    
    initTextAreaAutoExpand();
    initNormalizePhoneNumber();
    initSelectArrowAnimation();
    initCheckEmailProvider();
    initContactFlip();
});