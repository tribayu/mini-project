const questions = [
    {
        question: "Apa ibu kota Indonesia?",
        answers: ["Jakarta", "Surabaya", "Bandung", "Medan"],
        correct: 0,
    },
    {
        question: "Siapa presiden pertama Indonesia?",
        answers: ["Soekarno", "Soeharto", "BJ Habibie", "Megawati"],
        correct: 0,
    },
    {
        question: "Bulan berapa Indonesia merdeka?",
        answers: ["Juli", "Agustus", "September", "Oktober"],
        correct: 1,
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next");
const resultElement = document.getElementById("result");
const retryButton = document.getElementById("retry");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const li = document.createElement("li");
        li.textContent = answer;
        li.addEventListener("click", () => selectAnswer(index));
        answersElement.appendChild(li);
    });

    nextButton.classList.add("hidden");
    resultElement.classList.add("hidden");
}

function selectAnswer(index) {
    const currentQuestion = questions[currentQuestionIndex];
    const options = answersElement.children;

    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("correct", "incorrect");
        if (i === currentQuestion.correct) {
            options[i].classList.add("correct");
        } else {
            options[i].classList.add("incorrect");
        }
        options[i].style.pointerEvents = "none"; // Disable klik ulang
    }

    if (index === currentQuestion.correct) {
        score++;
    }

    nextButton.classList.remove("hidden");
}

function showResult() {
    questionElement.textContent = `Skor Anda: ${score} dari ${questions.length}`;
    answersElement.innerHTML = "";
    nextButton.classList.add("hidden");
    resultElement.classList.add("hidden");
    retryButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

retryButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    retryButton.classList.add("hidden");
    loadQuestion();
});

// Load the first question when the page loads
loadQuestion();
