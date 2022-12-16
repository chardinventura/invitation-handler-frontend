import { api, LightningElement } from "lwc";

export default class InvitationList extends LightningElement {

	@api
	invitations;

	selectedInvitationId;

	isValidatorVisible;

	get label() {
		return {
			id: "Identificador",
			description: "Description"
		};
	}

	handleView({ target }) {
		this.selectedInvitationId = target.dataset.id;
		this.isValidatorVisible = true;
	}

	handleAbort() {
		this.isValidatorVisible = false;
	}

	handleSuccess({ detail }) {
		this.isValidatorVisible = false;
		this.dispatchEvent(new CustomEvent('view', { detail }));
	}
}