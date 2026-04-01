export function initBurgerMenu() {
    const burgerButton = document.querySelector(".burger-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (!burgerButton || !mobileMenu) return; // Controllo di sicurezza

    burgerButton.addEventListener("click", () => {
        // Controlliamo se è aperto verificando se è "flex"
        const isOpen = mobileMenu.style.display === "flex";
        
        if (isOpen) {
            // Se è aperto, lo chiudiamo
            mobileMenu.style.display = "none";
        } else {
            // Se è chiuso, lo apriamo in modalità FLEX (non block!)
            mobileMenu.style.display = "flex";
        }
    });
}

// export function initBurgerMenu() {
//     const burgerButton = document.querySelector(".burger-button");
//     const mobileMenu = document.querySelector(".mobile-menu");

//     burgerButton.addEventListener("click", () => {
//         // Controlliamo se è già aperto
//         const isOpen = mobileMenu.style.display === "flex";
        
//         if (isOpen) {
//             mobileMenu.style.display = "none";
//             // Qui puoi cambiare l'icona in "burger" se ne usi una
//         } else {
//             mobileMenu.style.display = "block";
//             // Qui puoi cambiare l'icona in "X" se vuoi
//         }
//     });
// }
