const cardsEl = document.getElementById("cards");
const searchEl = document.getElementById("search");
const themeBtn = document.getElementById("themeBtn");

/* ------------------------------
   JSON Load
--------------------------------*/
fetch("./data.json")
  .then(res => {
    if (!res.ok) throw new Error("JSON load failed");
    return res.json();
  })
  .then(data => renderSchedules(data))
  .catch(err => {
    cardsEl.innerHTML = "<p>डेटा लोड हुन सकेन</p>";
    console.error(err);
  });

/* ------------------------------
   Render All Schedules
--------------------------------*/
function renderSchedules(data) {
  cardsEl.innerHTML = "";

  data.schedules.forEach(schedule => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${schedule.name}</h2>
      <div class="card-content">
        ${formatContent(schedule.content)}
      </div>
      <button class="toggle-btn">विवरण</button>
    `;

    const btn = card.querySelector(".toggle-btn");
    btn.addEventListener("click", () => {
      card.classList.toggle("open");
    });

    cardsEl.appendChild(card);
  });
}

/* ------------------------------
   Content Formatter
   (string | array | object)
--------------------------------*/
function formatContent(content) {

  // 1️⃣ String
  if (typeof content === "string") {
    return `<p>${content}</p>`;
  }

  // 2️⃣ Array
  if (Array.isArray(content)) {
    return `
      <ul>
        ${content.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;
  }

  // 3️⃣ Object (प्रदेश र जिल्ला)
  if (typeof content === "object") {
    return Object.entries(content)
      .map(([province, districts]) => `
        <div class="province">
          <h4>${province}</h4>
          <ul>
            ${districts.map(d => `<li>${d}</li>`).join("")}
          </ul>
        </div>
      `)
      .join("");
  }

  return "";
}

/* ------------------------------
   Search Filter
--------------------------------*/
searchEl.addEventListener("input", e => {
  const query = e.target.value.toLowerCase();

  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(query)
      ? ""
      : "none";
  });
});

/* ------------------------------
   Theme Toggle
--------------------------------*/
themeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
