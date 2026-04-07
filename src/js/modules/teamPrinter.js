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
 * Funzione principale per stampare i membri del team e i tutor.
 */
export function initTeam(data) {
  if (!data) return;

  try {
    const programmersContainer = document.getElementById('team-wrapper');
    const tutorsContainer = document.getElementById('advisor-wrapper');

    // 1. Popolamento Programmatori
    if (programmersContainer) {
      programmersContainer.textContent = ""; 
      const programmers = data.programmers || [];

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
        const h3 = createEl('h3', ['aka', 'sec-sub-title'], {}, `AKA: ${person.aka}`);
        const h4 = createEl('h4', ['real-name', 'sec-sub-title'], {}, fullName);
        const role = createEl('p', ['role'], {}, person.role);

        const mottoContainer = createEl('div', ['motto']);
        const mottoTitle = createEl('span', ['motto-title'], {}, 'IL MIO MOTTO:');
        const mottoText = createEl('p', ['paragraph-home'], {}, `"${person.quote}"`);
        
        mottoContainer.append(mottoTitle, mottoText);
        info.append(h3, h4, role, mottoContainer);
        article.append(cover, avatar, info);
        slide.appendChild(article);

        programmersContainer.appendChild(slide);
      });
    }

    // 2. Popolamento Tutors
    if (tutorsContainer) {
      tutorsContainer.textContent = ""; 
      const tutors = data.tutors || [];

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
        delay: 3000, // Velocità standard ripristinata
        disableOnInteraction: false 
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
        delay: 3000, // Velocità standard ripristinata
        disableOnInteraction: false, 
        reverseDirection: true 
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      992: { slidesPerView: 2, spaceBetween: 40 } 
    }
  });
}