// Cache delle traduzioni — evita di fare fetch multipli
export let currentLang = null;
export let translations = null;

/**
 * Carica lang.json una sola volta e lo salva in memoria
 */
async function loadTranslations() {
  if (translations) return translations;
  const response = await fetch("/_data/lang.json");
  translations = await response.json();
  return translations;
}

/**
 * Inizializza lo switcher di lingua
 */
export async function initLangSwitcher() {
  const data = await loadTranslations();

  // Lingue disponibili lette dinamicamente da lang.json
  const availableLangs = Object.keys(data);

  // Lingua di fallback: legge lang="..." dall'<html>, oppure la prima disponibile
  const fallbackLang = document.documentElement.lang || availableLangs[0];

  const initialLang = await getInitialLang(availableLangs, fallbackLang);
  applyLanguage(initialLang, data);

  // Ascolta tutti i radio button con name="lang-switcher"
  document.querySelectorAll("input[name='lang-switcher']").forEach((radio) => {
    // Seleziona il radio corrispondente alla lingua attiva
    if (radio.value === initialLang) {
      radio.checked = true;
    }

    radio.addEventListener("change", () => {
      const newLang = radio.value;
      localStorage.setItem("language", newLang);
      applyLanguage(newLang, data);
    });
  });
}

/**
 * Determina la lingua iniziale
 */
async function getInitialLang(availableLangs, fallbackLang) {
  if (localStorage.getItem("language")) {
    return localStorage.getItem("language");
  }

  const browserLang = navigator.language.slice(0, 2);
  if (availableLangs.includes(browserLang)) {
    return browserLang;
  }

  return fallbackLang;
}

/**
 * Funzione Helper per navigare nel JSON usando stringhe dot-notation (es. "header.navHome")
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Applica la lingua a tutti gli elementi con data-lang-key e data-lang-placeholder
 */
function applyLanguage(lang, data) {
  currentLang = lang;
  translations = data;
  const langData = data[lang];

  // 1. Traduzione dei testi (textContent)
  document.querySelectorAll("[data-lang-key]").forEach((element) => {
    const key = element.dataset.langKey;
    const value = getNestedValue(langData, key);
    if (value) {
      // Se è un elemento di testo standard, aggiorna il contenuto
      element.textContent = value;
    }
  });

  // 2. Traduzione dei PLACEHOLDER
  document.querySelectorAll("[data-lang-placeholder]").forEach((element) => {
    const key = element.dataset.langPlaceholder;
    const value = getNestedValue(langData, key);
    if (value) {
      // Aggiorna l'attributo placeholder dell'input/textarea
      element.setAttribute("placeholder", value);
    }
  });

  // Opzionale: aggiorna l'attributo lang dell'HTML per SEO e accessibilità
  document.documentElement.lang = lang;
} 