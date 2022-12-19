import { LightningElement } from "lwc";
import { View } from 'util/constants';
import { navigate } from 'util/functions';

export default class Home extends LightningElement {

	get label() {
		return {
			goToInvitations: "Go to invitations"
		};
	}

	handleNavigation() {
		navigate.bind(this)(View.INVITATIONS);
	}
}