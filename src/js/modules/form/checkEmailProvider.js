import lang from '../../../_data/lang.json' with { type: 'json' };

import data from '../../json/mailProviders.json' with { type: 'json' };

const officialProviders = data.official_providers;

//==========================
// EMAIL PROVIDER VALIDATION MODULE
//==========================

// Validates all existing and future email inputs against a JSON list of official providers
// Must be called inside DOMContentLoaded in the page's JS file
export function initCheckEmailProvider() {

  function validate(input) {
    if (!input) return;

    const email = input.value;

    // Se il campo è vuoto o non ha ancora la chiocciola, rimuoviamo l'errore custom.
    // Lasciamo che siano gli attributi HTML (es. "required" o "type=email") a gestirlo
    if (!email || !email.includes("@")) {
      input.setCustomValidity("");
      return;
    }

    // Estraiamo il dominio (es. da "test@gmail.com" prendiamo "gmail.com")
    const domain = email.split("@")[1].toLowerCase().trim();
    
    // Controlliamo se il dominio è nella nostra whitelist
    if (officialProviders.includes(domain)) {
      // Valido: resettiamo lo stato di errore nativo
      input.setCustomValidity(""); 
    } else {
      // Non valido: impostiamo un errore. Questo farà fallire form.checkValidity() in form.js
      input.setCustomValidity("lang.invalidEmailProvider"); // Puoi usare una chiave di traduzione qui se vuoi supportare più lingue
    }
  }

  // 1. Applica la validazione agli input email già presenti nel DOM
  document.querySelectorAll('input[type="email"]').forEach(validate);

// Restituisce un messaggio di errore standard se il provider non è valido
export function getInvalidProviderMessage() {
    return "Il fornitore email non è tra quelli supportati ufficialmente.";
}

export function initCheckEmailProvider() { 
    // Dati già caricati tramite import
}