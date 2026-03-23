export function initScrollHeader() {
  const header = document.querySelector("header");
  
  if (!header) {
    console.warn("Header element not found");
    return;
  }
  
  let lastScroll = 0;
  let ticking = false;
  
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        
        if (currentScroll <= 0) {
          header.classList.remove("hidden");
        } else if (currentScroll > lastScroll) {
          header.classList.add("hidden");
        } else if (currentScroll < lastScroll) {
          header.classList.remove("hidden");
        }
        
        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
}