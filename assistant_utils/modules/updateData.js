const fileSystem = require('fs');
const SITE_DATA_PATH = 'src/_data/site.js';

function addSiteData(pageName) {
    const flatName = pageName.replace(/-/g, ''); 
    if (!fileSystem.existsSync(SITE_DATA_PATH)) return;

    let content = fileSystem.readFileSync(SITE_DATA_PATH, 'utf8');
    if (content.includes(`${flatName}:`)) return;
    
    const niceTitle = flatName.charAt(0).toUpperCase() + flatName.slice(1);
    
    // Usiamo 4 spazi esatti per l'indentazione
    const newPageEntry = `    ${flatName}: {
      seo: {
        title: "${niceTitle}",
        description: "description",
      },
    },`;

    if (content.includes('404:')) {
        // Inseriamo prima del 404 preservando l'andata a capo
        content = content.replace(/[ \t]*404:/, `${newPageEntry}\n    404:`);
    } else {
        content = content.replace(/pages: \{([\s\S]*?)\}/, (match, p1) => {
            return `pages: {${p1}\n${newPageEntry}\n  }`;
        });
    }

    fileSystem.writeFileSync(SITE_DATA_PATH, content);
    console.log(`[UPDATED] Record "${flatName}" aggiunto.`);
}

function removeSiteData(pageName) {
    const flatName = pageName.replace(/-/g, '');
    if (!fileSystem.existsSync(SITE_DATA_PATH)) return;

    let content = fileSystem.readFileSync(SITE_DATA_PATH, 'utf8');

    /**
     * MODIFICA CHIAVE:
     * Sostituiamo \s*\n? finale con [ \t]*\r?\n
     * In questo modo mangiamo gli spazi/tab DOPO la graffa sulla STESSA riga
     * e l'andata a capo, ma non tocchiamo l'indentazione della riga successiva.
     */
    const regex = new RegExp(`[ \\t]*${flatName}:\\s*\\{[[\\s\\S]*?seo:[\\s\\S]*?\\}\\s*,?\\s*\\},?\\s*[ \\t]*\\r?\\n`, 'g');

    if (!regex.test(content)) {
        // Fallback per strutture senza blocco SEO esplicito (per sicurezza)
        const fallbackRegex = new RegExp(`[ \\t]*${flatName}:\\s*\\{[\\s\\S]*?\\}\\s*\\},?\\s*[ \\t]*\\r?\\n`, 'g');
        content = content.replace(fallbackRegex, '');
    } else {
        content = content.replace(regex, '');
    }

    // Pulizia finale per non lasciare doppie virgole (es: , ,)
    let updatedContent = content.replace(/,[ \t]*,/g, ',');
    
    // Evita che si accumulino troppe righe vuote
    updatedContent = updatedContent.replace(/\n\s*\n\s*\n/g, '\n\n');

    fileSystem.writeFileSync(SITE_DATA_PATH, updatedContent);
    console.log(`[CLEANED] Record "${flatName}" rimosso (layout preservato).`);
}

module.exports = { addSiteData, removeSiteData };