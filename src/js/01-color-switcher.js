const body = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

let generateId = null;
let isActive = false;

buttonStop.setAttribute('disabled', '');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

buttonStart.addEventListener('click', onStartClick);
function onStartClick() {
  if (isActive) {
    return;
  }
  isActive = true;
  buttonStart.setAttribute('disabled', '');
  generateId = setInterval(
    () => (body.style.backgroundColor = getRandomHexColor()),
    1000
  );
  buttonStop.removeAttribute('disabled', '');
}

buttonStop.addEventListener('click', onStopClick);

function onStopClick() {
  clearInterval(generateId);
  buttonStart.removeAttribute('disabled', '');
  buttonStop.setAttribute('disabled', '');
  isActive = false;
}
