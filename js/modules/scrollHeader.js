export function initScrollHeader() {
  const navbar = document.querySelector("header");
  
  if (!navbar) {
    console.warn("Header element not found");
    return;
  }
  
  let lastScroll = 0;
  let ticking = false; // Per performance ottimali
  
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        
        if (currentScroll <= 0) {
          navbar.classList.remove("nav-hidden");
        } else if (currentScroll > lastScroll) {
          navbar.classList.add("nav-hidden");
        } else if (currentScroll < lastScroll) {
          navbar.classList.remove("nav-hidden");
        }
        
        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
}