// initFormListener.js
import { showNotification } from "../notification.js";
import { translations, currentLang } from "../langSwitcher.js";

export function initFormListener() {
  const forms = document.querySelectorAll(".needs-validation");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      const lang = (translations && currentLang) ? translations[currentLang].notifications : {};

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        showNotification(lang.formInvalidFields, "error");
        return;
      }

      // Disabilita il bottone
      if (submitBtn) submitBtn.disabled = true;

      // 1. Mostra la notifica di caricamento con lo spinner
      // Usiamo "permanent" così non scompare e attiva lo spinner nel tuo notification.js
      showNotification(lang.sending, "info", "permanent");

      fetch("/php/sendForm.php", {
        method: "POST",
        body: new FormData(form),
      })
      .then(response => response.text())
      .then(data => {
        // Uso trim() per sicurezza, nel caso il PHP stampi spazi vuoti o ritorni a capo per sbaglio

        if (data === "success") {
          // 2a. Successo
          showNotification(lang.messageSent, "success");
          form.reset();
          form.classList.remove("was-validated");
        } else {
          // 2b. Errore dal server (il PHP ha stampato l'errore)
          console.error(data);
          showNotification(lang.sendError, "error");
        }
      })
      .catch(error => {
        // 2c. Errore di rete (es. connessione caduta)
        console.error("Errore di rete/Fetch:", error);
        showNotification(lang.sendError, "error");
      })
      .finally(() => {
        // Riabilita il bottone a prescindere da come è andata
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  });
}