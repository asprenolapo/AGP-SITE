//==========================
// NOTIFICATION MODULE
//==========================

let currentNotification = null;

export function showNotification(text, type = "success", duration = 4000) {
    if (currentNotification) currentNotification.remove();

    // Normalizzazione durata
    const isPermanent = duration === "permanent" || duration > 100000;
    const displayTime = isPermanent ? 999999 : (duration === "default" ? 4000 : duration);
    
    // 1. Creiamo il contenitore principale
    const box = document.createElement("div");
    box.classList.add("my-notification", type);

    // 2. Creiamo l'elemento per il testo (SICURO contro XSS)
    const textNode = document.createElement("span");
    textNode.textContent = text;
    box.appendChild(textNode);

    // 3. Se è permanente, aggiungiamo lo spinner come elemento DOM
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
            box.classList.add("fade-out");
            box.addEventListener("transitionend", () => {
                box.remove();
                if (currentNotification === box) currentNotification = null;
            }, { once: true });
        }, displayTime);
    }
}