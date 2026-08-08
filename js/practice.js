let currentQuestion = null;
let questionType = "mcq";

document.getElementById("startPracticeBtn").onclick = () => {
    questionType = document.getElementById("questionType").value;
    startPractice();
};

function startPractice() {
    show("practiceSection");
    loadQuestion();
}

function loadQuestion() {
    currentQuestion = generateQuestion(selectedTopic);

    document.getElementById("practiceTitle").innerText =
        `${selectedTopic.toUpperCase()} Practice`;

    document.getElementById("questionBox").innerText = currentQuestion.q;

    const optionsBox = document.getElementById("optionsBox");
    const typed = document.getElementById("typedAnswer");

    optionsBox.innerHTML = "";
    typed.classList.add("hidden");
    typed.value = "";

    if (questionType === "mcq") {
        const opts = generateOptions(currentQuestion.answer);
        opts.forEach(o => {
            const btn = document.createElement("button");
            btn.className = "optionBtn";
            btn.innerText = o;
            btn.onclick = () => checkAnswer(o);
            optionsBox.appendChild(btn);
        });
    } else {
        typed.classList.remove("hidden");
    }

    document.getElementById("resultBox").innerText = "";
}

document.getElementById("nextBtn").onclick = () => loadQuestion();

function checkAnswer(selected) {
    const typed = document.getElementById("typedAnswer").value;
    const answer = questionType === "typed" ? typed : selected;

    const resultBox = document.getElementById("resultBox");

    if (String(answer) === String(currentQuestion.answer)) {
        resultBox.innerText = "Correct!";
        resultBox.style.color = "green";
    } else {
        resultBox.innerText = "Try again!";
        resultBox.style.color = "red";
    }
}
