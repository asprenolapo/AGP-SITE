import teamData from '../json/teamData.json';

export function initTeam() {
  try {
    const programmersContainer = document.getElementById('team-wrapper');
    const tutorsContainer = document.getElementById('advisor-wrapper');

    // 1. ESTRAZIONE DATI DALLE NUOVE CHIAVI
    // Usiamo 'trainers' per il team principale e 'programmers' per gli advisor
    const programmers = teamData.programmers;
    const tutors = teamData.tutors;

    // 2. Popolamento Team Wrapper (Trainers - 6 persone)
    if (programmersContainer) {
      programmersContainer.innerHTML = ""; // Pulizia preventiva
      programmers.forEach(person => {
        const randomAvatar = `../../assets/images/foto-compagni/${person.name + " " + person.surname}.webp`;

        programmersContainer.innerHTML += `
          <div class="swiper-slide center">
            <article class="team-card">
              <div class="card-cover">
                <img src="../../assets/images/motherboard.webp" alt="Sfondo">
              </div>
              <div class="card-avatar">
                <img src="${randomAvatar}" alt="${person.name} ${person.surname}">
              </div>
              <div class="card-info">
                <h3 class="aka sec-sub-title">AKA: ${person.knownAs}</h3>
                <h4 class="real-name sec-sub-title">${person.name} ${person.surname}</h4>
                <p class="role">${person.role}</p>
                <div class="motto">
                  <span class="motto-title">IL MIO MOTTO:</span>
                  <p class="paragraph-home">"${person.quote}"</p>
                </div>
              </div>
            </article>
          </div>`;
      });
    }

    // 3. Popolamento Advisor Wrapper (Programmers - 27 persone)
    if (tutorsContainer) {
      tutorsContainer.innerHTML = ""; // Pulizia preventiva
      tutors.forEach(person => {
        const randomTutorAvatar = `../../assets/images/foto-professori/${person.name + " " + person.surname}.webp`;

        tutorsContainer.innerHTML += `
          <div class="swiper-slide">
            <article class="tutor-card">
              <div class="tutor-avatar">
                <img src="${randomTutorAvatar}" alt="${person.name} ${person.surname}">
              </div>
              <div class="tutor-info">
                <h2 class="sec-sub-title">${person.name} ${person.surname}</h2>
                <p class="tutor-role known-as sec-sub-title">${person.knownAs}</p>
                <p class="tutor-role sec-sub-title">${person.role}</p>
                <p class="paragraph-home">"${person.quote}"</p>
              </div>
            </article>
          </div>`;
      });
    }

    // 4. Inizializzazione Swiper
    initSwipers();

  } catch (error) {
    console.error("Errore nel rendering dei dati:", error);
  }
}

// Funzione per inizializzare gli Swiper (Resta invariata)
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