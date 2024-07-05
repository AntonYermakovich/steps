const nextBtn = document.querySelectorAll(".btn_next");
const prevBtn = document.querySelectorAll(".btn_prev");
const resetBtn = document.querySelector(".btn_reset");
const steps = document.querySelectorAll(".step");
const classActive = "step_active";
const classCompleted = "step_completed";
const forms = document.querySelectorAll(".form");
const tabs = document.querySelectorAll(".tab");
const tabsContainer = document.querySelector(".tabs__container");
let tabClientWith = tabs[0].clientWidth + (tabs[0].clientLeft * 2);
let step = 0;

nextBtn.forEach((btn) => btn.addEventListener("click", nextStep));
prevBtn.forEach((btn) => btn.addEventListener("click", prevStep));
resetBtn.addEventListener("click", resetForm);

function removeClassActive() {
  Array.from(steps).map((step) => step.classList.remove(classActive));
}

function addClassActive(index) {
  if (index !== steps.length) {
    steps[index].classList.add(classActive);
  } else {
    // This send message on server
    console.log("Отправить сообщение");
  }
}

function addClassCompleted(index) {
  steps[index].classList.add(classCompleted);
}

function removeClassCompleted(index) {
  if (index) {
    steps[index].classList.remove(classCompleted);
  } else {
    steps.forEach((step) => step.classList.remove(classCompleted));
  }
}

function prevStep() {
  step--;
  removeClassCompleted(step);
  removeClassActive();
  addClassActive(step);

  changeSlide(tabClientWith * step);
}

function nextStep() {
  if (step === steps.length) return;

  addClassCompleted(step);
  step++;
  removeClassActive();
  addClassActive(step);

  tabs.length !== step && changeSlide(tabClientWith * step);
}

function changeSlide(width) {
  tabsContainer.style.transform = `translateX(-${width}px)`;
}

function resetForm() {
  step = 0;
  changeSlide(step);
  addClassActive(step);
  removeClassCompleted();
}

forms.forEach((form) =>
  form.addEventListener("submit", (e) => e.preventDefault())
);

function debounce(func, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

function resizeWindow() {
  tabClientWith = tabs[0].clientWidth + (tabs[0].clientLeft * 2);
  changeSlide(tabClientWith * step);
}

window.addEventListener("resize", debounce(resizeWindow, 200));


console.log(tabs[0].clientLeft)
