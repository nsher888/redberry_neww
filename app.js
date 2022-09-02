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
	localStorage.setItem('firstName', firstName.value);
	localStorage.setItem('surname', surname.value);
	localStorage.setItem('team', team.value);
	localStorage.setItem('teamName', team.name);
	localStorage.setItem('position', position.value);
	localStorage.setItem('email', email.value);
	localStorage.setItem('telephone', telephone.value);
};

window.onload = function () {
	if (!firstName.value) {
		firstName.value = localStorage.firstName;
	}
	if (!surname.value) {
		surname.value = localStorage.surname;
	}
	if (!team.value) {
		team.value = localStorage.team;
	}
	if (!position.value) {
		position.value = localStorage.position;
	}
	if (!email.value) {
		email.value = localStorage.email;
	}
	if (!telephone.value) {
		telephone.value = localStorage.telephone;
	}
};

// FIRT PAGE SUBMIT BUTTON

function error(name, message) {
	name.classList.add('red-alert');
	name.parentNode.style.color = 'red';
	const parentElement = name.parentElement;
	const error = parentElement.querySelectorAll('#error-msg');
	error[0].innerText = message;
}

const nextBtn = document.getElementById('next-btn');

nextBtn.addEventListener('click', (e) => {
	e.preventDefault();
	error(firstName, 'RADIOACTIVE ZONE');
});
