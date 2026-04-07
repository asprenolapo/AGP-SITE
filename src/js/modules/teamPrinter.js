import teamData from '../json/teamData.json';

// Funzione helper per creare elementi DOM usando textContent in modo sicuro
function createEl(tag, classNames = [], attributes = {}, text = '') {
  const el = document.createElement(tag);
  if (classNames.length > 0) el.classList.add(...classNames);
  Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
  if (text) el.textContent = text; // <-- Qui usiamo textContent al posto di innerHTML
  return el;
}

export function initTeam() {
  try {
    const programmersContainer = document.getElementById('team-wrapper');
    const tutorsContainer = document.getElementById('advisor-wrapper');

    const programmers = teamData.programmers;
    const tutors = teamData.tutors;

    // 2. Popolamento Team Wrapper (Programmers)
    if (programmersContainer) {
      programmersContainer.textContent = ""; // Pulizia preventiva sicura

      programmers.forEach(person => {
        const fullName = `${person.name} ${person.surname}`;
        const randomAvatar = `../../assets/images/foto-compagni/${fullName}.webp`;

        // Creazione struttura DOM
        const slide = createEl('div', ['swiper-slide', 'center']);
        const article = createEl('article', ['team-card']);

        const cover = createEl('div', ['card-cover']);
        const coverImg = createEl('img', [], { src: '../../assets/images/motherboard.webp', alt: 'Sfondo' });
        cover.appendChild(coverImg);

        const avatar = createEl('div', ['card-avatar']);
        const avatarImg = createEl('img', [], { src: randomAvatar, alt: fullName });
        avatar.appendChild(avatarImg);

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

    // 3. Popolamento Advisor Wrapper (Tutors)
    if (tutorsContainer) {
      tutorsContainer.textContent = ""; // Pulizia preventiva sicura

      tutors.forEach(person => {
        const fullName = `${person.name} ${person.surname}`;
        const randomTutorAvatar = `../../assets/images/foto-professori/${fullName}.webp`;

        // Creazione struttura DOM
        const slide = createEl('div', ['swiper-slide']);
        const article = createEl('article', ['tutor-card']);

        const avatar = createEl('div', ['tutor-avatar']);
        const avatarImg = createEl('img', [], { src: randomTutorAvatar, alt: fullName });
        avatar.appendChild(avatarImg);

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

    // 4. Inizializzazione Swiper
    initSwipers();

  } catch (error) {
    console.error("Errore nel rendering dei dati:", error);
  }
}

// Funzione per inizializzare gli Swiper
function initSwipers() {
  new Swiper('.team-swiper', {
    loop: true, 
    grabCursor: true, 
    spaceBetween: 30, 
    autoplay: {
      delay: 2500, 
      disableOnInteraction: false, 
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 30 },
      1024: { slidesPerView: 3, spaceBetween: 40 } 
    }
  });

  new Swiper('.advisor-swiper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    autoplay: {
      delay: 3000, 
      disableOnInteraction: false,
      reverseDirection: true, 
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      992: { slidesPerView: 2, spaceBetween: 40 } 
    }
  });
}