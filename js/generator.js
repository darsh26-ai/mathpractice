function generateQuestion(topic) {
    let a = Math.floor(Math.random() * 20) + 1;
    let b = Math.floor(Math.random() * 20) + 1;

    switch (topic) {
        case "addition":
            return { q: `${a} + ${b}`, answer: a + b };
        case "subtraction":
            return { q: `${a} - ${b}`, answer: a - b };
        case "multiplication":
            return { q: `${a} × ${b}`, answer: a * b };
        case "division":
            return { q: `${a * b} ÷ ${b}`, answer: a };
        case "fractions":
            return { q: `${a}/${b} (simplify?)`, answer: (a / b).toFixed(2) };
        default:
            return { q: `${a} + ${b}`, answer: a + b };
    }
}

function generateOptions(answer) {
    const opts = new Set([answer]);
    while (opts.size < 4) {
        opts.add(answer + Math.floor(Math.random() * 10) - 5);
    }
    return [...opts];
}
