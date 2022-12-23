import { api, LightningElement } from 'lwc';
import { View } from 'util/constants';
import { navigate } from 'util/functions';

import { registerAttendance } from 'api/invitation'

const buildPersonBtnClass = (attendance) => `btn btn-${attendance ? 'success' : 'outline-danger' } mb-2`;

export default class Invitation extends LightningElement {

	@api
	invitationId;

	@api
	set people(value) {
		this._people = value?.map((person) => ({
			...{...person},
			class: buildPersonBtnClass(person.attendance)
		}));
	}

	get people() {
		return this._people;
	}

	_people;

	get label() {
		return {
			problemsRegisteringAttendance: "Ha ocurrido un error al intentar registrar la asistencia, intentar de nuevo."
		};
	}

	handlePersonSelection({ target }) {
		const id = Number(target.dataset.id);
		this._people = this.people.map((person) => {
			const attendance = person.id === id ? !person.attendance : person.attendance;
			return {
				...person,
				class: buildPersonBtnClass(attendance),
				attendance
			};
		});
	}

	@api
	registerAttendance() {
		console.log('registerAttendance()');
		const people = this.people.map(({ id, attendance }) => ({
			id,
			attendance
		}))
		registerAttendance(this.invitationId, people)
		.then(({ status }) => {
			if(status === 200) {
				this.attendanceConfirmation();
			}
		}) .catch((error) => {
			this.showAlert(this.label.problemsRegisteringAttendance)
			console.error('Error in registerAttendance --> ', error);
		});
	}

	attendanceConfirmation() {
		navigate.bind(this)(View.FAREWELL, false);
	}
}