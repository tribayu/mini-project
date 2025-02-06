// Tab Navigation
const stopwatchTab = document.getElementById("stopwatch-tab");
const timerTab = document.getElementById("timer-tab");
const stopwatchSection = document.getElementById("stopwatch-section");
const timerSection = document.getElementById("timer-section");

stopwatchTab.addEventListener("click", () => {
    stopwatchTab.classList.add("active");
    timerTab.classList.remove("active");
    stopwatchSection.classList.remove("hidden");
    timerSection.classList.add("hidden");
});

timerTab.addEventListener("click", () => {
    timerTab.classList.add("active");
    stopwatchTab.classList.remove("active");
    timerSection.classList.remove("hidden");
    stopwatchSection.classList.add("hidden");
});

// Stopwatch Logic
let stopwatchInterval;
let stopwatchSeconds = 0;
let stopwatchRunning = false;

const stopwatchDisplay = document.getElementById("stopwatch-display");
const startStopwatch = document.getElementById("start-stopwatch");
const pauseStopwatch = document.getElementById("pause-stopwatch");
const resetStopwatch = document.getElementById("reset-stopwatch");

function updateStopwatchDisplay() {
    let hours = Math.floor(stopwatchSeconds / 3600);
    let minutes = Math.floor((stopwatchSeconds % 3600) / 60);
    let seconds = stopwatchSeconds % 60;
    stopwatchDisplay.textContent = 
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

startStopwatch.addEventListener("click", () => {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        stopwatchInterval = setInterval(() => {
            stopwatchSeconds++;
            updateStopwatchDisplay();
        }, 1000);
        startStopwatch.classList.add("hidden");
        pauseStopwatch.classList.remove("hidden");
    }
});

pauseStopwatch.addEventListener("click", () => {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
    pauseStopwatch.classList.add("hidden");
    startStopwatch.classList.remove("hidden");
});

resetStopwatch.addEventListener("click", () => {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
    stopwatchSeconds = 0;
    updateStopwatchDisplay();
    startStopwatch.classList.remove("hidden");
    pauseStopwatch.classList.add("hidden");
});

// Timer Logic
let timerInterval;
let timerRunning = false;
let timerTime = 0;

const timerInput = document.getElementById("timer-input");
const timerDisplay = document.getElementById("timer-display");
const startTimer = document.getElementById("start-timer");
const pauseTimer = document.getElementById("pause-timer");
const resetTimer = document.getElementById("reset-timer");

function updateTimerDisplay() {
    let minutes = Math.floor(timerTime / 60);
    let seconds = timerTime % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

startTimer.addEventListener("click", () => {
    if (!timerRunning) {
        timerTime = parseInt(timerInput.value) || 0;
        if (timerTime > 0) {
            timerRunning = true;
            timerInterval = setInterval(() => {
                if (timerTime > 0) {
                    timerTime--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    timerRunning = false;
                    alert("Waktu Habis!");
                }
            }, 1000);
            startTimer.classList.add("hidden");
            pauseTimer.classList.remove("hidden");
        }
    }
});

pauseTimer.addEventListener("click", () => {
    timerRunning = false;
    clearInterval(timerInterval);
    pauseTimer.classList.add("hidden");
    startTimer.classList.remove("hidden");
});

resetTimer.addEventListener("click", () => {
    timerRunning = false;
    clearInterval(timerInterval);
    timerTime = 0;
    updateTimerDisplay();
    startTimer.classList.remove("hidden");
    pauseTimer.classList.add("hidden");
});
