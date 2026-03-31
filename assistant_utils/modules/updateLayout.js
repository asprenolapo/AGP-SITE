const fileSystem = require('fs');
const DYNAMIC_LAYOUT_PATH = 'src/layouts/dynamic_page.njk';

/**
 * Deve essere IDENTICA a quella in updatePage.js
 */
function toCamelCase(str) {
    return str.toLowerCase().replace(/[-_][a-z0-9]/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', '')
    );
}

function addLayout(pageName) {
    const camelName = toCamelCase(pageName); 
    if (!fileSystem.existsSync(DYNAMIC_LAYOUT_PATH)) return;

    let content = fileSystem.readFileSync(DYNAMIC_LAYOUT_PATH, 'utf8');
    
    // Evita duplicati controllando il camelName
    if (content.includes(`{% elif title == "${camelName}" %}`)) return;
    
    // Inseriamo il blocco elif usando il camelName corretto
    const newElif = `{% elif title == "${camelName}" %}\n  {#{% include "_exampleComponent.njk" %}#}\n\n`;
    
    // Inserisce prima dell'else
    const updatedContent = content.replace('{% else %}', `${newElif}{% else %}`);

    fileSystem.writeFileSync(DYNAMIC_LAYOUT_PATH, updatedContent);
    console.log(`[UPDATED] Blocco layout aggiunto per "${camelName}".`);
}

function removeLayout(pageName) {
    const camelName = toCamelCase(pageName);
    if (!fileSystem.existsSync(DYNAMIC_LAYOUT_PATH)) return;

    let content = fileSystem.readFileSync(DYNAMIC_LAYOUT_PATH, 'utf8');
    
    // Regex aggiornata per cercare il camelName
    const regex = new RegExp(`[ \\t]*\\{%\\s*elif\\s+title\\s*==\\s*"${camelName}"\\s*%\\}[\\s\\S]*?(?=[ \\t]*\\{%\\s*(?:elif|else|endif))`, 'g');

    if (!regex.test(content)) {
        console.log(`[DEBUG] Blocco layout per "${camelName}" non trovato. Saltato.`);
        return;
    }

    let updatedContent = content.replace(regex, '');
    updatedContent = updatedContent.replace(/\n\s*\n\s*\n/g, '\n\n');

    fileSystem.writeFileSync(DYNAMIC_LAYOUT_PATH, updatedContent);
    console.log(`[CLEANED] Blocco layout rimosso per "${camelName}".`);
}

module.exports = { addLayout, removeLayout };