
let timerDisplay = document.getElementById("timer");
let startPauseButton = document.getElementById("start-pause");
let resetButton = document.getElementById("reset");
let lapButton = document.getElementById("lap");
let lapsContainer = document.getElementById("laps");

let timerInterval;
let elapsedTime = 0;
let isRunning = false;

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));

  const format = (num) => (num < 10 ? "0" + num : num);
  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

function startPauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    startPauseButton.textContent = "Start";
  } else {
    const startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timerDisplay.textContent = formatTime(elapsedTime);
    }, 100);
    startPauseButton.textContent = "Pause";
  }
  isRunning = !isRunning;
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  timerDisplay.textContent = "00:00:00";
  startPauseButton.textContent = "Start";
  lapsContainer.innerHTML = "";
}

function recordLap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement("div");
    lapElement.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
  }
}

startPauseButton.addEventListener("click", startPauseTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);
