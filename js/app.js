// app.js - logic only. Data comes from data.js, layout from index.html, styles from styles.css.

// ===== 2. LOGIC =====
// Wizard idea: URL hash decides WHICH step is visible.
// Changing the hash also creates a browser history entry,
// so Chrome's Back button works naturally.

// --- Get page elements ---
const categoriesDiv = document.getElementById("categories");
const problemsDiv = document.getElementById("problems");
const resultDiv = document.getElementById("result");
const searchInput = document.getElementById("search");
const difficultySelect = document.getElementById("difficultyFilter");
const statusDiv = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const problemsNote = document.getElementById("problemsNote");
const sectionStep1 = document.getElementById("sectionStep1");
const sectionStep2 = document.getElementById("sectionStep2");
const sectionStep3 = document.getElementById("sectionStep3");

// --- Read the current route from the URL hash ---
// Examples: "#" -> step1 | "#step2/walls" -> problems of walls | "#step2/search" | "#step3/walls-small-crack"
function getRoute() {
  const h = location.hash.replace("#", "");
  if (h.startsWith("step2/")) return { type: "step2", id: h.slice(6) };
  if (h.startsWith("step3/")) return { type: "step3", id: h.slice(6) };
  return { type: "step1" };
}

function matchesDifficulty(r) {
  const d = difficultySelect.value;
  return d === "all" || r.difficulty === d;
}

// --- Draw category buttons ---
function showCategories() {
  categoriesDiv.innerHTML = "";
  for (const cat of categories) {
    const btn = document.createElement("button");
    btn.textContent = cat.name;
    btn.className = "choice-btn";
    btn.addEventListener("click", () => {
      location.hash = "step2/" + cat.id; // changes hash -> hashchange -> renderRoute
    });
    categoriesDiv.appendChild(btn);
  }
}

// --- Draw a list of problems as buttons ---
function renderProblems(list, noMatchText) {
  problemsDiv.innerHTML = "";
  if (list.length === 0) {
    problemsDiv.innerHTML = `<p>${noMatchText}</p>`;
    return;
  }
  for (const r of list) {
    const btn = document.createElement("button");
    btn.textContent = `${r.problem} (${r.difficulty})`;
    btn.className = "choice-btn";
    btn.addEventListener("click", () => {
      location.hash = "step3/" + r.id;
    });
    problemsDiv.appendChild(btn);
  }
}

// --- Build the solution guide HTML for one problem ---
function showResult(problemId) {
  const r = repairs.find(p => p.id === problemId);

  if (!r) {
    resultDiv.innerHTML = "<p>Sorry, we could not find that problem.</p>";
    return;
  }

  resultDiv.innerHTML = `
    <button id="favBtn" class="choice-btn"></button>
    <h3>${r.problem}</h3>
    <p><strong>Difficulty:</strong> ${r.difficulty} | <strong>Time:</strong> ${r.time} | <strong>Cost:</strong> ${r.cost}</p>

    <h4>What you might see</h4>
    <ul>${r.symptoms.map(s => `<li>${s}</li>`).join("")}</ul>

    <h4>Possible causes</h4>
    <ul>${r.causes.map(c => `<li>${c}</li>`).join("")}</ul>

    <h4>What to do</h4>
    <ol>${r.solutionSteps.map(s => `<li>${s}</li>`).join("")}</ol>

    <h4>Tools you need</h4>
    <ul>${r.tools.map(t => `<li>${t}</li>`).join("")}</ul>

    <h4>Materials / products to look for</h4>
    <ul>${r.materials.map(m => `<li>${m}</li>`).join("")}</ul>

    <div class="warning-box">
      <h4>⚠️ Safety</h4>
      <p>${r.safety}</p>
    </div>

    <h4>Call a professional when...</h4>
    <ul>${r.callProWhen.map(w => `<li>${w}</li>`).join("")}</ul>

    <h4>Prevention</h4>
    <p>${r.prevention}</p>
  `;

  // Wire the star button
  const favBtn = document.getElementById("favBtn");
  const updateFavBtn = () => {
    favBtn.textContent = getFavorites().includes(r.id) ? "⭐ Saved — click to remove" : "☆ Save this guide";
  };
  updateFavBtn();
  favBtn.addEventListener("click", () => {
    toggleFavorite(r.id);
    updateFavBtn();
  });
}

// --- Favorites (Stage 5-lite): stored in the browser with localStorage ---
const favoritesDiv = document.getElementById("favorites");

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  } catch {
    return [];
  }
}

function saveFavorites(list) {
  localStorage.setItem("favorites", JSON.stringify(list));
}

function toggleFavorite(problemId) {
  const favs = getFavorites();
  const i = favs.indexOf(problemId);
  if (i >= 0) favs.splice(i, 1);   // already saved -> remove
  else favs.push(problemId);        // not saved -> add
  saveFavorites(favs);
  return favs.includes(problemId);  // true = now saved
}

// Draw the saved repairs list on Step 1. localStorage survives page reload.
function renderFavorites() {
  const favs = getFavorites();
  favoritesDiv.innerHTML = "";

  if (favs.length === 0) {
    favoritesDiv.innerHTML = "<p>No saved repairs yet. Open a guide and tap the star button.</p>";
    return;
  }

  for (const id of favs) {
    const r = repairs.find(p => p.id === id);
    if (!r) continue; // saved id no longer exists -> skip it
    const btn = document.createElement("button");
    btn.textContent = "⭐ " + r.problem;
    btn.className = "choice-btn";
    btn.addEventListener("click", () => {
      location.hash = "step3/" + r.id;
    });
    favoritesDiv.appendChild(btn);
  }
}

// --- The heart of the wizard: draw whatever the current hash says ---
function renderRoute() {
  const route = getRoute();

  // Hide all steps first, then show only the needed one
  sectionStep1.classList.add("hidden");
  sectionStep2.classList.add("hidden");
  sectionStep3.classList.add("hidden");

  if (route.type === "step1") {
    sectionStep1.classList.remove("hidden");
    statusDiv.textContent = "👉 Step 1 of 3: Pick a category, or search below.";
    searchInput.value = "";
    showCategories();
    renderFavorites();
  }
  else if (route.type === "step2") {
    sectionStep2.classList.remove("hidden");
    statusDiv.textContent = "👉 Step 2 of 3: Pick a problem.";

    if (route.id === "search") {
      const text = searchInput.value.trim().toLowerCase();
      problemsNote.textContent = text === ""
        ? "Type below to search problems."
        : `Search results for "${text}":`;
      const list = repairs.filter(r =>
        r.problem.toLowerCase().includes(text) && matchesDifficulty(r)
      );
      renderProblems(list, "No problem matched your search. Try another word.");
    } else {
      const cat = categories.find(c => c.id === route.id);
      problemsNote.textContent = "Problems in: " + (cat ? cat.name : route.id);
      const list = repairs.filter(r => r.category === route.id && matchesDifficulty(r));
      renderProblems(list, "No problems for this category match that difficulty.");
    }
  }
  else if (route.type === "step3") {
    sectionStep3.classList.remove("hidden");
    statusDiv.textContent = "👉 Step 3 of 3: Here is your repair guide.";
    showResult(route.id);
  }
}

// --- Events ---

// Browser Back / Forward buttons
window.addEventListener("hashchange", renderRoute);

// Typing in the search box jumps to Step 2 with search results.
// Only the FIRST keystroke changes the URL; later ones just refresh the list,
// so Back still goes cleanly to Step 1.
searchInput.addEventListener("input", () => {
  const route = getRoute();
  if (route.type === "step2" && route.id === "search") {
    renderRoute(); // already on the search route, just refresh the list
  } else if (searchInput.value.trim() !== "") {
    location.hash = "step2/search";
  }
});

difficultySelect.addEventListener("change", () => {
  if (getRoute().type === "step2") renderRoute();
});

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  difficultySelect.value = "all";
  if (getRoute().type === "step1") {
    renderRoute();
  } else {
    location.hash = ""; // triggers hashchange -> renderRoute
  }
});

// Start on Step 1
renderRoute();
