// initFormListener.js
import { showNotification } from "../notification.js";
import { translations, currentLang } from "../langSwitcher.js";
import { isValidEmailProvider } from "./checkEmailProvider.js";

export function initFormListener() {
  const forms = document.querySelectorAll(".needs-validation");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      const lang = translations[currentLang].notifications;

      // 1. Validazione campi obbligatori HTML5
      if (!form.checkValidity()) {
        form.classList.add("was-validated");

        // Distingui tra errore provider email e campo mancante/malformato
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.validity.customError) {
          showNotification(lang.invalidEmailProvider, "error");
          emailInput.focus();
        } else {
          showNotification(lang.formInvalidFields, "error");
        }
        return;
      }

      // 2. Validazione provider email (doppio controllo nel caso checkEmailProvider non sia attivo)
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && !isValidEmailProvider(emailInput.value)) {
        showNotification(lang.invalidEmailProvider, "error");
        emailInput.focus();
        return;
      }

      // 3. Inizio processo di invio
      if (submitBtn) submitBtn.disabled = true;
      showNotification(lang.sending, "info", "permanent");

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
        if (data.trim() === "success") {
          showNotification(lang.messageSent, "success");
          form.reset();
          form.classList.remove("was-validated");
        } else {
          showNotification(lang.sendError, "error");
        }
      })
      .catch((err) => {
        console.error(err);
        showNotification(lang.sendError, "error");
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  });
}