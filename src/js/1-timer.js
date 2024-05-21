import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const dataDays = document.querySelector('[data-days]');

let userSelectedDate = null;
let timerId = null;

startButton.disabled = true;

const addLeadingZero = (value) => { return String(value).padStart(2, "0"); };

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  input.disabled = true;
  timerId = setInterval(() => {
    const timer = new Date(input.value) - Date.now();
    if (timer <= 0) {
      clearInterval(timerId);
      timeOutput({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      startButton.disabled = false;
      input.disabled = false;
      return;
    }
    timeOutput(convertMs(timer));
  }, 1000);
});

const timeOutput = ({ days, hours, minutes, seconds }) => {
  dataDays.textContent = String(days).padStart(2, '0');
  dataHours.textContent = String(hours).padStart(2, '0');
  dataMinutes.textContent = String(minutes).padStart(2, '0');
  dataSeconds.textContent = String(seconds).padStart(2, '0');
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates.length > 0) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();
      if (selectedDate > currentDate) {
        userSelectedDate = selectedDate;
        startButton.disabled = false;
      } else {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
        });
        startButton.disabled = true;
      }
    }
  },
};

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  input.disabled = true;
  timerId = setInterval(() => {
    const timer = userSelectedDate - Date.now();
    if (timer <= 0) {
      clearInterval(timerId);
      timeOutput({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      startButton.disabled = false;
      input.disabled = false;
      return;
    }
    timeOutput(convertMs(timer));
  }, 1000);
});

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr('#datetime-picker', options);
