// dom-elements.js

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
const selectTagButton = document.querySelectorAll(".tagBtn");
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

export {
  timerBtn,
  timerModal,
  customTimerModalBtn,
  customTimerModal,
  modal,
  timerModalBtns,
  timerDisplay,
  customTimerInput,
  cancelBtn,
  setBtn,
  errorMessage,
  selectTagButton,
  dropdown,
  buttons,
  startFocusBtn,
  timerNavBtn,
  swNavBtn,
  startFocus,
  startSW,
  swBtn,
  swNavBtnActive,
  swNavBtnInactive,
  timerNavBtnActive,
  timerNavBtnInactive,
};
