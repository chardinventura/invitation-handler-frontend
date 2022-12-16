import { LightningElement } from "lwc";

export default class Spinner extends LightningElement {
	get label() {
		return {
			loading: "Cargando..."
		};
	}
}