// initFormListener.js
import { showNotification } from "../notification.js";
import { isValidEmailProvider } from "./checkEmailProvider.js";
import { translations, currentLang } from "../langSwitcher.js";

export function initFormListener() {
  const forms = document.querySelectorAll(".needs-validation");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Definiamo la costante subito
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      const lang = (translations && currentLang) ? translations[currentLang].notifications : {};

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        showNotification(lang.formInvalidFields || "Errore", "error");
        return;
      }

      if (submitBtn) submitBtn.disabled = true;

      fetch("/php/sendForm.php", {
        method: "POST",
        body: new FormData(form),
      })
      .then(r => r.text())
      .then(data => {
        showNotification(data, "success");
        form.reset();
        form.classList.remove("was-validated");
      })
      .catch(err => showNotification("Errore", "error"))
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  });
}