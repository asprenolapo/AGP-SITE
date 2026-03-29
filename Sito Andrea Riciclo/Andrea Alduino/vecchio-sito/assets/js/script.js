document.addEventListener('DOMContentLoaded', () => {
    const initializeTooltips = () => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    };

    const translations = {
        'it': {
            'language-name': 'Italiano',
            'language-header': 'Lingua',
            'nav-about': 'Chi sono',
            'nav-projects': 'Progetti',
            'nav-contact': 'Contatti',
            'download-cv-btn': 'Scarica CV',
            'settings-btn': 'Impostazioni',
            'appearance-header': 'Aspetto',
            'theme-text': 'Tema',
            'contrast-text': 'Contrasto', // MODIFICATO
            'animations-text': 'Animazioni',
            'hero-title': 'Andrea Alduino',
            'hero-text': 'Sviluppatore di siti web e software',
            'hero-button': 'Chi sono',
            'about-title': 'Chi sono',
            'about-description': 'Sono un appassionato sviluppatore web e software con una forte dedizione alla creazione di soluzioni innovative e funzionali. Mi piace affrontare nuove sfide, imparare costantemente e collaborare a progetti che richiedono creatività e precisione. Il mio obiettivo è trasformare idee complesse in esperienze digitali intuitive e accessibili.',
            'projects-title': 'Progetti',
            'projects-description': 'Una panoramica dei miei progetti più recenti e significativi, che mostrano le mie competenze e la mia esperienza in vari ambiti dello sviluppo.',
            'contact-title': 'Contatti',
            'contact-description': 'Se hai domande o vuoi collaborare, non esitare a contattarmi.',
            'footer-copyright': '© 2025 Andrea Alduino. Tutti i diritti riservati.',
            'tooltip-theme': 'Cambia lo schema di colori del sito tra chiaro e scuro.',
            'tooltip-contrast': 'Passa a una modalità con colori molto contrastanti, utile per l\'accessibilità.',
            'tooltip-animation': 'Disabilita tutte le transizioni e animazioni del sito per migliorare le prestazioni.',
            'color-filters-header': 'Filtri Colore',
            'protanopia-text': 'Protanopia',
            'deuteranopia-text': 'Deuteranopia',
            'tritanopia-text': 'Tritanopia',
            'tooltip-protanopia': 'Applica un filtro per aiutare chi soffre di Protanopia (difficoltà con il rosso).',
            'tooltip-deuteranopia': 'Applica un filtro per aiutare chi soffre di Deuteranopia (difficoltà con il verde).',
            'tooltip-tritanopia': 'Applica un filtro per aiutare chi soffre di Tritanopia (difficoltà con il blu).'
        },
        'en': {
            'language-name': 'English',
            'language-header': 'Language',
            'nav-about': 'About',
            'nav-projects': 'Projects',
            'nav-contact': 'Contact',
            'download-cv-btn': 'Download CV',
            'settings-btn': 'Settings',
            'appearance-header': 'Appearance',
            'theme-text': 'Theme',
            'contrast-text': 'Contrast', // MODIFICATO
            'animations-text': 'Animations',
            'hero-title': 'Andrea Alduino',
            'hero-text': 'Web and software developer',
            'hero-button': 'About Me',
            'about-title': 'About Me',
            'about-description': 'I am a passionate web and software developer with a strong dedication to creating innovative and functional solutions. I enjoy taking on new challenges, constantly learning, and collaborating on projects that require creativity and precision. My goal is to transform complex ideas into intuitive and accessible digital experiences.',
            'projects-title': 'Projects',
            'projects-description': 'An overview of my most recent and significant projects, showcasing my skills and experience in various development areas.',
            'contact-title': 'Contact',
            'contact-description': 'If you have any questions or would like to collaborate, feel free to contact me.',
            'footer-copyright': '© 2025 Andrea Alduino. All rights reserved.',
            'tooltip-theme': 'Change the color scheme of the site between light and dark.',
            'tooltip-contrast': 'Switch to a high-contrast mode, useful for accessibility.',
            'tooltip-animation': 'Disable all site transitions and animations to improve performance.',
            'color-filters-header': 'Color Filters',
            'protanopia-text': 'Protanopia',
            'deuteranopia-text': 'Deuteranopia',
            'tritanopia-text': 'Tritanopia',
            'tooltip-protanopia': 'Applies a filter to help those with Protanopia (red-blindness).',
            'tooltip-deuteranopia': 'Applies a filter to help those with Deuteranopia (green-blindness).',
            'tooltip-tritanopia': 'Applies a filter to help those with Tritanopia (blue-blindness).'
        },
        'es': {
            'language-name': 'Español',
            'language-header': 'Idioma',
            'nav-about': 'Quién soy',
            'nav-projects': 'Proyectos',
            'nav-contact': 'Contacto',
            'download-cv-btn': 'Descargar CV',
            'settings-btn': 'Ajustes',
            'appearance-header': 'Apariencia',
            'theme-text': 'Tema',
            'contrast-text': 'Contraste', // MODIFICATO
            'animations-text': 'Animaciones',
            'hero-title': 'Andrea Alduino',
            'hero-text': 'Desarrollador de sitios web y software',
            'hero-button': 'Quién soy',
            'about-title': 'Quién soy',
            'about-description': 'Soy un apasionado desarrollador web y de software con una gran dedicación a la creación de soluciones innovadoras y funcionales. Me gusta enfrentar nuevos desafíos, aprender constantemente y colaborar en proyectos que requieren creatividad y precisión. Mi objetivo es transformar ideas complejas en experiencias digitales intuitivas y accesibles.',
            'projects-title': 'Proyectos',
            'projects-description': 'Una visión general de mis proyectos más recientes y significativos, que muestran mis habilidades y experiencia en diversas áreas de desarrollo.',
            'contact-title': 'Contacto',
            'contact-description': 'Si tiene alguna pregunta o le gustaría colaborar, no dude en contactarme.',
            'footer-copyright': '© 2025 Andrea Alduino. Todos los derechos reservados.',
            'tooltip-theme': 'Cambia el esquema de colores del sitio entre claro e oscuro.',
            'tooltip-contrast': 'Cambiar a un modo de alto contraste, útil para la accesibilidad.',
            'tooltip-animation': 'Deshabilita todas las transiciones y animaciones del sitio para mejorar el rendimiento.',
            'color-filters-header': 'Filtros de Color',
            'protanopia-text': 'Protanopia',
            'deuteranopia-text': 'Deuteranopia',
            'tritanopia-text': 'Tritanopia',
            'tooltip-protanopia': 'Aplica un filtro para ayudar a quienes padecen Protanopia (ceguera al rojo).',
            'tooltip-deuteranopia': 'Aplica un filtro para ayudar a quienes padecen Deuteranopia (ceguera al verde).',
            'tooltip-tritanopia': 'Aplica un filtro para ayudar a quienes padecen Tritanopia (ceguera al azul).'
        },
        'fr': {
            'language-name': 'Français',
            'language-header': 'Langue',
            'nav-about': 'À propos',
            'nav-projects': 'Projets',
            'nav-contact': 'Contact',
            'download-cv-btn': 'Télécharger CV',
            'settings-btn': 'Paramètres',
            'appearance-header': 'Apparence',
            'theme-text': 'Thème',
            'contrast-text': 'Contraste', // MODIFICATO
            'animations-text': 'Animations',
            'hero-title': 'Andrea Alduino',
            'hero-text': 'Développeur de sites web et de logiciels',
            'hero-button': 'À propos de moi',
            'about-title': 'À propos',
            'about-description': 'Je suis un développeur web et logiciel passionné, avec un fort engagement à créer des solutions innovantes et fonctionnelles. J\'aime relever de nouveaux défis, apprendre constamment et collaborer sur des projets qui demandent créativité et précision. Mon objectif est de transformer des idées complexes en expériences numériques intuitives et accessibles.',
            'projects-title': 'Projets',
            'projects-description': 'Un aperçu de mes projets les plus récents et les plus significatifs, qui présentent mes compétences et mon expérience dans divers domaines de développement.',
            'contact-title': 'Contact',
            'contact-description': 'Si vous avez des questions ou souhaitez collaborer, n\'hésitez pas à me contacter.',
            'footer-copyright': '© 2025 Andrea Alduino. Tous droits réservés.',
            'tooltip-theme': 'Changez le jeu de couleurs du site entre clair et foncé.',
            'tooltip-contrast': 'Passez en mode à contraste élevé, utile pour l\'accessibilité.',
            'tooltip-animation': 'Désactivez toutes les transitions et animations du site pour améliorer les performances.',
            'color-filters-header': 'Filtres de Couleur',
            'protanopia-text': 'Protanopia',
            'deuteranopia-text': 'Deuteranopia',
            'tritanopia-text': 'Tritanopia',
            'tooltip-protanopia': 'Applique un filtre per aider ceux qui souffrent de Protanopie (cécité au rouge).',
            'tooltip-deuteranopia': 'Applique un filtro per aider ceux qui souffrent de Deutéranopie (cécité au vert).',
            'tooltip-tritanopia': 'Applique un filtro per aider ceux qui souffrent de Tritanopie (cécité au bleu).'
        },
        'de': {
            'language-name': 'Deutsch',
            'language-header': 'Sprache',
            'nav-about': 'Über mich',
            'nav-projects': 'Projekte',
            'nav-contact': 'Kontakt',
            'download-cv-btn': 'Lebenslauf herunterladen',
            'settings-btn': 'Einstellungen',
            'appearance-header': 'Erscheinung',
            'theme-text': 'Thema',
            'contrast-text': 'Kontrast', // MODIFICATO
            'animations-text': 'Animationen',
            'hero-title': 'Andrea Alduino',
            'hero-text': 'Web- und Softwareentwickler',
            'hero-button': 'Über mich',
            'about-title': 'Über mich',
            'about-description': 'Ich bin ein leidenschaftlicher Web- und Softwareentwickler mit einer starken Hingabe zur Schaffung innovativer und funktionaler Lösungen. Ich genieße es, neue Herausforderungen anzunehmen, ständig zu lernen und an Projekten zusammenzuarbeiten, die Kreativität und Präzision erfordern. Mein Ziel ist es, komplexe Ideen in intuitive und zugängliche digitale Erlebnisse zu verwandeln.',
            'projects-title': 'Projekte',
            'projects-description': 'Eine Übersicht über meine jüngsten und bedeutendsten Projekte, die meine Fähigkeiten und Erfahrungen in verschiedenen Entwicklungsbereichen zeigen.',
            'contact-title': 'Kontakt',
            'contact-description': 'Wenn Sie Fragen haben oder zusammenarbeiten möchten, zögern Sie nicht, mich zu kontaktieren.',
            'footer-copyright': '© 2025 Andrea Alduino. Alle Rechte vorbehalten.',
            'tooltip-theme': 'Ändern Sie das Farbschema der Website zwischen hell und dunkel.',
            'tooltip-contrast': 'Wechseln Sie in einen Modus mit hohem Kontrast, nützlich für die Barrierefreiheit.',
            'tooltip-animation': 'Deaktivieren Sie alle Übergänge und Animationen der Website, um die Leistung zu verbessern.',
            'color-filters-header': 'Farbfilter',
            'protanopia-text': 'Protanopie',
            'deuteranopia-text': 'Deuteranopie',
            'tritanopia-text': 'Tritanopie',
            'tooltip-protanopia': 'Wendet einen Filter an, um Menschen mit Protanopie (Rotblindheit) zu helfen.',
            'tooltip-deuteranopia': 'Wendet einen Filter an, um Menschen mit Deuteranopie (Grünblindheit) zu helfen.',
            'tooltip-tritanopia': 'Wendet einen Filter an, um Menschen mit Tritanopie (Blaublindheit) zu helfen.'
        }
    };
    
    const setLanguage = (lang) => {
        const currentLangData = translations[lang];
        if (!currentLangData) {
            console.error(`Traduzioni per la lingua "${lang}" non trovate.`);
            return;
        }

        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            if (currentLangData[key]) {
                if (element.hasAttribute('data-bs-toggle') && element.getAttribute('data-bs-toggle') === 'tooltip') {
                    const tooltipInstance = bootstrap.Tooltip.getInstance(element);
                    if (tooltipInstance) {
                        tooltipInstance.dispose();
                    }
                    element.setAttribute('data-bs-title', currentLangData[key]);
                } else {
                    element.textContent = currentLangData[key];
                }
            }
        });
        
        initializeTooltips();
        
        const currentLangText = document.getElementById('current-lang-text');
        if (currentLangText) {
            currentLangText.textContent = currentLangData['language-name'];
        }

        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
    };

    const switches = {
        theme: {
            desktop: document.getElementById('theme-switch'),
            mobile: document.getElementById('theme-switch-mobile')
        },
        contrast: {
            desktop: document.getElementById('contrast-switch'),
            mobile: document.getElementById('contrast-switch-mobile')
        },
        animation: {
            desktop: document.getElementById('animation-switch'),
            mobile: document.getElementById('animation-switch-mobile')
        },
        protanopia: {
            desktop: document.getElementById('protanopia-switch'),
            mobile: document.getElementById('protanopia-switch-mobile')
        },
        deuteranopia: {
            desktop: document.getElementById('deuteranopia-switch'),
            mobile: document.getElementById('deuteranopia-switch-mobile')
        },
        tritanopia: {
            desktop: document.getElementById('tritanopia-switch'),
            mobile: document.getElementById('tritanopia-switch-mobile')
        }
    };

    const languageLinks = document.querySelectorAll('[data-lang]');
    const savedTheme = localStorage.getItem('theme');
    const savedContrast = localStorage.getItem('high-contrast');
    const savedAnimations = localStorage.getItem('animations');
    const savedLanguage = localStorage.getItem('language');
    const savedColorFilter = localStorage.getItem('color-filter');

    const injectColorFilterSVG = () => {
        if (!document.getElementById('color-vision-filters')) {
            const svgFilters = `
                <svg id="color-vision-filters" style="height:0; width:0; position:absolute; visibility:hidden;">
                    <filter id="protanopia">
                        <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0
                                                               0.558, 0.442, 0, 0, 0
                                                               0, 0.242, 0.758, 0, 0
                                                               0, 0, 0, 1, 0" />
                    </filter>
                    <filter id="deuteranopia">
                        <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0
                                                               0.7, 0.3, 0, 0, 0
                                                               0, 0.3, 0.7, 0, 0
                                                               0, 0, 0, 1, 0" />
                    </filter>
                    <filter id="tritanopia">
                        <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0
                                                               0, 0.433, 0.567, 0, 0
                                                               0, 0.475, 0.525, 0, 0
                                                               0, 0, 0, 1, 0" />
                    </filter>
                </svg>
            `;
            document.body.insertAdjacentHTML('afterbegin', svgFilters);
        }
    };

    const applyColorFilter = (filterType) => {
        document.body.classList.remove('protanopia-filter', 'deuteranopia-filter', 'tritanopia-filter');

        Object.keys(switches).forEach(key => {
            if (key.includes('anopia')) {
                if (switches[key].desktop) switches[key].desktop.checked = false;
                if (switches[key].mobile) switches[key].mobile.checked = false;
            }
        });

        if (filterType && filterType !== 'none') {
            document.body.classList.add(`${filterType}-filter`);
            localStorage.setItem('color-filter', filterType);
            if (switches[filterType].desktop) switches[filterType].desktop.checked = true;
            if (switches[filterType].mobile) switches[filterType].mobile.checked = true;
        } else {
            localStorage.removeItem('color-filter');
        }
    };

    const setTheme = (isDark) => {
        if (switches.contrast.desktop && switches.contrast.desktop.checked) {
            setContrast(false);
        }

        if (isDark) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
        if (switches.theme.desktop) switches.theme.desktop.checked = isDark;
        if (switches.theme.mobile) switches.theme.mobile.checked = isDark;
    };

    const setContrast = (isHighContrast) => {
        if (isHighContrast) {
            setTheme(false);
            document.body.classList.add('high-contrast');
            localStorage.setItem('high-contrast', 'on');
        } else {
            document.body.classList.remove('high-contrast');
            localStorage.setItem('high-contrast', 'off');
        }
        if (switches.contrast.desktop) switches.contrast.desktop.checked = isHighContrast;
        if (switches.contrast.mobile) switches.contrast.mobile.checked = isHighContrast;
    };
    
    const setAnimations = (areEnabled) => {
        if (areEnabled) {
            document.body.classList.remove('no-animation');
            localStorage.setItem('animations', 'on');
        } else {
            document.body.classList.add('no-animation');
            localStorage.setItem('animations', 'off');
        }
        if (switches.animation.desktop) switches.animation.desktop.checked = areEnabled;
        if (switches.animation.mobile) switches.animation.mobile.checked = areEnabled;
    };
    
    injectColorFilterSVG();

    if (savedContrast === 'on') {
        setContrast(true);
    } else if (savedTheme === 'dark') {
        setTheme(true);
    } else {
        setTheme(false);
    }
    
    setAnimations(savedAnimations !== 'off');
    
    setLanguage(savedLanguage || 'it');

    if (savedColorFilter) {
        applyColorFilter(savedColorFilter);
    }
    
    const setupSwitchListeners = (switchType, handler) => {
        const desktopSwitch = switches[switchType].desktop;
        const mobileSwitch = switches[switchType].mobile;

        if (desktopSwitch) {
            desktopSwitch.addEventListener('change', (event) => {
                handler(event.target.checked);
            });
        }
        if (mobileSwitch) {
            mobileSwitch.addEventListener('change', (event) => {
                handler(event.target.checked);
            });
        }
    };

    setupSwitchListeners('theme', setTheme);
    setupSwitchListeners('contrast', setContrast);
    setupSwitchListeners('animation', setAnimations);
    setupSwitchListeners('protanopia', (checked) => applyColorFilter(checked ? 'protanopia' : 'none'));
    setupSwitchListeners('deuteranopia', (checked) => applyColorFilter(checked ? 'deuteranopia' : 'none'));
    setupSwitchListeners('tritanopia', (checked) => applyColorFilter(checked ? 'tritanopia' : 'none'));

    if (languageLinks) {
        languageLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedLang = link.dataset.lang;
                setLanguage(selectedLang);
            });
        });
    }
});