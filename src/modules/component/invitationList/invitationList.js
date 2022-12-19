import { api, LightningElement } from "lwc";
import { View } from 'util/constants';
import { navigate } from 'util/functions';

export default class InvitationList extends LightningElement {

	@api
	invitations;

	selectedInvitationId;

	get label() {
		return {
			id: "Identificador",
			description: "Description"
		};
	}

	handleView({ target }) {
		this.selectedInvitationId = target.dataset.id;
		this.template.querySelector("component-validator").showModal();
	}

	handleSuccess({ detail }) {
		this.dispatchEvent(new CustomEvent('view', { detail }));
		navigate.bind(this)(View.ATTENDANCE, false);
	}

	handleGoBack() {
		navigate.bind(this)(View.HOME);
	}
}