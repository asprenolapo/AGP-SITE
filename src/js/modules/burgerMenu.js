export function initBurgerMenu() {
  const burger = document.querySelector(".burger-button");
  const offcanvas = document.getElementById("offcanvas-menu");
  const overlay = document.getElementById("offcanvas-overlay");
  const closeBtn = document.querySelector(".offcanvas-close");

  if (!burger || !offcanvas || !overlay || !closeBtn) return;

  function openMenu() {
    offcanvas.classList.add("is-open");
    overlay.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    offcanvas.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    offcanvas.classList.remove("is-open");
    overlay.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    offcanvas.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  burger.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  offcanvas.querySelectorAll(".nav-button").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}