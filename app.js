// TEAM SELECT

const dropdown = document.getElementById('team');
const positionDropdown = document.getElementById('position');

const teamsUrl = 'https://pcfy.redberryinternship.ge/api/teams';
const PositionsUrl = 'https://pcfy.redberryinternship.ge/api/positions';

fetch(teamsUrl)
	.then((response) => response.json())
	.then((answer) => {
		let teamsList = answer.data;

		console.log(teamsList);

		for (let i = 0; i < teamsList.length; i++) {
			let option = document.createElement('option');
			option.value = teamsList[i].id;
			option.innerHTML = teamsList[i].name;
			dropdown.appendChild(option);
		}
	});

dropdown.addEventListener('change', () => {
	const selectedTeam = dropdown.value;

	position.innerHTML = '<option disabled selected hidden>პოზიცია</option>';

	fetch(PositionsUrl)
		.then((response) => response.json())
		.then((answer) => {
			let positionsList = answer.data;

			console.log(positionsList);

			for (let i = 0; i < positionsList.length; i++) {
				let option = document.createElement('option');
				option.value = positionsList[i].id;
				option.innerHTML = positionsList[i].name;
				if (positionsList[i].team_id == selectedTeam) {
					position.appendChild(option);
				}
			}
		});
});

// MODAL

const modal = document.getElementById('modal');
const btn = document.getElementById('save-btn');

// btn.onclick = function () {
// 	modal.style.display = 'block';
// 	document.body.style.overflow = 'hidden';
// 	document.body.style.height = '100%';
// };

// LocalStorage

const firstName = document.getElementById('firstname');
const surname = document.getElementById('surname');
const team = document.getElementById('team');
const position = document.getElementById('position');
const email = document.getElementById('email');
const telephone = document.getElementById('telephone');
// const errorMsg = document.getElementById('error-msg');

window.onbeforeunload = function () {
	sessionStorage.setItem('firstName', firstName.value);
	sessionStorage.setItem('surname', surname.value);
	sessionStorage.setItem('team', team.value);
	sessionStorage.setItem('teamName', team.name);
	sessionStorage.setItem('position', position.value);
	sessionStorage.setItem('email', email.value);
	sessionStorage.setItem('telephone', telephone.value);
};

// window.onload = function () {
// 	if (!firstName.value) {
// 		firstName.value = sessionStorage.firstName;
// 	}
// 	if (!surname.value) {
// 		surname.value = sessionStorage.surname;
// 	}
// 	if (!team.value) {
// 		team.value = sessionStorage.team;
// 	}
// 	if (!position.value) {
// 		position.value = sessionStorage.position;
// 	}
// 	if (!email.value) {
// 		email.value = sessionStorage.email;
// 	}
// 	if (!telephone.value) {
// 		telephone.value = sessionStorage.telephone;
// 	}
// };

window.onload = function () {
	if (sessionStorage.firstName) {
		firstName.value = sessionStorage.firstName;
	}
	if (sessionStorage.surname) {
		surname.value = sessionStorage.surname;
	}
	if (sessionStorage.team) {
		team.value = sessionStorage.team;
	}
	if (sessionStorage.position) {
		position.value = sessionStorage.position;
	}
	if (sessionStorage.email) {
		email.value = sessionStorage.email;
	}
	if (sessionStorage.telephone) {
		telephone.value = sessionStorage.telephone;
	}
};

// FIRT PAGE SUBMIT BUTTON

const geoLetters = /^[ა-ჰ]+$/;
const geoPhone = /^(\+?995)?(79\d{7}|5\d{8})$/;

function error(name, message) {
	name.classList.add('red-alert');
	name.parentNode.style.color = 'red';
	const parentElement = name.parentElement;
	const error = parentElement.querySelectorAll('#error-msg');
	error[0].innerText = message;
}

function validated(name, message) {
	name.classList.remove('red-alert');
	name.parentNode.style.color = 'black';
	const parentElement = name.parentElement;
	const error = parentElement.querySelectorAll('#error-msg');
	error[0].innerText = message;
}

function selectError(name) {
	name.classList.add('red-alert-select');
}

function selectValidated(name) {
	name.classList.remove('red-alert-select');
}

const nextBtn = document.getElementById('next-btn');

function firstPageValidation() {
	firstnameValue = firstName.value.trim();
	surnameValue = surname.value.trim();
	emailValue = email.value.trim();
	telephoneValue = telephone.value.trim();

	// NAME VALIDATIOn
	if (!firstnameValue) {
		error(firstName, 'მოცემული ველის შევსება სავალდებულოა');
	} else if (firstnameValue.length < 2) {
		error(firstName, 'მინიმუმ 2 სიმბოლო');
	} else if (!geoLetters.test(firstnameValue)) {
		error(firstName, 'მხოლოდ ქართული სიმბოლოები');
	} else {
		validated(firstName, 'მინიმუმ 2 სიმბოლო, ქართული ასოები');
	}

	// Surname Validation

	if (!surnameValue) {
		error(surname, 'მოცემული ველის შევსება სავალდებულოა');
	} else if (surnameValue.length < 2) {
		error(surname, 'მინიმუმ 2 სიმბოლო');
	} else if (!geoLetters.test(surnameValue)) {
		error(surname, 'მხოლოდ ქართული სიმბოლოები');
	} else {
		validated(surname, 'მინიმუმ 2 სიმბოლო, ქართული ასოები');
	}

	// Mail Validation
	if (!emailValue) {
		error(email, 'მოცემული ველის შევსება სავალდებულოა');
	} else if (!emailValue.endsWith('@redberry.ge')) {
		error(email, 'უნდა მთავრდებოდეს @redberry.ge-თი');
	} else {
		validated(email, 'უნდა მთავრდებოდეს @redberry.ge-თი');
	}

	// Select Validations

	if (!telephoneValue) {
		error(telephone, 'მოცემული ველის შევსება სავალდებულოა');
	} else if (!geoPhone.test(telephoneValue)) {
		error(telephone, 'არ აკმაყოფილებს ქართული მობილური ნომრის ფორმატს');
	} else {
		validated(telephone, 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს');
	}

	if (!team.value || team.value === 'თიმი') {
		selectError(team);
	} else {
		selectValidated(team);
	}

	if (!position.value || position.value === 'პოზიცია') {
		selectError(position);
	} else {
		selectValidated(position);
	}
}

nextBtn.addEventListener('click', (e) => {
	e.preventDefault();

	firstPageValidation();
});
