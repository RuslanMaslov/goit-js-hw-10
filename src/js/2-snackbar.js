import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();
  let {
    elements: { delay, step, amount },
  } = evt.currentTarget;
  let elemDelay = Number(delay.value);
  let elemStep = Number(step.value);
  let elemAmount = Number(amount.value);
  if (elemDelay < 0 || elemStep < 0 || elemAmount <= 0) {
    alert('Date must be positive');
    return;
  }
  for (let position = 1; position <= elemAmount; position++) {
    createPromise(position, elemDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    elemDelay += elemStep;
  }
}