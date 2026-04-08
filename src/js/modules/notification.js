//==========================
// NOTIFICATION MODULE
//==========================

let currentNotification = null;

export function showNotification(text, type = "success", duration = 4000) {
    if (currentNotification) {
        currentNotification.remove();
        currentNotification = null;
    }

    // Normalizzazione durata
    const isPermanent = duration === "permanent" || duration > 100000;
    const displayTime = isPermanent ? 999999 : (duration === "default" ? 4000 : duration);
    
    // 1. Creiamo il contenitore principale
    const box = document.createElement("div");
    // Supporto per classi: success, error, warning
    box.classList.add("my-notification", type);

    // 2. Creiamo l'elemento per il testo
    const textNode = document.createElement("span");
    textNode.textContent = text;
    box.appendChild(textNode);

    // 3. Se è permanente (loading), aggiungiamo lo spinner
    if (isPermanent) {
        const spinner = document.createElement("div");
        spinner.classList.add("spinner");
        box.appendChild(spinner);
    }
    
    document.body.appendChild(box);
    currentNotification = box;

    // 4. Logica di rimozione
    if (!isPermanent) {
        setTimeout(() => {
            if (!box.parentElement) return; // Già rimosso
            box.classList.add("fade-out");
            box.addEventListener("transitionend", () => {
                box.remove();
                if (currentNotification === box) currentNotification = null;
            }, { once: true });
        }, displayTime);
    }
}