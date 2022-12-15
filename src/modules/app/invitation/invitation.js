import { api, LightningElement, wire } from 'lwc';
import { getPeopleByInvitationId } from 'api/person';
import { registerAttendance } from 'api/invitation'

const buildPersonBtnClass = (attendance) => `btn btn-${attendance ? '' : 'outline-' }primary mb-2`;

export default class Invitation extends LightningElement {

	@api
	invitationId;

	people;

	@wire(getPeopleByInvitationId, {
		invitationId: "$invitationId"
	})
	getPeopleByInvitationId({ data, error }) {
		const isEmpty = !data?.length;
		if(!isEmpty) {
			this.people = data.map((person) => ({
				...person,
				class: buildPersonBtnClass(person.attendance)
			}));
		} else if(isEmpty) {
			alert('No hay personas a registrar.')
		} else if(error) {
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
		})
	}

	handleNavigation() {
		this.dispatchEvent(new CustomEvent('navigate', {
			detail: 'test'
		}));
	}
}