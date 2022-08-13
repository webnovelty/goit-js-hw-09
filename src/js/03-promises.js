
import Notiflix from 'notiflix';
const buttonCreatePromise = document.querySelector('button');
const form = document.querySelector('form');
const formData = {};

form.addEventListener('input', addDataForm);
function addDataForm(e) {
	formData[e.target.name] = Number(e.target.value);
}
buttonCreatePromise.addEventListener('click', onSubmitPromise);
function onSubmitPromise(e) {
	e.preventDefault();
	for (let i = 0; i < formData['amount']; i += 1) {
		createPromise(i + 1, formData['delay'])
			.then(result => Notiflix.Notify.success(result))
			.catch(error => Notiflix.Notify.failure(error));
		formData['delay'] += formData['step'];

	}
}
const createPromise = (position, delay) => {


	return new Promise((resolve, reject) => {
		const shouldResolve = Math.random() > 0.3;
		setTimeout(() => {

			if (shouldResolve) {
				resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
			}
			reject(`❌ Rejected promise ${position} in ${delay}ms`);

		}, delay);

	});
}

