import { api, LightningElement } from "lwc";
import { validateInvitation } from "api/invitation";

export default class Validator extends LightningElement {

	@api
	invitationId;

	isKeyInvalid;

	get label() {
		return {
			invalidKey: "No válida, favor compruebe su clave"
		};
	}

	handleKeyChange({ target }) {
		this.key = target.value;
	}

	handleAbort() {
		this.dispatchEvent(new CustomEvent('abort'));
	}

	handleInvitationValidation() {
		const invitation = {
			key: this.key
		};
		validateInvitation(this.invitationId, invitation)
		.then((response) => {
			this.handleValidationResult(response);
		}) .catch((error) => {
			console.error('Error in validateInvitation --> ', error);
		})
	}

	handleValidationResult(response) {
		if(response === 400) {
			this.isKeyInvalid = true;
		} else if(response === 200) {
			this.isKeyInvalid = false;
			this.dispatchEvent(new CustomEvent('success', {
				detail: {
					id: this.invitationId,
					key: this.key
				}
			}));
		}
	}
}