/*
=================================================
Math Learning Center
app.js (Clean Version)
=================================================
*/

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

/* ---------------------------------------------
   Show Page
--------------------------------------------- */
function show(pageId) {
    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
    const page = document.getElementById(pageId);
    if (page) page.classList.remove("hidden");
}

/* ---------------------------------------------
   Initialize App
--------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    loadGrades();
    setupBackButtons();
    setupStartButton();
    show("homePage");   // Show grade page first
});

/* ---------------------------------------------
   Load Grades
--------------------------------------------- */
function loadGrades() {
    const grid = document.getElementById("gradeGrid");
    if (!grid) return;

    grid.innerHTML = "";

    Object.keys(grades).forEach(g => {
        const card = document.createElement("div");
        card.className = "gradeCard";
        card.innerHTML = `<h3>Grade ${g}</h3>`;
        card.onclick = () => selectGrade(g);
        grid.appendChild(card);
    });
}

/* ---------------------------------------------
   Select Grade
--------------------------------------------- */
function selectGrade(g) {
    selectedGrade = g;
    loadTopics(g);
    show("topicPage");
}

/* ---------------------------------------------
   Load Topics
--------------------------------------------- */
function loadTopics(g) {
    const grid = document.getElementById("topicGrid");
    if (!grid) return;

    grid.innerHTML = "";

    grades[g].forEach(topic => {
        const card = document.createElement("div");
        card.className = "topicCard";
        card.innerHTML = `<h3>${topic}</h3>`;
        card.onclick = () => {
            selectedTopic = topic;
            show("settingsPage");
        };
        grid.appendChild(card);
    });
}

/* ---------------------------------------------
   Back Buttons
--------------------------------------------- */
function setupBackButtons() {
    document.querySelectorAll(".backButton").forEach(btn => {
        btn.onclick = () => show("homePage");
    });
}

/* ---------------------------------------------
   Start Practice Button
--------------------------------------------- */
function setupStartButton() {
    const btn = document.getElementById("startPracticeBtn");
    if (!btn) return;

    btn.onclick = () => {
        if (!selectedGrade || !selectedTopic) {
            alert("Please select a grade and topic first.");
            return;
        }

        const settings = {
            grade: selectedGrade,
            topic: selectedTopic,
            difficulty: document.getElementById("difficulty").value,
            questionType: document.getElementById("questionType").value,
            questionCount: Number(document.getElementById("questionCount").value),
            timer: Number(document.getElementById("timer").value)
        };

        window.currentQuizSettings = settings;

        if (typeof startPractice === "function") {
            startPractice(settings);
        }

        show("quizPage");
    };
}
