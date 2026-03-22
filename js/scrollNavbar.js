const navbar = document.querySelector('nav');
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