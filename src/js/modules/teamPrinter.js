/**
 * Funzione helper per creare elementi DOM in modo sicuro
 */
function createEl(tag, classNames = [], attributes = {}, text = '') {
  const el = document.createElement(tag);
  if (classNames.length > 0) el.classList.add(...classNames);
  Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
  if (text) el.textContent = text; 
  return el;
}

/**
 * Funzione principale per stampare i membri del team, i tutor e i partner.
 */
export function initTeam(data) {
  if (!data) return;

  // Supporta sia l'oggetto completo della traduzione che il sotto-oggetto card
  const card = data?.aboutUsPage?.teamSec?.card ?? data;

  try {
    const programmersContainer = document.getElementById('team-wrapper');
    const tutorsContainer = document.getElementById('advisor-wrapper');
    const partnersContainer = document.getElementById('partners-wrapper');

    // 1. Popolamento Programmatori
    if (programmersContainer) {
      programmersContainer.textContent = ""; 
      const programmers = card.programmers || [];

      programmers.forEach(person => {
        const fullName = `${person.name} ${person.surname}`;
        const avatarPath = `../../assets/images/foto-compagni/${fullName}.webp`;

        const slide = createEl('div', ['swiper-slide', 'center']);
        const article = createEl('article', ['team-card']);

        const cover = createEl('div', ['card-cover']);
        cover.appendChild(createEl('img', [], { src: '../../assets/images/motherboard.webp', alt: 'Sfondo' }));

        const avatar = createEl('div', ['card-avatar']);
        avatar.appendChild(createEl('img', [], { src: avatarPath, alt: fullName }));

        const info = createEl('div', ['card-info']);
        const h4 = createEl('h4', ['real-name', 'sec-sub-title'], {}, fullName);
        const h3 = createEl('h3', ['aka', 'sec-sub-title'], {}, `AKA: ${person.aka}`);
        const role = createEl('p', ['role'], {}, person.role);

        const mottoContainer = createEl('div', ['motto']);
        const mottoTitle = createEl('span', ['motto-title'], {}, `"${card.motto}"`);
        const mottoText = createEl('p', ['paragraph-home'], {}, `"${person.quote}"`);
        
        mottoContainer.append(mottoTitle, mottoText);
        info.append(h4, h3, role, mottoContainer);
        article.append(cover, avatar, info);
        slide.appendChild(article);

        programmersContainer.appendChild(slide);
      });
    }

    // 2. Popolamento Tutors
    if (tutorsContainer) {
      tutorsContainer.textContent = ""; 
      const tutors = card.tutors || [];

      tutors.forEach(person => {
        const fullName = `${person.name} ${person.surname}`;
        const avatarPath = `../../assets/images/foto-professori/${fullName}.webp`;

        const slide = createEl('div', ['swiper-slide']);
        const article = createEl('article', ['tutor-card']);

        const avatar = createEl('div', ['tutor-avatar']);
        avatar.appendChild(createEl('img', [], { src: avatarPath, alt: fullName }));

        const info = createEl('div', ['tutor-info']);
        const h2 = createEl('h2', ['sec-sub-title'], {}, fullName);
        const roleAka = createEl('p', ['tutor-role', 'known-as', 'sec-sub-title'], {}, person.aka);
        const role = createEl('p', ['tutor-role', 'sec-sub-title'], {}, person.role);
        const quote = createEl('p', ['paragraph-home'], {}, `"${person.quote}"`);

        info.append(h2, roleAka, role, quote);
        article.append(avatar, info);
        slide.appendChild(article);

        tutorsContainer.appendChild(slide);
      });
    }

    // 3. Popolamento Partner
    if (partnersContainer) {
      partnersContainer.textContent = ""; 
      const partners = card.partners || [];

      partners.forEach(partner => {
        const avatarPath = `../../assets/images/foto-partners/${partner.name}.webp`;

        const slide = createEl('div', ['swiper-slide']);
        const article = createEl('article', ['partner-card']);

        const avatar = createEl('div', ['partner-avatar']);
        avatar.appendChild(createEl('img', [], { src: avatarPath, alt: partner.name }));

        const h2 = createEl('h2', ['sec-sub-title'], {}, partner.name);

        article.append(avatar, h2);
        slide.appendChild(article);

        partnersContainer.appendChild(slide);
      });
    }

    // Inizializza gli Swiper con la velocità corretta
    initSwipers();

  } catch (error) {
    console.error("Errore nel rendering del team:", error);
  }
}

function initSwipers() {
  // Swiper Team (Velocità 3000ms)
  new Swiper('.team-swiper', {
    loop: true, 
    grabCursor: true, 
    spaceBetween: 30, 
    autoplay: { 
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 30 },
      1024: { slidesPerView: 3, spaceBetween: 40 } 
    }
  });

  // Swiper Advisor (Velocità 3000ms)
  new Swiper('.advisor-swiper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    autoplay: { 
        delay: 2500,
        disableOnInteraction: false, 
        reverseDirection: true,
        pauseOnMouseEnter: true
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      992: { slidesPerView: 2, spaceBetween: 40 } 
    }
  });

  // Swiper Partner (Velocità 3000ms)
  new Swiper('.partners-swiper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    autoplay: { 
        delay: 2500,
        disableOnInteraction: false, 
        pauseOnMouseEnter: true 
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 30 },
      1024: { slidesPerView: 3, spaceBetween: 40 } 
    }
  });
}