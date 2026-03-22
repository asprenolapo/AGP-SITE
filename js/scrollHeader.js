//==========================
// SCROLL HEADER MODULE
//==========================
const navbar = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll <= 0) {
        navbar.style.display = "flex";
        return;
    }

    if (currentScroll > lastScroll) {
        navbar.style.display = "none";
    } else if (currentScroll < lastScroll) {
        navbar.style.display = "flex";
    }

    lastScroll = currentScroll;
});