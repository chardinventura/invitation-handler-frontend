import { api, LightningElement } from "lwc";

export default class Toast extends LightningElement {

	@api
	message;

	get label() {
		return {
			close: "Cerrar"
		};
	}

	@api
	show() {
		const toast = this.template.querySelector('[data-id="alert"]');
		(this.toast = new bootstrap.Toast(toast))
		.show();
	}

	handleClose() {
		this.toast.hide();
	}
}