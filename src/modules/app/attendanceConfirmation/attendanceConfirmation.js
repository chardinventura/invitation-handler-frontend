import { api, LightningElement, wire } from "lwc";
import { View } from 'util/constants';
import { navigate } from 'util/functions';

import { getPeopleByInvitation } from 'api/person';

export default class AttendanceConfirmation extends LightningElement {

	@api
	selectedInvitation;

	get invitationId() {
		return this.selectedInvitation.id;
	}

	get invitationKey() {
		return this.selectedInvitation.key;
	}

	anyError;

	_isLoading;
	people;

	toastMessage;

	get isLoading() {
		return !this.anyError && (!this.people || this._isLoading);
	}

	get isSubmitDisabled() {
		return !this.people?.length;
	}

	get label() {
		return {
			goBack: "Volver",
			submit: "Submit",
			notPeopleFound: "No hay personas a registrar.",
			problemsToFetch: "Problemas al obtener las personas a asistir.",
			successFul: "Asistencia registrada con éxito.",
			problemsRegisteringAttendance: "Ha ocurrido un error al intentar registrar la asistencia, intentar de nuevo."
		};
	}

	@wire(getPeopleByInvitation, {
		invitationId: "$invitationId",
		invitationKey: "$invitationKey"
	})
	getPeopleByInvitationId({ data, error }) {
		if(data) {
			this.people = data;
			if(!this.people.length) {
				this.showAlert(this.label.notPeopleFound);
			}
		} else if(error) {
			this.anyError = true;
			this.showAlert(this.label.problemsToFetch);
			console.error('Error in getPeopleByInvitationId --> ', error);
		}
	}

	handleNavigation({ detail }) {
		navigate.bind(this)(detail);
	}

	showAlert(message) {
		if(message) {
			this.toastMessage = message;
		}
		this.template.querySelector('component-toast').show();
	}

	handleSubmit() {
		this._isLoading = true;
		this.template.querySelector('component-attendance-list').registerAttendance();
	}

	handleAbort() {
		navigate.bind(this)(View.FAREWELL);
	}
}