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
//

let timerInterval;
let isTimerRunning = false; // Track if the timer is running
let totalSeconds = 0; // Store the remaining seconds

// Show the timer modal when clicking the main timer button
timerBtn.addEventListener("click", () => {
  timerModal.classList.remove("hidden");
  modal.classList.remove("hidden");
});

// Hide the timer modal when clicking the close button inside it
timerModal
  .querySelector("button svg")
  .parentNode.addEventListener("click", () => {
    modal.classList.add("hidden");
    timerModal.classList.add("hidden");
    customTimerModal.classList.add("hidden");
  });

// Show the custom timer modal and hide the timer modal when clicking the "Custom mins" button
customTimerModalBtn.addEventListener("click", () => {
  customTimerModal.classList.remove("hidden");
  timerModal.classList.add("hidden");
});

// Handle timer modal buttons click to set time
timerModalBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const time = button.getAttribute("data-time");
    timerDisplay.setAttribute("data-time", time);
    timerDisplay.textContent = formatTime(time, 0); // Default seconds to 0
    totalSeconds = time * 60; // Set total seconds for the timer
    modal.classList.add("hidden");
    timerModal.classList.add("hidden");
    customTimerModal.classList.add("hidden");
  });
});

// Function to format time as mm:ss
function formatTime(minutes, seconds = 0) {
  minutes = parseInt(minutes, 10);
  seconds = parseInt(seconds, 10);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// Set the custom timer
setBtn.addEventListener("click", () => {
  const customMinutes = customTimerInput.value;

  if (customMinutes && !isNaN(customMinutes) && customMinutes.length <= 2) {
    timerDisplay.setAttribute("data-time", customMinutes);
    timerDisplay.textContent = formatTime(customMinutes, 0);
    totalSeconds = customMinutes * 60;
    customTimerModal.classList.add("hidden");
    modal.classList.add("hidden");
    errorMessage.classList.add("hidden");
    customTimerInput.value = "";
  } else {
    errorMessage.classList.remove("hidden");
  }
});

// Cancel the custom timer and close the modal
cancelBtn.addEventListener("click", () => {
  customTimerModal.classList.add("hidden");
  modal.classList.add("hidden");
  errorMessage.classList.add("hidden");
  customTimerInput.value = "";
});

// Custom timer input validation: only allow digits and limit to 2 characters
customTimerInput.addEventListener("input", () => {
  customTimerInput.value = customTimerInput.value.replace(/\D/g, "");

  if (customTimerInput.value.length > 2) {
    customTimerInput.value = customTimerInput.value.slice(0, 2);
  }

  errorMessage.classList.add("hidden");
});

// Toggle the visibility of the dropdown when clicking the Select Tag button
selectTagButton.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

// Handle the selection of a tag
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const selectedTag = e.target.getAttribute("data-tag");
    selectTagButton.textContent = selectedTag;
    dropdown.classList.add("hidden");
  });
});

// Close the dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!selectTagButton.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add("hidden");
  }
});

// Function to disable inputs and buttons
function disableInputs() {
  timerBtn.disabled = true;
  customTimerModalBtn.disabled = true;
  customTimerInput.disabled = true;
  selectTagButton.disabled = true;

  timerBtn.classList.add("disabled");
  customTimerModalBtn.classList.add("disabled");
  selectTagButton.classList.add("disabled");
}

// Function to enable inputs and buttons
function enableInputs() {
  timerBtn.disabled = false;
  customTimerModalBtn.disabled = false;
  customTimerInput.disabled = false;
  selectTagButton.disabled = false;

  timerBtn.classList.remove("disabled");
  customTimerModalBtn.classList.remove("disabled");
  selectTagButton.classList.remove("disabled");
}

// Function to start the countdown
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

// Function to toggle the Start/Stop button
function toggleButtonToStop() {
  startFocusBtn.innerHTML = ` 
  <img src='./assets/stopFocusBtn.svg' />
  <span>Stop</span>
  `;
  startFocusBtn.classList.add("bg-error");
  startFocusBtn.classList.remove("bg-yellow");
  startFocusBtn.classList.add("text-white");
}

function toggleButtonToStart() {
  startFocusBtn.innerHTML = `
          <img src='./assets/startFocusBtn.svg' />
          <span>Start Focusing</span>`;
  startFocusBtn.classList.remove("bg-error");
  startFocusBtn.classList.add("bg-yellow");
  startFocusBtn.classList.remove("text-white");
}

// Start/Stop timer on button click
startFocusBtn.addEventListener("click", () => {
  if (isTimerRunning) {
    clearInterval(timerInterval);
    isTimerRunning = false;
    enableInputs();
    toggleButtonToStart(); // Change to "Start" button
  } else {
    const time = Number(timerDisplay.getAttribute("data-time"));
    if (time || totalSeconds > 0) {
      toggleButtonToStop(); // Change to "Stop" button
      if (totalSeconds === 0) totalSeconds = time * 60; // Initialize if first start
      startTimer();
    }
  }
});

// Select elements
const swNavBtnActive = document.querySelector(".swNavBtnActive");
const swNavBtnInactive = document.querySelector(".swNavBtnInactive");
const timerNavBtnActive = document.querySelector(".timerNavBtnActive");
const timerNavBtnInactive = document.querySelector(".timerNavBtnInactive");

// Add event listeners for the buttons
timerNavBtn.addEventListener("click", () => {
  // Toggle background color
  timerNavBtn.classList.add("bg-brown");
  timerNavBtnActive.classList.remove("hidden");
  swNavBtnInactive.classList.remove("hidden");
  swNavBtn.classList.remove("bg-brown");
  swNavBtnActive.classList.add("hidden");
  timerNavBtnInactive.classList.add("hidden");

  // Show Timer elements and hide Stopwatch elements
  startFocus.classList.remove("hidden");
  timerBtn.classList.remove("hidden");
  startSW.classList.add("hidden");
  swBtn.classList.add("hidden");
});

swNavBtn.addEventListener("click", () => {
  // If the timer is running, stop it and reset the start/stop button
  if (isTimerRunning) {
    clearInterval(timerInterval);
    isTimerRunning = false;
    enableInputs();
    toggleButtonToStart(); // Reset button to "Start"
  }

  // Toggle background color
  swNavBtn.classList.add("bg-brown");
  timerNavBtn.classList.remove("bg-brown");
  swNavBtnActive.classList.remove("hidden");
  timerNavBtnInactive.classList.remove("hidden");
  timerNavBtnActive.classList.add("hidden");
  swNavBtnInactive.classList.add("hidden");

  // Show Stopwatch elements and hide Timer elements
  startSW.classList.remove("hidden");
  swBtn.classList.remove("hidden");
  startFocus.classList.add("hidden");
  timerBtn.classList.add("hidden");
});
