/*
=================================================
Math Learning Center
app.js (Corrected Version)
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
   Show Page (Matches Your HTML IDs)
--------------------------------------------- */
function show(sectionId) {
    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
    const page = document.getElementById(sectionId);
    if (page) page.classList.remove("hidden");
}

/* ---------------------------------------------
   Initialize App
--------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    loadGrades();
    setupBackButtons();
    setupStartButton();

    // FIX: Show gradeSection first
    show("gradeSection");
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

    // FIX: Show topicSection (your HTML ID)
    show("topicSection");
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

            // FIX: Show settingsSection (your HTML ID)
            show("settingsSection");
        };
        grid.appendChild(card);
    });
}

/* ---------------------------------------------
   Back Buttons
--------------------------------------------- */
function setupBackButtons() {
    document.querySelectorAll(".backButton").forEach(btn => {
        btn.onclick = () => show("gradeSection");
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
            difficulty: document.getElementById("difficulty")?.value || "Easy",
            questionType: document.getElementById("questionType")?.value || "mcq",
            questionCount: Number(document.getElementById("questionCount")?.value || 10),
            timer: Number(document.getElementById("timer")?.value || 0)
        };

        window.currentQuizSettings = settings;

        if (typeof startPractice === "function") {
            startPractice(settings);
        }

        // FIX: Show practiceSection (your HTML ID)
        show("practiceSection");
    };
}
