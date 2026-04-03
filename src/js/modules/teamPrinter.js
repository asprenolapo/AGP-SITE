import teamData from '../json/teamData.json';

// ─── RENDER ───────────────────────────────────────────────────────────────────

function createPersonCard(person) {
  const fullName = `${person.name} ${person.surname}`;
  const imagePath = `../assets/images/foto-compagni/${fullName}.webp`;

  return `
    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <div class="person-card">
        <div class="avatar-wrapper">
          <img
            class="avatar"
            alt="Foto di ${fullName}"
            src="${imagePath}"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div class="avatar-fallback" style="display:none;">
            ${person.name.charAt(0)}${person.surname.charAt(0)}
          </div>
        </div>

        <p class="card-name">${fullName}</p>
        <p class="card-known-as">${person["known-as"]}</p>
        <span class="card-role">${person.role}</span>
        <hr class="card-divider" />
        <p class="card-quote">"${person.quote}"</p>
      </div>
    </div>
  `;
}

function renderAllCategories(teamData) {
  Object.entries(teamData).forEach(([categoryKey, categoryData]) => {
    const container = document.getElementById(`cards-${categoryKey}`);

    if (!container) {
      console.warn(`Contenitore non trovato per la categoria: ${categoryKey}`);
      return;
    }

    container.innerHTML = categoryData.people
      .map(person => createPersonCard(person))
      .join("");
  });
}

export function initTeam() {
  renderAllCategories(teamData);
}