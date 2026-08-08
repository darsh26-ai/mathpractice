const grades = {
    1: ["addition", "subtraction"],
    2: ["addition", "subtraction", "multiplication", "division"],
    3: ["addition", "subtraction", "multiplication", "division", "fractions"],
    4: ["addition", "subtraction", "multiplication", "division", "fractions", "decimals"],
    5: ["addition", "subtraction", "multiplication", "division", "fractions", "decimals", "percent"],
    6: ["integers", "fractions", "decimals", "ratio", "percent"],
    7: ["integers", "rational", "algebra", "exponents"]
};

let selectedGrade = null;
let selectedTopic = null;

function show(sectionId) {
    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    loadGrades();
    setupBackButtons();
});

function loadGrades() {
    const grid = document.getElementById("gradeGrid");
    grid.innerHTML = "";

    Object.keys(grades).forEach(g => {
        const card = document.createElement("div");
        card.className = "gradeCard";
        card.innerHTML = `<h3>Grade ${g}</h3>`;
        card.onclick = () => selectGrade(g);
        grid.appendChild(card);
    });
}

function selectGrade(g) {
    selectedGrade = g;
    loadTopics(g);
    show("topicSection");
}

function loadTopics(g) {
    const grid = document.getElementById("topicGrid");
    grid.innerHTML = "";

    grades[g].forEach(topic => {
        const card = document.createElement("div");
        card.className = "topicCard";
        card.innerHTML = `<h3>${topic}</h3>`;
        card.onclick = () => {
            selectedTopic = topic;
            show("settingsSection");
        };
        grid.appendChild(card);
    });
}

function setupBackButtons() {
    document.querySelectorAll(".backButton").forEach(btn => {
        btn.onclick = () => show("gradeSection");
    });
}
