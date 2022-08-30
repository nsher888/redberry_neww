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

	position.innerHTML =
		'<option value="position" disabled selected>პოზიცია</option>';

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
