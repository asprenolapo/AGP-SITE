export const initContactFlip = () => {
    const cardInner = document.getElementById('cardInner');
    // Selezioniamo i due radio button dello switcher
    const toggleContact = document.getElementById('toggle-contact');
    const toggleWork = document.getElementById('toggle-work');

    // Controllo di sicurezza: se gli elementi non esistono, esci dalla funzione
    if (!cardInner || !toggleContact || !toggleWork) return;

    /**
     * Funzione che gestisce la rotazione della card
     * in base a quale radio button è selezionato.
     */
    const handleFlip = () => {
        if (toggleWork.checked) {
            // Se è selezionato "Lavora con noi", ruota la card sul retro
            cardInner.classList.add('is-flipped');
        } else {
            // Se è selezionato "Contatti", torna al fronte
            cardInner.classList.remove('is-flipped');
        }
    };

    // Aggiungiamo l'event listener "change" a entrambi i radio button
    toggleContact.addEventListener('change', handleFlip);
    toggleWork.addEventListener('change', handleFlip);
};