import { initTeam } from './teamPrinter.js';

export let currentLang = null;
export let translations = null;

async function loadTranslations() {
  if (translations) return translations;
  const response = await fetch("/_data/lang.json");
  translations = await response.json();
  return translations;
}

export async function initLangSwitcher() {
  const data = await loadTranslations();
  const availableLangs = Object.keys(data);
  const fallbackLang = document.documentElement.lang || availableLangs[0];
  const initialLang = await getInitialLang(availableLangs, fallbackLang);

  applyLanguage(initialLang, data);

  document.querySelectorAll("input[name='lang-switcher']").forEach((radio) => {
    if (radio.value === initialLang) radio.checked = true;

    radio.addEventListener("change", () => {
      const newLang = radio.value;
      localStorage.setItem("language", newLang);
      applyLanguage(newLang, data);
    });
  });
}

async function getInitialLang(availableLangs, fallbackLang) {
  if (localStorage.getItem("language")) return localStorage.getItem("language");
  const browserLang = navigator.language.slice(0, 2);
  return availableLangs.includes(browserLang) ? browserLang : fallbackLang;
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function applyLanguage(lang, data) {
  currentLang = lang;
  translations = data;
  const langData = data[lang];

  // 1. Traduzione testi standard
  document.querySelectorAll("[data-lang-key]").forEach((element) => {
    const key = element.dataset.langKey;
    const value = getNestedValue(langData, key);
    if (value) element.textContent = value;
  });

  // 2. Traduzione Placeholders
  document.querySelectorAll("[data-lang-placeholder]").forEach((element) => {
    const key = element.dataset.langPlaceholder;
    const value = getNestedValue(langData, key);
    if (value) element.setAttribute("placeholder", value);
  });

  // 3. Aggiornamento Dinamico Team
  const teamWrapper = document.getElementById('team-wrapper');
  const advisorWrapper = document.getElementById('advisor-wrapper');
  
  if (teamWrapper || advisorWrapper) {
    const teamData = getNestedValue(langData, "aboutUsPage.teamSec.card");
    if (teamData) {
      initTeam(teamData);
    }
  }

  document.documentElement.lang = lang;
}