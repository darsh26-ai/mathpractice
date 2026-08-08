/*
=================================================
Math Learning Center
generator.js (Full Upgraded Version)
=================================================
*/

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function generateOptions(answer) {
    const opts = new Set([answer]);
    while (opts.size < 4) {
        opts.add(answer + randomNumber(-10, 10));
    }
    return shuffle([...opts]);
}

/* ---------------------------------------------
   MAIN GENERATOR
--------------------------------------------- */
function generateQuestion(topic, difficulty, grade) {
    const { min, max } = difficultyLevels[difficulty];

    switch (topic) {
        case "addition": return genAdd(min, max);
        case "subtraction": return genSub(min, max);
        case "multiplication": return genMul(min, max);
        case "division": return genDiv(min, max);
        case "fractions": return genFraction();
        case "time": return genTime();
        case "wordProblems": return genWordProblem(grade);
        default: return genAdd(min, max);
    }
}

/* ---------------------------------------------
   BASIC OPERATIONS
--------------------------------------------- */
function genAdd(min, max) {
    const a = randomNumber(min, max);
    const b = randomNumber(min, max);
    return {
        question: `${a} + ${b}`,
        answer: a + b,
        options: generateOptions(a + b)
    };
}

function genSub(min, max) {
    const a = randomNumber(min, max);
    const b = randomNumber(min, max);
    return {
        question: `${a} - ${b}`,
        answer: a - b,
        options: generateOptions(a - b)
    };
}

function genMul(min, max) {
    const a = randomNumber(min, max);
    const b = randomNumber(min, max);
    return {
        question: `${a} × ${b}`,
        answer: a * b,
        options: generateOptions(a * b)
    };
}

function genDiv(min, max) {
    const b = randomNumber(min, max);
    const answer = randomNumber(min, max);
    const a = b * answer;
    return {
        question: `${a} ÷ ${b}`,
        answer,
        options: generateOptions(answer)
    };
}

/* ---------------------------------------------
   FRACTIONS
--------------------------------------------- */
function genFraction() {
    const n = randomNumber(1, 9);
    const d = randomNumber(2, 9);
    return {
        question: `Simplify: ${n}/${d}`,
        answer: (n / d).toFixed(2),
        options: generateOptions(Number((n / d).toFixed(2)))
    };
}

/* ---------------------------------------------
   TIME WITH CLOCK
--------------------------------------------- */
function genTime() {
    const hour = randomNumber(1, 12);
    const minute = randomNumber(0, 59);
    const added = randomNumber(5, 60);

    const start = `${hour}:${minute.toString().padStart(2, "0")}`;

    const total = hour * 60 + minute + added;
    const newHour = Math.floor(total / 60) % 12 || 12;
    const newMin = total % 60;

    const answer = `${newHour}:${newMin.toString().padStart(2, "0")}`;

    return {
        question: `If the time is ${start} and ${added} minutes pass, what time is it?`,
        answer,
        clockTime: start,
        options: shuffle([
            answer,
            `${hour}:${(minute + 5).toString().padStart(2, "0")}`,
            `${hour}:${(minute + 10).toString().padStart(2, "0")}`,
            `${hour}:${minute.toString().padStart(2, "0")}`
        ])
    };
}

/* ---------------------------------------------
   WORD PROBLEMS
--------------------------------------------- */
function generateWordProblem(grade, difficulty) {
    const { min, max } = difficultyLevels[difficulty];

    // Random characters and objects
    const names = ["Rita", "Tom", "Sarah", "Ava", "Liam", "Noah", "Emma", "Mia"];
    const items = ["apples", "books", "marbles", "stickers", "balloons", "cookies", "pencils"];
    const places = ["school", "park", "store", "library", "home"];

    const name = randomItem(names);
    const item = randomItem(items);
    const place = randomItem(places);

    // Difficulty-based templates
    const templates = {
        Easy: [
            () => {
                const a = randomNumber(min, max);
                const b = randomNumber(min, max);
                return {
                    question: `${name} has ${a} ${item}. ${name} gets ${b} more at the ${place}. How many ${item} now?`,
                    answer: a + b
                };
            },
            () => {
                const a = randomNumber(min, max);
                const b = randomNumber(1, a);
                return {
                    question: `${name} has ${a} ${item}. ${b} were lost. How many are left?`,
                    answer: a - b
                };
            }
        ],

        Medium: [
            () => {
                const a = randomNumber(min, max);
                const b = randomNumber(min, max);
                const c = randomNumber(1, 10);
                return {
                    question: `${name} collected ${a} ${item}. Then found ${b} more at the ${place}. Later gave ${c} to a friend. How many remain?`,
                    answer: a + b - c
                };
            },
            () => {
                const a = randomNumber(20, 50);
                const b = randomNumber(10, 20);
                const c = randomNumber(5, 15);
                return {
                    question: `${name} has ${a} ${item}. ${b} were used for a project. Then ${c} more were bought. How many now?`,
                    answer: a - b + c
                };
            }
        ],

        Hard: [
            () => {
                const a = randomNumber(50, 100);
                const b = randomNumber(20, 40);
                const c = randomNumber(10, 20);
                const d = randomNumber(5, 15);
                return {
                    question: `${name} had ${a} ${item}. Sold ${b} in the morning and ${c} in the afternoon. Later bought ${d} more at the ${place}. How many now?`,
                    answer: a - b - c + d
                };
            },
            () => {
                const a = randomNumber(100, 200);
                const b = randomNumber(20, 50);
                const c = randomNumber(10, 30);
                const d = randomNumber(5, 15);
                return {
                    question: `${name} has ${a} ${item}. ${b} were borrowed. ${c} were returned. ${d} were damaged and removed. How many remain?`,
                    answer: a - b + c - d
                };
            }
        ]
    };

    const generator = randomItem(templates[difficulty]);
    const problem = generator();

    return {
        question: problem.question,
        answer: problem.answer,
        options: generateOptions(problem.answer)
    };
}
