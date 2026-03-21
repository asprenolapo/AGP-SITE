//==========================
// AUTO-EXPAND TEXTAREA MODULE
//==========================

document.addEventListener("DOMContentLoaded", () => {
  function setup(element) {
    element.style.resize = "none";
    element.style.overflow = "hidden";
    element.dataset.minRows = element.rows; // ← salva il minimo
    element.addEventListener("input", () => expand(element));
    if (element.value) expand(element);
  }

  function expand(element) {
    element.rows = element.dataset.minRows; // ← reset al minimo
    while (element.scrollHeight > element.clientHeight) {
      element.rows += 1;
    }
  }

  document.querySelectorAll("textarea").forEach(setup);

  document.addEventListener("input", ({ target }) => {
    if (target.matches("textarea")) expand(target);
  });
});
