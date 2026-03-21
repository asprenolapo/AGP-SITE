//==========================
// AUTO-EXPAND TEXTAREA MODULE
//==========================

document.addEventListener("DOMContentLoaded", () => {

  function expand(element) {
    while (element.scrollHeight > element.clientHeight) {
      element.rows += 1;
    }
  }

  function setup(element) {
    element.style.resize = "none";
    element.style.overflow = "hidden";
    element.addEventListener("input", () => expand(element));
    if (element.value) expand(element);
  }

  document.querySelectorAll("textarea").forEach(setup);

  document.addEventListener("input", ({ target }) => {
    if (target.matches("textarea")) expand(target);
  });

});