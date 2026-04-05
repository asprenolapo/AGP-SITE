// initFormListener.js
import { showNotification } from "../notification.js";
import { isValidEmailProvider } from "./checkEmailProvider.js";
import { translations, currentLang } from "../langSwitcher.js";

export function initFormListener() {
  const forms = document.querySelectorAll(".needs-validation");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const lang = translations[currentLang].notifications;

      if (!form.checkValidity()) {
        form.classList.add("form-invalid");
        showNotification(lang.formInvalidFields, "error");
        return;
      }

      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && !isValidEmailProvider(emailInput.value)) {
        form.classList.add("form-invalid");
        form.classList.remove("was-validated");
        showNotification(lang.invalidEmailProvider, "error");
        return;
      }

      showNotification(lang.sending, "success", "permanent");

      fetch("", { method: "POST", body: new FormData(form) })
        .then((response) => response.text())
        .then((data) => {
          form.classList.remove("form-invalid");
          form.classList.add("was-validated");
          showNotification(lang.messageSent, "success");
          form.reset();
          form.classList.remove("was-validated");
        })
        .catch((error) => {
          console.error(error);
          showNotification(lang.sendError, "error");
        });
    });
  });
}