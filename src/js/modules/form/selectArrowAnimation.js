//==========================
// SELECT ARROW ANIMATION
//==========================

export function initSelectArrowAnimation() {
    const selects = document.querySelectorAll('.select-input');

    selects.forEach(select => {
        if (select.dataset.arrowInitialized) return;
        select.dataset.arrowInitialized = "true";

        // Toggle della classe all'apertura
        select.addEventListener('click', () => {
            select.classList.toggle('is-open');
        });

        // Rimuove la classe quando si perde il focus (chiusura cliccando fuori)
        select.addEventListener('blur', () => {
            select.classList.remove('is-open');
        });

        // Chiude la freccia quando viene selezionata un'opzione
        select.addEventListener('change', () => {
            select.classList.remove('is-open');
            select.blur(); 
        });

        // Supporto extra per tasto ESC o chiusura involontaria
        select.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                select.classList.remove('is-open');
                select.blur();
            }
        });
    });
}   