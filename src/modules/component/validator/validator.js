import { api, LightningElement } from "lwc";
import { validateInvitation } from "api/invitation";

export default class Validator extends LightningElement {

	@api
	get invitation() {
		return this._invitation;
	}

	set invitation(value) {
		this._invitation = value ?? {};
	}

	_invitation;
	isKeyInvalid;

	isValidating;

	get validationButtonLabel() {
		return this.isValidating ? this.label.validating : this.label.validate;
	}

	get label() {
		return {
			close: "Cerrar",
			title: "Validar invitación",
			key: "Clave",
			invalidKey: "No válida, favor compruebe su clave",
			validate: "Validar",
			validating: "Validando"
		};
	}

	@api
	show() {
		const modal = this.template.querySelector('[data-id="modal"]');
		const key = this.template.querySelector('[data-id="key"]');
		// Clean old values.
		key.value = '';
		this.isKeyInvalid = false;

		if(!this.modal) {
			modal.addEventListener('shown.bs.modal', () => {
				key.focus();
			});
		}
		(this.modal = new bootstrap.Modal(modal))
		.show();
	}

	handleKeyChange({ target }) {
		this.key = target.value;
	}

	handleAbort() {
		this.modal.hide();
	}

	handleInvitationValidation() {
		this.isValidating = true;
		const invitation = {
			key: this.key,
		};
		validateInvitation(this.invitation.id, invitation)
		.then((response) => {
			this.handleValidationResult(response);
		}).catch((error) => {
			console.error('Error in validateInvitation --> ', error);
		});
	}

	handleValidationResult(response) {
		if (response === 400) {
			this.isValidating = false;
			this.isKeyInvalid = true;
		} else if (response === 200) {
			this.isKeyInvalid = false;
			this.modal.hide();
			this.dispatchEvent(
				new CustomEvent("success", {
					detail: {
						id: this.invitation.id,
						key: this.key,
					},
				})
			);
		}
	}

	handleKeyUp({ keyCode }) {
		// Enter key.
		if(keyCode === 13) {
			this.handleInvitationValidation();
		}
	}
}
