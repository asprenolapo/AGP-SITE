//==========================
// SCROLL HEADER MODULE
//==========================
const navbar = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll <= 0) {
        navbar.classList.remove('nav-hidden');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('nav-hidden')) {
        navbar.classList.add('nav-hidden');
    } else if (currentScroll < lastScroll && navbar.classList.contains('nav-hidden')) {
        navbar.classList.remove('nav-hidden');
    }

    lastScroll = currentScroll;
});