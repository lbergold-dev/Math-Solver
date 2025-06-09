import { solveCalculation } from "./solve.js";
import { openOrCloseModal, slide, getTestCalculation } from "./modal.js";

const solverForm = document.querySelector("[data-solver-form]"),
  solverInput = document.querySelector("[data-solver-input]"),
  solverOutput = document.querySelector("[data-solver-output]");

const modal = document.querySelector("[data-modal]"),
  modalOverlay = document.querySelector("[data-modal-overlay]"),
  informationOpenModal = document.querySelector("[data-information-open-modal]"),
  modalButtonClose = document.querySelector("[data-modal-button-close]"),
  modalButtonLeft = document.querySelector("[data-modal-button-left]"),
  modalButtonRight = document.querySelector("[data-modal-button-right]"),
  modalButtonTry = document.querySelector("[data-modal-button-try]"),
  modalSlider = document.querySelector("[data-modal-slider]");

solverForm.addEventListener("submit", e => {
  e.preventDefault();
  const calculation = solverInput.value;
  solverOutput.textContent = solveCalculation(calculation);
});

[modalOverlay, modalButtonClose, informationOpenModal].forEach(el => {
  el.addEventListener("click", () => openOrCloseModal(modal, modalOverlay));
});

modalButtonRight.addEventListener("click", () => {
  slide(modalSlider, "right");
});

modalButtonLeft.addEventListener("click", () => {
  slide(modalSlider, "left");
});

modalButtonTry.addEventListener("click", () => {
  const testCalculation = getTestCalculation(modalSlider);
  solverInput.value = testCalculation;
  solverOutput.textContent = solveCalculation(testCalculation);
  openOrCloseModal(modal, modalOverlay);
});
