document.addEventListener('DOMContentLoaded', async () => {
    const body = document.body;
    const html = document.documentElement;

    
    const mainLogo = document.getElementById('main-logo');
    const favicon = document.getElementById('favicon');
    const languageSwitcher = document.getElementById('language-switcher');
    const currentLangText = document.getElementById('current-lang-text');
    const settingsOffcanvas = document.getElementById('settingsOffcanvas');
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    const textSizeRadios = document.querySelectorAll('input[name="textSize"]');
    const reduceMotionSwitch = document.getElementById('reduceMotionSwitch');
    const colorblindFilterSwitcher = document.getElementById('colorblind-filter-switcher');
    const currentColorblindFilterText = document.getElementById('currentColorblindFilterText');
    const projectsCarousel = document.getElementById('projectsCarousel');
    const heroTitle = document.querySelector('#hero h1[data-i18n-key="hero-title"]');

    const logoChiaroSrc = 'assets/images/logo-chiaro.png';
    const logoScuroSrc = 'assets/images/logo-scuro.png';

    
    let translations = {};
    try {
        const response = await fetch('assets/js/translations.json');
        translations = await response.json();
    } catch (error) {
        console.error('Errore nel caricamento del file di traduzioni:', error);
    }
    
    const setLanguage = (lang, isInitialLoad = false) => {
        const langData = translations[lang] || translations['it'];
        
        
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            
            
            if (key === 'hero-title') {
                const nameText = langData['hero-title-name'] || 'Andrea,';
                const jobText = langData['hero-title-job'] || 'Web Developer';
                
                
                const nameNode = document.createTextNode(nameText + ' ');
                const jobSpan = document.createElement('span');
                jobSpan.id = 'job-title';
                jobSpan.textContent = jobText;
                
                element.innerHTML = ''; 
                element.appendChild(nameNode);
                element.appendChild(jobSpan);

                
                if (isInitialLoad) {
                    animateHeroTitle();
                }
            } else if (langData[key]) {
                
                element.innerHTML = langData[key];
            }
        });
        
        
        document.querySelectorAll('[data-i18n-placeholder-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder-key');
            if (langData[key]) {
                element.placeholder = langData[key];
            }
        });

        html.lang = lang;
        localStorage.setItem('language', lang);
        currentLangText.textContent = langData.langName;
        
        
        if (lang === 'ar') {
            html.dir = 'rtl';
            settingsOffcanvas.classList.remove('offcanvas-end');
            settingsOffcanvas.classList.add('offcanvas-start');
        } else {
            html.dir = 'ltr';
            settingsOffcanvas.classList.remove('offcanvas-start');
            settingsOffcanvas.classList.add('offcanvas-end');
        }
    };

    languageSwitcher.addEventListener('click', (e) => {
        const lang = e.target.getAttribute('data-lang');
        if (lang) {
            e.preventDefault();
            setLanguage(lang, false); 
        }
    });

    const settings = {
        theme: localStorage.getItem('theme') || 'dark',
        textSize: localStorage.getItem('textSize') || 'text-normal',
        reduceMotion: localStorage.getItem('reduceMotion') === 'true',
        colorblindFilter: localStorage.getItem('colorblindFilter') || 'none',
    };

    const applyLogoAndFavicon = () => {
        const isDarkThemeEffective = settings.theme === 'dark';
        if (isDarkThemeEffective) {
            mainLogo.src = logoChiaroSrc;
            favicon.href = logoChiaroSrc;
        } else {
            mainLogo.src = logoScuroSrc;
            favicon.href = logoScuroSrc;
        }
    };

    const applySettings = () => {
        html.setAttribute('data-bs-theme', settings.theme);
        const themeRadio = document.querySelector(`input[name="theme"][value="${settings.theme}"]`);
        if (themeRadio) themeRadio.checked = true;
        
        html.classList.remove('text-normal', 'text-large', 'text-xlarge');
        if (settings.textSize !== 'text-normal') {
            html.classList.add(settings.textSize);
        }
        const textSizeRadio = document.querySelector(`input[name="textSize"][value="${settings.textSize}"]`);
        if (textSizeRadio) textSizeRadio.checked = true;

        body.classList.toggle('reduce-motion', settings.reduceMotion);
        reduceMotionSwitch.checked = settings.reduceMotion;
        
        html.classList.remove('protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia');
        if (settings.colorblindFilter !== 'none') {
            html.classList.add(settings.colorblindFilter);
        }
        
        const selectedFilterOption = colorblindFilterSwitcher.querySelector(`[data-filter-value="${settings.colorblindFilter}"]`);
        if(selectedFilterOption) {
            currentColorblindFilterText.textContent = selectedFilterOption.textContent;
        }

        applyLogoAndFavicon();
    };

    if (projectsCarousel) {
        new bootstrap.Carousel(projectsCarousel, {
            interval: 5000,
            wrap: true
        });
    }

    themeRadios.forEach(radio => radio.addEventListener('change', (e) => {
        settings.theme = e.target.value;
        localStorage.setItem('theme', settings.theme);
        applySettings();
    }));
    textSizeRadios.forEach(radio => radio.addEventListener('change', (e) => {
        settings.textSize = e.target.value;
        localStorage.setItem('textSize', settings.textSize);
        applySettings();
    }));
    reduceMotionSwitch.addEventListener('change', (e) => {
        settings.reduceMotion = e.target.checked;
        localStorage.setItem('reduceMotion', settings.reduceMotion);
        applySettings();
    });
    colorblindFilterSwitcher.addEventListener('click', (e) => {
        const target = e.target.closest('.dropdown-item');
        if (target) {
            e.preventDefault();
            const filterValue = target.getAttribute('data-filter-value');
            settings.colorblindFilter = filterValue;
            localStorage.setItem('colorblindFilter', settings.colorblindFilter);
            applySettings();
        }
    });

    const settingsButton = document.getElementById('settings-button');
    if (settingsButton && settingsOffcanvas) {
        settingsOffcanvas.addEventListener('show.bs.offcanvas', () => settingsButton.classList.add('is-hidden'));
        settingsOffcanvas.addEventListener('hidden.bs.offcanvas', () => settingsButton.classList.remove('is-hidden'));
    }

    

    
    const animateHeroTitle = () => {
        if (!heroTitle || body.classList.contains('reduce-motion')) return;

        const textNodes = Array.from(heroTitle.childNodes);
        heroTitle.innerHTML = ''; 

        textNodes.forEach(node => {
            let text = node.textContent;
            let container = document.createDocumentFragment();

            text.split('').forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.className = 'char';
                charSpan.textContent = char === ' ' ? '\u00A0' : char; 
                container.appendChild(charSpan);
            });
            
            if (node.nodeType === Node.ELEMENT_NODE && node.id === 'job-title') {
                const jobTitleWrapper = document.createElement('span');
                jobTitleWrapper.id = 'job-title';
                jobTitleWrapper.appendChild(container);
                heroTitle.appendChild(jobTitleWrapper);
            } else {
                heroTitle.appendChild(container);
            }
        });

        const chars = heroTitle.querySelectorAll('.char');
        chars.forEach((char, index) => {
            setTimeout(() => {
                char.classList.add('animated');
            }, index * 50); 
        });
    };

    
    const setupScrollAnimations = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (animatedElements.length === 0 || body.classList.contains('reduce-motion')) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.1 
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    };
    
    
    setLanguage(localStorage.getItem('language') || 'it', true); 
    applySettings();
    setupScrollAnimations(); 
});