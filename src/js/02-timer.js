// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const secondsEl = document.querySelector('span[data-seconds]');
const minutesEl = document.querySelector('span[data-minutes]');
const hoursEl = document.querySelector('span[data-hours]');
const daysEl = document.querySelector('span[data-days]');

let choosingDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    onChoiceValidDate(selectedDates[0]);
  },
};

flatpickr(inputEl, options);

buttonStart.setAttribute(`disabled`, '');

buttonStart.addEventListener('click', onStartClick);

function onChoiceValidDate(selectedDates) {
  choosingDate = selectedDates.getTime();
  if (choosingDate < Date.now()) {
    Notify.failure('Please choose a date in the future');
  }

  if (choosingDate >= Date.now()) {
    buttonStart.removeAttribute('disabled', '');
  }
}

function onStartClick() {
  timerId = setInterval(startTimer, 1000);
  buttonStart.setAttribute(`disabled`, '');
  inputEl.setAttribute(`disabled`, '');
}

function startTimer() {
  const differentDate = choosingDate - Date.now();
  const formatDate = convertMs(differentDate);
  renderDate(formatDate);
  if (secondsEl.textContent === '00' && minutesEl.textContent === '00') {
    Notify.success('Time end');
    clearInterval(timerId);
  }
  console.log(formatDate);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function renderDate({ days, hours, minutes, seconds }) {
  secondsEl.textContent = addLeadingZero(seconds);
  minutesEl.textContent = addLeadingZero(minutes);
  hoursEl.textContent = addLeadingZero(hours);
  daysEl.textContent = addLeadingZero(days);
}
