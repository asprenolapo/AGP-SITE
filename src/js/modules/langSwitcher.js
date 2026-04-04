// Cache delle traduzioni — evita di fare fetch multipli
let translations = null;

// Carica lang.json una sola volta e lo salva in memoria
async function loadTranslations() {
  if (translations) return translations;
  const response = await fetch("/_data/lang.json");
  translations = await response.json();
  return translations;
}

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

// Determina la lingua iniziale:
// 1. Usa quella salvata in localStorage se presente
// 2. Usa quella del browser se disponibile in lang.json
// 3. Ricade sulla lingua di fallback
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

// Applica la lingua a tutti gli elementi con data-lang-key
// Supporta chiavi annidate tipo "homepage.hero_title"
function applyLanguage(lang, data) {
  document.querySelectorAll("[data-lang-key]").forEach((element) => {
    const key = element.dataset.langKey;
    const keys = key.split(".");
    let value = data[lang];
    keys.forEach((k) => { value = value?.[k]; });
    if (value) element.textContent = value;
  });
}