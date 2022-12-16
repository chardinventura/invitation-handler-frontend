import { api, LightningElement, wire } from 'lwc';
import { getPeopleByInvitation } from 'api/person';
import { registerAttendance } from 'api/invitation'

const buildPersonBtnClass = (attendance) => `btn btn-${attendance ? '' : 'outline-' }primary mb-2`;

export default class Invitation extends LightningElement {

	@api
	invitationId;

	@api
	invitationKey;

	_isLoading;

	people;
	anyError;

	get isLoading() {
		return !this.anyError && (!this.people || this._isLoading);
	}

	@wire(getPeopleByInvitation, {
		invitationId: "$invitationId",
		invitationKey: "$invitationKey"
	})
	getPeopleByInvitationId({ data, error }) {
		if(data) {
			this.people = data.map((person) => ({
				...person,
				class: buildPersonBtnClass(person.attendance)
			}));
			if(!this.people.length)
				alert('No hay personas a registrar.')
		} else if(error) {
			this.anyError = true;
			alert('Problemas al obtener las personas a asistir.')
			console.error('Error in getPeopleByInvitationId --> ', error);
		}
	}

	get label() {
		return {
			goBack: "Volver",
			header: "Invitations",
			submit: "Submit"
		};
	}

	get isSubmitDisabled() {
		return !this.people?.length;
	}

	handlePersonSelection({ target }) {
		const id = Number(target.dataset.id);
		this.people = this.people.map((person) => {
			const attendance = person.id === id ? !person.attendance : person.attendance;
			return {
				...person,
				class: buildPersonBtnClass(attendance),
				attendance
			};
		});
	}

	handleSubmit() {
		this._isLoading = true;
		const people = this.people.map(({ id, attendance }) => ({
			id,
			attendance
		}))
		registerAttendance(this.invitationId, people)
		.then(({ status }) => {
			if(status === 200) {
				alert('Asistencia registrada con éxito.');
			}
		})
		.catch((error) => {
			alert('Ha ocurrido un error al intentar registrar la asistencia, intentar de nuevo.')
			console.error('Error in registerAttendance --> ', error);
		}).finally(() => {
			this._isLoading = false;
		});
	}

	handleNavigation() {
		this.dispatchEvent(new CustomEvent('navigate', {
			detail: 'test'
		}));
	}
}