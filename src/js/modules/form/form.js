// initFormListener.js
import { showNotification } from "../notification.js";
import { isValidEmailProvider } from "./checkEmailProvider.js";
import { translations, currentLang } from "../langSwitcher.js";

export function initFormListener() {
  const forms = document.querySelectorAll(".needs-validation");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // 1. Recupero traduzioni e pulsante
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      const lang = (translations && currentLang) ? translations[currentLang].notifications : {};

      // 2. Validazione campi obbligatori HTML5
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        showNotification(lang.formInvalidFields || "Compila tutti i campi obbligatori", "error");
        return;
      }

      // 3. Validazione specifica Provider Email
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && !isValidEmailProvider(emailInput.value)) {
        showNotification(lang.invalidEmailProvider || "Provider email non supportato", "error");
        emailInput.focus();
        return;
      }

      // 4. Inizio processo di invio
      if (submitBtn) submitBtn.disabled = true;
      
      // Mostra notifica di caricamento (permanente con spinner)
      showNotification(lang.sending || "Invio in corso...", "success", "permanent");

      const formData = new FormData(form);

      fetch("/php/sendForm.php", {
        method: "POST",
        body: formData,
      })
      .then(async (response) => {
        if (!response.ok) throw new Error("Network response error");
        return response.text();
      })
      .then((data) => {
        // La nuova notifica di successo rimuoverà automaticamente quella di caricamento
        showNotification(lang.formSubmitSuccess || data, "success");
        
        form.reset();
        form.classList.remove("was-validated");
      })
      .catch((err) => {
        console.error(err);
        showNotification(lang.formSubmitError || "Errore durante l'invio", "error");
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  });
}