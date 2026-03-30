import { initMain } from '../modules/main.js';
import { initScrollHeader } from '../modules/scrollHeader.js';
import { initBurgerMenu } from '../modules/burgerMenu.js';
import { initTextAreaAutoExpand } from '../modules/textAreaAutoExpand.js';
import { initNormalizePhoneNumber } from '../modules/normalizePhoneNumber.js';

//Tutto ciò che ha bisogno del domcontentloaded, observer ecc deve avere un init ed essere fatto partire qui
document.addEventListener("DOMContentLoaded", () => {
    initScrollHeader()
    initTextAreaAutoExpand()
    initBurgerMenu();
    initNormalizePhoneNumber()
})


// ALTRE ISTRUZIONI PER HOMEPAGE QUI