
import data from '../../json/mailProviders.json' with { type: 'json' };

const officialProviders = data.official_providers;

export function isValidEmailProvider(email) {
    if (!email || !email.includes("@")) return false;
    const domain = email.split("@")[1].toLowerCase().trim();
    
    return officialProviders.includes(domain);
}

// Restituisce un messaggio di errore standard se il provider non è valido
export function getInvalidProviderMessage() {
    return "Il fornitore email non è tra quelli supportati ufficialmente.";
}

export function initCheckEmailProvider() { 
    // Dati già caricati tramite import
}