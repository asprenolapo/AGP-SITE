import { showNotification } from '../notification.js';
import { isValidEmailProvider } from './checkEmailProvider.js';

export async function initFormListener() {
    const forms = document.querySelectorAll(".needs-validation");
    let officialProviders = [];

    // Carichiamo il JSON una sola volta all'avvio del listener
    try {
        const response = await fetch('./modules/form/providers.json');
        const data = await response.json();
        officialProviders = data.official_providers;
    } catch (error) {
        console.error("Errore nel caricamento del file JSON dei provider:", error);
    }

    forms.forEach(form => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            // 1. Validazione HTML5 standard
            if (!form.checkValidity()) {
                form.classList.add("form-invalid");
                showNotification("⚠️ Compila i campi obbligatori.", "error");
                return;
            }

            // --- CONTROLLO PROVIDER AGGIORNATO ---
            const emailInput = form.querySelector('input[type="email"]');
            // Passiamo sia il valore dell'email che la lista caricata dal JSON
            if (emailInput && !isValidEmailProvider(emailInput.value, officialProviders)) {
                form.classList.add("form-invalid");
                form.classList.remove("was-validated");
                showNotification("❌ Provider email non valido (Usa Gmail, Outlook, ecc.).", "error");
                return;
            }

            // 2. Successo e Invio
            form.classList.remove("form-invalid");
            form.classList.add("was-validated");
            showNotification("Invio in corso...", "success", "permanent");

            setTimeout(() => {
                showNotification("Messaggio inviato con successo! ✨", "success");
                form.reset();
                form.classList.remove("was-validated");
            }, 2000);
        });
    });
}