const destinations = [
  {name:"Goa", category:"beach", image:"images/goa.svg", description:"Beaches, heritage and vibrant coastal culture."},
  {name:"Ladakh", category:"mountains", image:"images/ladakh.svg", description:"Mountains, monasteries and adventure."},
  {name:"Kerala", category:"nature", image:"images/kerala.svg", description:"Backwaters, greenery and rich traditions."},
  {name:"Rajasthan", category:"heritage", image:"images/rajasthan.svg", description:"Forts, palaces and colourful heritage."}
];

const grid = document.getElementById("destinationGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const resultCount = document.getElementById("resultCount");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

function renderDestinations() {
  const search = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;

  const filtered = destinations.filter(item =>
    (item.name.toLowerCase().includes(search) ||
     item.description.toLowerCase().includes(search)) &&
    (category === "all" || item.category === category)
  );

  grid.innerHTML = filtered.map((item, index) => `
    <article class="card">
      <img src="${item.image}" alt="${item.name}">
      <div class="card-body">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <button data-index="${destinations.indexOf(item)}">View Details</button>
      </div>
    </article>
  `).join("");

  resultCount.textContent = `${filtered.length} destination(s) found.`;

  document.querySelectorAll(".card button").forEach(button => {
    button.addEventListener("click", () => {
      const item = destinations[button.dataset.index];
      modalTitle.textContent = item.name;
      modalText.textContent = item.description + " Category: " + item.category + ".";
      modal.classList.remove("hidden");
    });
  });
}

searchInput.addEventListener("input", renderDestinations);
categoryFilter.addEventListener("change", renderDestinations);
document.getElementById("closeModal").addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", event => {
  if (event.target === modal) modal.classList.add("hidden");
});

document.getElementById("registrationForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const destination = document.getElementById("destination").value;
  document.getElementById("formMessage").textContent =
    `Thank you, ${name}! Your interest in ${destination} has been recorded for this demo.`;
  event.target.reset();
});

renderDestinations();
