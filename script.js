const searchInput = document.getElementById("search");
const suggestionsDiv = document.getElementById("suggestions");
const resultatDiv = document.getElementById("resultat");
const form = document.getElementById("searchForm");
const container = document.querySelector(".container");

let data = [];

// Charger le fichier JSON au démarrage
fetch("data.json")
    .then(response => response.json())
    .then(json => {
        data = json;
    })
    .catch(err => console.error("Erreur de chargement JSON :", err));

// Suggestion en temps réel
searchInput.addEventListener("keyup", function () {
    const query = this.value.toLowerCase();

    if (query.length >= 2) {
        const suggestions = data.filter(item => item.nom.toLowerCase().includes(query)).slice(0, 4);
        suggestionsDiv.innerHTML = suggestions.map(item =>
            `<div class="suggestion-item">${item.nom}</div>`
        ).join("");
    } else {
        suggestionsDiv.innerHTML = "";
    }
});

// Quand on clique sur une suggestion
suggestionsDiv.addEventListener("click", function (e) {
    if (e.target.classList.contains("suggestion-item")) {
        searchInput.value = e.target.innerText;
        suggestionsDiv.innerHTML = "";

        // Lancer automatiquement la recherche
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    }
});

// Quand on clique sur le bouton rechercher ou appuie sur Enter
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = searchInput.value.toLowerCase();

    const results = data.filter(item => item.nom.toLowerCase().includes(query));

    suggestionsDiv.innerHTML = "";

    // Animation de la barre qui monte
    container.classList.add("move-up");

    if (results.length > 0) {
        resultatDiv.innerHTML = `
            <h2>${results[0].nom}</h2>
            <p>Table ${results[0].info}</p>
        `;
    } else {
        resultatDiv.innerHTML = `<h3>Aucun résultat</h3>`;
    }

    // IMPORTANT
    resultatDiv.classList.add("show");
});

//Quand le champ est focus (clavier ouvert)
searchInput.addEventListener("focus", () => {
    container.classList.add("keyboard-open");
    setTimeout(() => {
        searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
});
//Quand le champ perd le focus (clavier fermé)
searchInput.addEventListener("blur", () => {
    container.classList.remove("keyboard-open");
});
//Effet paralax
// window.addEventListener("scroll", function () {

//     const scroll = window.scrollY;
//     const hero = document.querySelector(".hero");

//     hero.style.backgroundPositionY = scroll * 0.5 + "px";

// });