import { LightningElement } from "lwc";
import { View } from 'util/constants';
import { navigate } from 'util/functions';

export default class Home extends LightningElement {

	handleNavigation() {
		navigate.bind(this)(View.INVITATIONS);
	}
}