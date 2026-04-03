//==========================
// SELECT ARROW ANIMATION
//==========================

export function initSelectArrowAnimation() {
    const selects = document.querySelectorAll('.select-input');

    selects.forEach(select => {
        if (select.dataset.arrowInitialized) return;
        select.dataset.arrowInitialized = "true";

        // Quando clicchi, alterna la classe
        select.addEventListener('click', () => {
            select.classList.toggle('is-open');
        });

        // Se l'utente clicca fuori, rimuovi la classe (torna a 8px e freccia giù)
        select.addEventListener('blur', () => {
            select.classList.remove('is-open');
        });

        // Quando viene scelta un'opzione, chiudi tutto
        select.addEventListener('change', () => {
            select.classList.remove('is-open');
            select.blur(); 
        });
    });
}