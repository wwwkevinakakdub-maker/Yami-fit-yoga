const timerDisplay = document.getElementById("timer-display");
const startButton = document.getElementById("start-timer");
const pauseButton = document.getElementById("pause-timer");
const resetButton = document.getElementById("reset-timer");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const flowList = document.getElementById("flow-list");

let timer = null;
let remainingSeconds = 5 * 60;

const hasTimerControls = Boolean(timerDisplay && startButton && pauseButton && resetButton);

const updateTimerDisplay = () => {
  if (!hasTimerControls) {
    return;
  }
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
};

const tick = () => {
  if (remainingSeconds > 0) {
    remainingSeconds -= 1;
    updateTimerDisplay();
  } else {
    clearInterval(timer);
    timer = null;
  }
};

if (hasTimerControls) {
  startButton.addEventListener("click", () => {
    if (timer) {
      return;
    }
    timer = setInterval(tick, 1000);
  });
}

if (hasTimerControls) {
  pauseButton.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
  });

  resetButton.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    remainingSeconds = 5 * 60;
    updateTimerDisplay();
  });
}

const updateProgress = () => {
  if (!flowList || !progressFill || !progressText) {
    return;
  }
  const inputs = flowList.querySelectorAll("input[type='checkbox']");
  const checked = Array.from(inputs).filter((input) => input.checked).length;
  const progress = inputs.length ? Math.round((checked / inputs.length) * 100) : 0;
  progressFill.style.width = `${progress}%`;
  progressText.textContent = `${progress}% complete`;
};

if (flowList) {
  flowList.addEventListener("change", updateProgress);
}

updateTimerDisplay();
updateProgress();
