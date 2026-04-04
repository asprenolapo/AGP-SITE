// initFormListener.js
import { showNotification } from "../notification.js";
import { isValidEmailProvider } from "./checkEmailProvider.js";

export function initFormListener() {
  const forms = document.querySelectorAll(".needs-validation");

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("form-invalid");
        showNotification("⚠️ Compila i campi obbligatori.", "error");
        return;
      }

      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && !isValidEmailProvider(emailInput.value)) {
        form.classList.add("form-invalid");
        form.classList.remove("was-validated");
        showNotification(
          "❌ Provider email non valido (Usa Gmail, Outlook, ecc.).",
          "error",
        );
        return;
      }

      showNotification("Invio in corso...", "success", "permanent");

      fetch("", {
        method: "POST",
        body: new FormData(form),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          form.classList.remove("form-invalid");
          form.classList.add("was-validated");
          showNotification("Messaggio inviato con successo! ✨", "success");
          form.reset();
          form.classList.remove("was-validated");
        })
        .catch((error) => {
          console.error(error);
          showNotification("❌ Errore durante l'invio.", "error");
        });
    });
  });
}