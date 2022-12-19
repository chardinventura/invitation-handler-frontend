import { api, LightningElement } from "lwc";
import { View } from 'util/constants'
import { navigate } from 'util/functions'

export default class Farewell extends LightningElement {

	@api
	invitation;

	get label() {
		return {
			goToHome: "Ir al inicio"
		};
	}

	handleGoToHome() {
		navigate.bind(this)(View.HOME);
	}
}