import { api, LightningElement } from "lwc";
import { View } from 'util/constants';
import { navigate } from 'util/functions';

export default class InvitationList extends LightningElement {

	@api
	invitations;

	selectedInvitation;

	get label() {
		return {
			id: "Identificador",
			description: "Description",
			selectYourFamily: "Seleccione su familia",
			goToHome: "VOLVER AL INICIO"
		};
	}

	handleView({ target }) {
		this.selectedInvitation = this.invitations.find(({ id }) => id === target.dataset.id);
		this.template.querySelector("component-validator").show();
	}

	handleSuccess({ detail }) {
		this.dispatchEvent(new CustomEvent('view', { detail }));
		navigate.bind(this)(View.ATTENDANCE_CONFIRMATION, false);
	}

	handleGoBack() {
		navigate.bind(this)(View.HOME);
	}
}