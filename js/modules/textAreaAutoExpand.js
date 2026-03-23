//==========================
// AUTO-EXPAND TEXTAREA MODULE
//==========================

// Expands a textarea to fit its content automatically
// Must be called inside DOMContentLoaded in the page's JS file
export function initTextAreaAutoExpand() {
  
  // Resizes the textarea by incrementing rows until the content fits
  function setup(element) {
    if (element.dataset.autoExpand) return;
    element.dataset.autoExpand = true;
    element.style.resize = "none";
    element.style.overflow = "hidden";
    element.dataset.minRows = element.rows || 1;
    element.addEventListener("input", () => expand(element));
    if (element.value) expand(element);
  }

  function expand(element) {
    element.rows = element.dataset.minRows;
    while (element.scrollHeight > element.clientHeight) {
      element.rows += 1;
    }
  }

  // Attach to all existing textareas
  document.querySelectorAll("textarea").forEach(setup);

  // Handle dynamically injected textareas via MutationObserver
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.matches("textarea")) setup(node);
        node.querySelectorAll?.("textarea").forEach(setup);
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}