const cardsEl = document.getElementById("cards");
const searchEl = document.getElementById("search");
const themeBtn = document.getElementById("themeBtn");

fetch("data.json")
  .then(res => res.json())
  .then(data => render(data));

function render(data) {
  cardsEl.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${item.title}</h2>
      <div class="card-content">${item.content}</div>
      <button>विवरण</button>
    `;

    const btn = card.querySelector("button");
    btn.onclick = () => card.classList.toggle("open");

    cardsEl.appendChild(card);
  });
}

searchEl.addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.textContent.toLowerCase().includes(q)
      ? ""
      : "none";
  });
});

themeBtn.onclick = () => {
  document.documentElement.classList.toggle("dark");
};
