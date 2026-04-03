// modules/form/checkEmailProvider.js

import data from '../../json/providers.json' with { type: 'json' };

const officialProviders = data.official_providers;

export function isValidEmailProvider(email) {
    if (!email || !email.includes("@")) return false;
    const domain = email.split("@")[1].toLowerCase().trim();
    
    return officialProviders.includes(domain);
}

// Lasciamo la funzione vuota per non rompere il contactUs.js che la chiama
export function initCheckEmailProvider() { 
    // Non serve fare nulla, i dati sono già caricati dall'import sopra
}