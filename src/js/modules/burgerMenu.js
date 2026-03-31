export function initBurgerMenu() {
    const burgerButton = document.querySelector(".burger-button");
    const menuBurgerButton = document.querySelector(".menu-burger-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    burgerButton.addEventListener("click", () => {
        mobileMenu.style.display = "flex";
    })

    menuBurgerButton.addEventListener("click", () => {
        mobileMenu.style.display = "none";
    })
}
