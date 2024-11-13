// DOM Elements
const timerBtn = document.querySelector(".timerBtn");
const timerModal = document.querySelector(".timer-modal");
const customTimerModalBtn = document.querySelector(".custom-timer-modal-btn");
const customTimerModal = document.querySelector(".custom-timer-modal");
const modal = document.querySelector(".modal");
const timerModalBtns = document.querySelectorAll(".timer-modal-btn");
const timerDisplay = document.querySelector(".timer");
const customTimerInput = document.querySelector("#custom-timer");
const cancelBtn = document.querySelector("#cancel-timer");
const setBtn = document.querySelector("#set-timer");
const errorMessage = document.querySelector("#error-message");
const selectTagButton = document.querySelector(".tagBtn");
const dropdown = document.querySelector(".tag-dropdown");
const buttons = dropdown.querySelectorAll("button");
const startFocusBtn = document.querySelector(".start-focus");
const timerNavBtn = document.querySelector(".timerNavBtn");
const swNavBtn = document.querySelector(".swNavBtn");
const startFocus = document.querySelector(".start-focus");
const startSW = document.querySelector(".start-sw");
const swBtn = document.querySelector(".swBtn");
const swNavBtnActive = document.querySelector(".swNavBtnActive");
const swNavBtnInactive = document.querySelector(".swNavBtnInactive");
const timerNavBtnActive = document.querySelector(".timerNavBtnActive");
const timerNavBtnInactive = document.querySelector(".timerNavBtnInactive");
const swDisplay = document.querySelector(".sw-display");
const startBtn = document.querySelector(".start-sw-btn");
const stopResetBtnContainer = document.querySelector(".stop-reset-sw-btn");
const stopBtn = stopResetBtnContainer.querySelector(".stopBtn");
const resetBtn = stopResetBtnContainer.querySelector(".resetBtn");

// Timer and Stopwatch Variables
let timerInterval, timer;
let isTimerRunning = false; // Timer state
let isRunning = false; // Stopwatch state
let totalSeconds = 0; // Timer remaining seconds
let minutes = 0,
  seconds = 0; // Stopwatch time

// Modal Controls
function openModal(modalElement) {
  modal.classList.remove("hidden");
  modalElement.classList.remove("hidden");
}

function closeModal(modalElement) {
  modal.classList.add("hidden");
  modalElement.classList.add("hidden");
}

timerBtn.addEventListener("click", () => openModal(timerModal));

timerModal
  .querySelector("button img")
  .parentNode.addEventListener("click", () => closeModal(timerModal));

customTimerModalBtn.addEventListener("click", () => {
  openModal(customTimerModal);
  timerModal.classList.add("hidden");
});

// Timer Modal Button Click
timerModalBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const time = button.getAttribute("data-time");
    timerDisplay.setAttribute("data-time", time);
    timerDisplay.textContent = formatTime(time, 0); // Default seconds to 0
    totalSeconds = time * 60;
    closeModal(timerModal);
  });
});

// Format Time (mm:ss)
function formatTime(minutes, seconds = 0) {
  return `${parseInt(minutes, 10).toString().padStart(2, "0")}:${parseInt(seconds, 10).toString().padStart(2, "0")}`;
}

// Custom Timer Set
setBtn.addEventListener("click", () => {
  const customMinutes = customTimerInput.value;

  if (customMinutes && !isNaN(customMinutes) && customMinutes.length <= 2) {
    timerDisplay.setAttribute("data-time", customMinutes);
    timerDisplay.textContent = formatTime(customMinutes, 0);
    totalSeconds = customMinutes * 60;
    closeModal(customTimerModal);
    errorMessage.classList.add("hidden");
    customTimerInput.value = "";
  } else {
    errorMessage.classList.remove("hidden");
  }
});

// Cancel Custom Timer
cancelBtn.addEventListener("click", () => {
  closeModal(customTimerModal);
  errorMessage.classList.add("hidden");
  customTimerInput.value = "";
});

// Custom Timer Input Validation
customTimerInput.addEventListener("input", () => {
  customTimerInput.value = customTimerInput.value.replace(/\D/g, "");
  if (customTimerInput.value.length > 2)
    customTimerInput.value = customTimerInput.value.slice(0, 2);
  errorMessage.classList.add("hidden");
});

// Dropdown Tag Selection
selectTagButton.addEventListener("click", () =>
  dropdown.classList.toggle("hidden")
);

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const selectedTag = e.target.getAttribute("data-tag");
    selectTagButton.textContent = selectedTag;
    dropdown.classList.add("hidden");
  });
});

// Close Dropdown when Clicking Outside
document.addEventListener("click", (e) => {
  if (!selectTagButton.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add("hidden");
  }
});

// Timer Start/Stop
function startTimer() {
  disableInputs();
  isTimerRunning = true;
  timerInterval = setInterval(() => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    timerDisplay.textContent = formatTime(mins, secs);
    totalSeconds--;

    if (totalSeconds < 0) {
      clearInterval(timerInterval);
      enableInputs();
      toggleButtonToStart();
    }
  }, 1000);
}

// Timer Control Buttons (Start/Stop)
function toggleButtonToStop() {
  startFocusBtn.innerHTML = `<img src='./assets/stopFocusBtn.svg' /><span>Stop</span>`;
  startFocusBtn.classList.add("bg-error", "text-white");
  startFocusBtn.classList.remove("bg-yellow");
}

function toggleButtonToStart() {
  startFocusBtn.innerHTML = `<img src='./assets/startFocusBtn.svg' /><span>Start Focusing</span>`;
  startFocusBtn.classList.remove("bg-error", "text-white");
  startFocusBtn.classList.add("bg-yellow");
}

startFocusBtn.addEventListener("click", () => {
  if (isTimerRunning) {
    clearInterval(timerInterval);
    isTimerRunning = false;
    enableInputs();
    toggleButtonToStart();
  } else {
    const time = Number(timerDisplay.getAttribute("data-time"));
    if (time || totalSeconds > 0) {
      toggleButtonToStop();
      if (totalSeconds === 0) totalSeconds = time * 60;
      startTimer();
    }
  }
});

// Navigation Buttons (Timer / Stopwatch)
timerNavBtn.addEventListener("click", () => {
  timerNavBtn.classList.add("bg-brown");
  timerNavBtnActive.classList.remove("hidden");
  swNavBtnInactive.classList.remove("hidden");
  swNavBtn.classList.remove("bg-brown");
  swNavBtnActive.classList.add("hidden");
  timerNavBtnInactive.classList.add("hidden");

  startFocus.classList.remove("hidden");
  timerBtn.classList.remove("hidden");
  startSW.classList.add("hidden");
  swBtn.classList.add("hidden");
});

swNavBtn.addEventListener("click", () => {
  if (isTimerRunning) {
    clearInterval(timerInterval);
    isTimerRunning = false;
    enableInputs();
    toggleButtonToStart();
  }

  swNavBtn.classList.add("bg-brown");
  timerNavBtn.classList.remove("bg-brown");
  swNavBtnActive.classList.remove("hidden");
  timerNavBtnInactive.classList.remove("hidden");
  timerNavBtnActive.classList.add("hidden");
  swNavBtnInactive.classList.add("hidden");

  startSW.classList.remove("hidden");
  swBtn.classList.remove("hidden");
  startFocus.classList.add("hidden");
  timerBtn.classList.add("hidden");
});

// Stopwatch Start/Stop
startBtn.addEventListener("click", function () {
  if (!isRunning) {
    startBtn.classList.add("hidden");
    stopResetBtnContainer.classList.remove("hidden");
    selectTagButton.disabled = true;

    isRunning = true;
    timer = setInterval(function () {
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }

      swDisplay.textContent = `${padTime(minutes)}:${padTime(seconds)}`;
    }, 1000);
  }
});

// Stopwatch Stop
stopBtn.addEventListener("click", function () {
  clearInterval(timer);
  isRunning = false;

  startBtn.classList.remove("hidden");
  selectTagButton.disabled = false;
  stopResetBtnContainer.classList.add("hidden");
});

// Stopwatch Reset
resetBtn.addEventListener("click", function () {
  clearInterval(timer);
  isRunning = false;
  minutes = 0;
  seconds = 0;
  swDisplay.textContent = "00:00";

  startBtn.classList.remove("hidden");
  selectTagButton.disabled = false;
  stopResetBtnContainer.classList.add("hidden");
});

// Stopwatch Helper
function padTime(time) {
  return time < 10 ? "0" + time : time;
}

// Enable/Disable Inputs
function disableInputs() {
  timerBtn.disabled = true;
  customTimerModalBtn.disabled = true;
  customTimerInput.disabled = true;
  selectTagButton.disabled = true;

  timerBtn.classList.add("disabled");
  customTimerModalBtn.classList.add("disabled");
  selectTagButton.classList.add("disabled");
}

function enableInputs() {
  timerBtn.disabled = false;
  customTimerModalBtn.disabled = false;
  customTimerInput.disabled = false;
  selectTagButton.disabled = false;

  timerBtn.classList.remove("disabled");
  customTimerModalBtn.classList.remove("disabled");
  selectTagButton.classList.remove("disabled");
}
