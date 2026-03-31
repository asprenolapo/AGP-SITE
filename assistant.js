const readline = require('readline');
const { addPage, removePage } = require('./assistant_utils/modules/updatePage');

// interfaccia readline
const readerInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true // forza la modalità terminale
});

// funzione per pulire l'input per i file (kebab-case: mia-pagina)
function toKebabCase(str) {
    return str.trim().toLowerCase()
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-');
}

function handleCreateRequest() {
    readerInterface.question('\n> inserisci il nome della nuova pagina: ', (inputName) => {
        const kebabName = toKebabCase(inputName);
        if (kebabName) {
            addPage(kebabName);
        } else {
            console.log('(!) nome non valido.');
        }
        displayMainMenu();
    });
}

function handleRemoveRequest() {
    readerInterface.question('\n> inserisci il nome della pagina da rimuovere: ', (inputName) => {
        const kebabName = toKebabCase(inputName);
        if (kebabName) {
            removePage(kebabName);
        }
        displayMainMenu();
    });
}

function displayMainMenu() {
    console.log('\n========================');
    console.log('     assistant cli      ');
    console.log('========================');
    console.log('1. crea pagina');
    console.log('2. rimuovi pagina');
    console.log('0. esci');
    
    // usiamo il cursore per far capire che aspettiamo input
    readerInterface.question('\nscegli un\'opzione: ', (choice) => {
        const cleanChoice = choice.trim();
        if (cleanChoice === '1') {
            handleCreateRequest();
        } else if (cleanChoice === '2') {
            handleRemoveRequest();
        } else if (cleanChoice === '0') {
            console.log('ciao!');
            readerInterface.close();
            process.exit(0); // uscita forzata pulita
        } else {
            console.log('(!) opzione non valida.');
            displayMainMenu();
        }
    });
}

// avvio esplicito
console.log('--- inizializzazione in corso... ---');
displayMainMenu();