const eventList = document.getElementById("eventList");
const statusText = document.getElementById("status");
const savedPlan = document.getElementById("savedPlan");
const search = document.getElementById("search");

let events = [];
let plan = JSON.parse(localStorage.getItem("dmcePlan") || "[]");

async function loadEvents() {
  statusText.textContent = "Loading event data...";
  try {
    const response = await fetch("data/events.json");
    if (!response.ok) throw new Error("Could not load event data.");
    events = await response.json();
    statusText.textContent = `${events.length} events loaded from JSON.`;
    renderEvents();
    renderPlan();
  } catch (error) {
    statusText.textContent = error.message;
    eventList.innerHTML = `<div class="error">Run this project with Live Server so Fetch can access the JSON file.</div>`;
  }
}

function renderEvents() {
  const q = search.value.toLowerCase().trim();
  const filtered = events.filter(e =>
    e.name.toLowerCase().includes(q) ||
    e.destination.toLowerCase().includes(q) ||
    e.category.toLowerCase().includes(q)
  );

  eventList.innerHTML = filtered.map(event => `
    <article class="card">
      <img src="${event.image}" alt="${event.destination}">
      <div class="card-body">
        <small>${event.category} • ${event.date}</small>
        <h3>${event.name}</h3>
        <p>${event.description}</p>
        <p><strong>₹${event.price.toLocaleString("en-IN")}</strong></p>
        <button data-id="${event.id}">Save to My Plan</button>
      </div>
    </article>
  `).join("");

  eventList.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => saveEvent(Number(btn.dataset.id)));
  });
}

function saveEvent(id) {
  if (!plan.includes(id)) plan.push(id);
  localStorage.setItem("dmcePlan", JSON.stringify(plan));
  renderPlan();
}

function removeEvent(id) {
  plan = plan.filter(item => item !== id);
  localStorage.setItem("dmcePlan", JSON.stringify(plan));
  renderPlan();
}

function renderPlan() {
  const selected = events.filter(e => plan.includes(e.id));
  savedPlan.innerHTML = selected.length
    ? selected.map(e => `<div class="saved"><strong>${e.name}</strong> — ${e.destination} — ₹${e.price.toLocaleString("en-IN")} <button class="remove" data-id="${e.id}">Remove</button></div>`).join("")
    : "<p>No events saved yet.</p>";

  savedPlan.querySelectorAll(".remove").forEach(btn => {
    btn.addEventListener("click", () => removeEvent(Number(btn.dataset.id)));
  });
}

search.addEventListener("input", renderEvents);
document.getElementById("clearPlan").addEventListener("click", () => {
  plan = [];
  localStorage.removeItem("dmcePlan");
  renderPlan();
});

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

loadEvents();
