//==========================
// AUTO-EXPAND TEXTAREA MODULE
//==========================

// Expands a textarea to fit its content automatically
// Must be called inside DOMContentLoaded in the page's JS file
export function initTextAreaAutoExpand() {
  const MAX_ROWS = 6;

  function expand(el) {
    el.rows = el.dataset.minRows;
    // Un piccolo trucco: invece di un ciclo while, usiamo un calcolo più diretto
    // ma manteniamo il limite MAX_ROWS
    while (el.scrollHeight > el.clientHeight && el.rows < MAX_ROWS) {
      el.rows++;
    }
  }

  function setup(el) {
    if (el.dataset.autoExpand) return;
    el.dataset.autoExpand = "true";
    
    // Lo stile overflow e resize è meglio gestirlo via CSS, 
    // ma se vuoi tenerlo qui, lascialo pure.
    el.dataset.minRows = el.rows || 1;
    
    el.addEventListener("input", () => expand(el));
    if (el.value) expand(el);
  }

  // Eseguiamo il primo check
  document.querySelectorAll("textarea").forEach(setup);

  // Observer ottimizzato
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== 1) continue; // Salta se non è un elemento HTML
        
        // Se il nodo stesso è una textarea lo inizializza, 
        // altrimenti cerca textarea al suo interno
        if (node.matches("textarea")) setup(node);
        node.querySelectorAll?.("textarea").forEach(setup);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}