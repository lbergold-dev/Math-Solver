const TEST_CALCULATIONS = ["12.5 + 7.5", "70 - 30", "10 * 3", "1.5 / 0.5", "2^4", "5*-(2+2)"];

export function slide(slider, direction) {
  const slides = [...slider.children];

  let position = parseInt(slider.dataset.position) || 0;

  if (direction === "right" && position === -(slides.length - 1)) position = 0;
  else if (direction === "left" && position === 0) position = -(slides.length - 1);
  else direction === "right" ? position-- : position++;

  slider.dataset.position = position;

  slides.forEach(slide => {
    slide.style.transform = `translateX(${100 * position}%)`;
  });
}

export function openOrCloseModal(modal, modalOverlay) {
  modal.classList.toggle("active");
  modalOverlay.classList.toggle("active");
}

export function getTestCalculation(slider) {
  console.log(slider);
  const position = parseInt(slider.dataset.position) || 0;
  return TEST_CALCULATIONS[-position];
}
