import { LightningElement } from "lwc";

export default class Home extends LightningElement {

	handleNavigation() {
		this.dispatchEvent(new CustomEvent('navigate', {
			detail: 'invitations'
		}));
	}
}