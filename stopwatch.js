// Variables to store the stopwatch state
let timer;
let minutes = 0;
let seconds = 0;
let isRunning = false; // To check if the stopwatch is running

// Elements
const startBtn = document.querySelector(".start-sw-btn"); // Start button
const stopResetBtnContainer = document.querySelector(".stop-reset-sw-btn"); // Stop/Reset button container
const stopBtn = stopResetBtnContainer.querySelector(".stopBtn"); // Stop button
const resetBtn = stopResetBtnContainer.querySelector(".resetBtn"); // Reset button
const swDisplay = document.querySelector(".sw-display"); // The timer display element

// Start button click event
startBtn.addEventListener("click", function () {
  if (!isRunning) {
    // Show stop and reset buttons, hide start button
    startBtn.classList.add("hidden");
    stopResetBtnContainer.classList.remove("hidden");
    selectTagButton.disabled = true;

    isRunning = true;

    // Start the stopwatch
    timer = setInterval(function () {
      seconds++;

      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }

      // Update the timer display
      swDisplay.textContent = `${padTime(minutes)}:${padTime(seconds)}`;
    }, 1000);
  }
});

// Stop button functionality
stopBtn.addEventListener("click", function () {
  clearInterval(timer); // Stop the timer
  isRunning = false;

  // Show start button and hide stop/reset buttons
  startBtn.classList.remove("hidden");
  selectTagButton.disabled = false;

  stopResetBtnContainer.classList.add("hidden");
});

timerNavBtn.addEventListener("click", function () {
  clearInterval(timer); // Stop the timer
  isRunning = false;

  // Show start button and hide stop/reset buttons
  startBtn.classList.remove("hidden");
  selectTagButton.disabled = false;

  stopResetBtnContainer.classList.add("hidden");
});

// Reset button functionality
resetBtn.addEventListener("click", function () {
  clearInterval(timer); // Stop the timer if it's running
  isRunning = false;

  // Reset the timer to 00:00
  minutes = 0;
  seconds = 0;
  swDisplay.textContent = "00:00";

  // Show start button and hide stop/reset buttons
  startBtn.classList.remove("hidden");
  selectTagButton.disabled = false;

  stopResetBtnContainer.classList.add("hidden");
});

// Function to format time (pad single digits with leading zero)
function padTime(time) {
  return time < 10 ? "0" + time : time;
}
