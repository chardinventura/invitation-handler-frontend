import { api, LightningElement } from "lwc";
import { validateInvitation } from "api/invitation";

export default class Validator extends LightningElement {
	@api
	invitationId;

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
	showModal() {
		const modal = this.template.querySelector('[data-id="modal"]');
		const key = this.template.querySelector('[data-id="key"]');

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
		validateInvitation(this.invitationId, invitation)
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
						id: this.invitationId,
						key: this.key,
					},
				})
			);
		}
	}
}
