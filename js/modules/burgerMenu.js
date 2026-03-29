export function initBurgerMenu() {
    const header = document.querySelector("header");
    const burgerButton = document.querySelector(".burger-button");
    const menuBurgerButton = document.querySelector(".menu-burger-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    burgerButton.addEventListener("click", () => {
        mobileMenu.style.display = "flex";
        header.classList.add("hidden");
    })
}
