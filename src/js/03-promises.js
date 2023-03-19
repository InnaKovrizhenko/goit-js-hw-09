import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

formEl.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmitForm(event) {
  event.preventDefault();
  delay = event.currentTarget;
  step = event.currentTarget;
  amount = event.currentTarget;
  let timerDelay = Number(delay.value);
  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, timerDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    timerDelay += Number(step.value);
  }
}
