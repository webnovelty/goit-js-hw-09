// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';



const selector = document.querySelector('input[type="text"]');
const buttonStart = document.querySelector('[data-start]');
const textDays = document.querySelector('[data-days]');
const textHours = document.querySelector('[data-hours]');
const textMinutes = document.querySelector('[data-minutes]');
const textSeconds = document.querySelector('[data-seconds]');
buttonStart.disabled = true;

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		const currentTime = Date.now();
		if (selectedDates[0].getTime() < currentTime) {
			Notiflix.Notify.failure("Please choose a date in the future");
			return;
		}
		textDays.textContent = pad(selectedDates[0].getDay());
		textHours.textContent = pad(selectedDates[0].getHours());
		textMinutes.textContent = pad(selectedDates[0].getMinutes());
		textSeconds.textContent = pad(selectedDates[0].getSeconds());
		buttonStart.disabled = false;
	},
};
flatpickr(selector, options);
buttonStart.addEventListener('click', onCountTime);
function onCountTime() {

	const startTime = Date.now();
	setInterval(() => {
		const currentTime = Date.now();
		const deltaTime = currentTime - startTime;
		const time = convertMs(deltaTime);
		updateClock(time);
	}, 1000);
}

function convertMs(ms) {
	// Number of milliseconds per unit of time
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	// Remaining days
	const days = pad(Math.floor(ms / day));
	// Remaining hours
	const hours = pad(Math.floor((ms % day) / hour));
	// Remaining minutes
	const minutes = pad(Math.floor(((ms % day) % hour) / minute));
	// Remaining seconds
	const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

	return { days, hours, minutes, seconds };
}
function pad(value) {
	return String(value).padStart(2, '0');
}
function updateClock({ days, hours, minutes, seconds }) {
	console.log(minutes);
	textDays.textContent = days;
	textHours.textContent = hours;
	textMinutes.textContent = textMinutes.textContent;
	textSeconds.textContent = seconds;
}