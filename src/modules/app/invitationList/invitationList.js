import { api, LightningElement } from "lwc";

export default class InvitationList extends LightningElement {
	@api
	invitations;

	get label() {
		return {
			id: "Identificador",
			description: "Description"
		};
	}

	handleView({ target }) {
		this.dispatchEvent(new CustomEvent('view', {
			detail: target.dataset.id
		}));
	}
}