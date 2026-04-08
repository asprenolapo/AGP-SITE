import lang from '../../../_data/lang.json' with { type: 'json' };
import data from '../../json/mailProviders.json' with { type: 'json' };
import { currentLang } from '../langSwitcher.js';

const officialProviders = data.official_providers;

export function isValidEmailProvider(email) {
  if (!email || !email.includes("@")) return true;
  const domain = email.split("@")[1].toLowerCase().trim();
  return officialProviders.includes(domain);
}

export function initCheckEmailProvider() {

  function validate(input) {
    if (!input) return;
    const email = input.value;

    if (!email || !email.includes("@")) {
      input.setCustomValidity("");
      return;
    }

    if (isValidEmailProvider(email)) {
      input.setCustomValidity("");
    } else {
      input.setCustomValidity(lang[currentLang].notifications.invalidEmailProvider);
    }
  }

  document.querySelectorAll('input[type="email"]').forEach((input) => {
    validate(input);
    input.addEventListener("input", () => validate(input));
    input.addEventListener("blur", () => validate(input));
  });
}