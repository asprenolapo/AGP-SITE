import teamData from '../json/teamData.json';

// ─── RENDER ───────────────────────────────────────────────────────────────────

// Rimosso 'async' perché non facciamo più richieste di rete esterne
export function initTeam() {
  try {
    const teamWrapper = document.getElementById('team-wrapper');
    const advisorWrapper = document.getElementById('advisor-wrapper');

    // USIAMO DIRETTAMENTE LA VARIABILE IMPORTATA ALLA RIGA 1!
    const aiPeople = teamData.ai.people;

    // 3. Ciclo per Popolare i Nodi Operativi (Swiper Team)
    aiPeople.forEach(person => {
      const randomAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(person["known-as"])}`;

      teamWrapper.innerHTML += `
        <div class="swiper-slide center">
          <article class="team-card">
            <div class="card-cover">
              <img src="../../assets/images/motherboard.webp" alt="Sfondo">
            </div>
            <div class="card-avatar">
              <img src="${randomAvatar}" alt="${person.name} ${person.surname}">
            </div>
            <div class="card-info">
              <h3 class="aka sec-sub-title">AKA: ${person["known-as"]}</h3>
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

    // 4. Ciclo per Popolare i Custodi (Swiper Advisor)
    aiPeople.forEach(person => {
      const randomAdvisorAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${person.name}%20${person.surname}&backgroundColor=1a1a1a`;

      advisorWrapper.innerHTML += `
        <div class="swiper-slide">
          <article class="advisor-card">
            <div class="advisor-avatar">
              <img src="${randomAdvisorAvatar}" alt="${person.name} ${person.surname}">
            </div>
            <div class="advisor-info">
              <h2 class"sec-sub-title">${person.name} ${person.surname}</h2>
              <p class="advisor-role sec-sub-title">${person.role}</p>
              <p class="paragraph-home">"${person.quote}"</p>
            </div>
          </article>
        </div>`;
    });

    // 5. Inizializziamo Swiper DOPO aver iniettato tutto l'HTML
    initSwipers();

  } catch (error) {
    console.error("Errore nel rendering dei dati:", error);
  }
}

// Funzione per inizializzare gli Swiper
function initSwipers() {
  
  const teamSwiper = new Swiper('.team-swiper', {
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

  const advisorSwiper = new Swiper('.advisor-swiper', {
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

// function createPersonCard(person) {
//   const fullName = `${person.name} ${person.surname}`;
//   const imagePath = `../assets/images/foto-compagni/${fullName}.webp`;

//   return `
//     <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
//       <div class="person-card">
//         <div class="avatar-wrapper">
//           <img
//             class="avatar"
//             alt="Foto di ${fullName}"
//             src="${imagePath}"
//             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
//           />
//           <div class="avatar-fallback" style="display:none;">
//             ${person.name.charAt(0)}${person.surname.charAt(0)}
//           </div>
//         </div>

//         <p class="card-name">${fullName}</p>
//         <p class="card-known-as">${person["known-as"]}</p>
//         <span class="card-role">${person.role}</span>
//         <hr class="card-divider" />
//         <p class="card-quote">"${person.quote}"</p>
//       </div>
//     </div>
//   `;
// }

// function renderAllCategories(teamData) {
//   Object.entries(teamData).forEach(([categoryKey, categoryData]) => {
//     const container = document.getElementById(`cards-${categoryKey}`);

//     if (!container) {
//       console.warn(`Contenitore non trovato per la categoria: ${categoryKey}`);
//       return;
//     }

//     container.innerHTML = categoryData.people
//       .map(person => createPersonCard(person))
//       .join("");
//   });
// }

// export function initTeam() {
//   renderAllCategories(teamData);
// }