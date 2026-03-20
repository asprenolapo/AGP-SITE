PROCEDURE GIT:

[!NOTE]
Accettare l'invito (arriva via mail o nelle notifiche di GitHub) prima di pushare.

<!-- Inizializzazione repo + First push con respository da creare: -->
echo "# Nome Repository" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:asprenolapo/AGP-SITE.git
git push -u origin main

<!-- First commit + First push con repository già creata: -->

git add .
git commit -m "Descrizione del commit"
git branch -M main
git push -u origin main


[!NOTE]
<!-- Split branch: -->

1. Crea un ramo per ogni modifica: Invece di lavorare sul main, ognuno crea il suo spazio:

git checkout -b nome-tua-modifica

2. Lavora e pusha sul tuo ramo:

git push origin nome-tua-modifica

<!-- Base work flow -->

1. Controlli cosa hai cambiato:


git status

2. Prepari i file:

git add .

3. Salvi il commit:


git commit -m "Completato il test: aggiunta logica X"

4. Invii tutto alla repo:

git push origin main

5. Prima di qualsiasi nuova modifica (commit + pusH) allineati alle repo:

git pull origin main

<!-- Clone repo: -->

1. Clicca sul tastone verde con scritto "<> Code".

2. Assicurati che sia selezionata la scheda HTTPS.

3. Clicca sull'icona dei due quadratini per copiare l'URL (es. https://github.com/utente/progetto.git).

4. Apri il Terminale e "Naviga", non clonare a caso sul Desktop creando disordine.

5. Crea una cartella per i tuoi progetti (es. Sviluppo).

6. Apri il terminale e scrivi:

cd Percorso/Della/Tua/Cartella

7. Ora scrivi il comando e incolla l'URL che hai copiato prima:

git clone https://github.com/utente/progetto.git

8. Entra nella cartella, Git creerà una nuova cartella con il nome del progetto. Devi entrarci per poter lavorare:

cd nome-del-progetto

[!NOTE]
Se è la prima volta che usi Git su quel PC, potrebbe chiederti chi sei. Se non lo configuri, non potrai fare il "commit" (salvare le modifiche). 

9. Lancia questi due comandi:

git config --global user.name "Il Tuo Nome"
git config --global user.email "la-tua-email@esempio.it"

