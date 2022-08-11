function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const startButtonEl = document.querySelector('[data-start]');
const stopButtonEl = document.querySelector('[data-stop]');
let timerId = null;
stopButtonEl.disabled = true;

startButtonEl.addEventListener('click', startColorChange);
stopButtonEl.addEventListener('click', stopColorChange);
function startColorChange() {
	startButtonEl.disabled = true;
	stopButtonEl.disabled = false;
	timerId = setInterval(() => {
		changeBgColor();
	}, 1000);
}
function changeBgColor() {
	document.body.style.backgroundColor = getRandomHexColor();
}
function stopColorChange() {
	startButtonEl.disabled = false;
	stopButtonEl.disabled = true;
	clearInterval(timerId);
}