import { api, LightningElement } from "lwc";
import { View } from 'util/constants';
import { navigate } from 'util/functions';

export default class AttendanceConfirmation extends LightningElement {

	@api
	selectedInvitation;

	handleConfirmation() {
		navigate.bind(this)(View.ATTENDANCE, false);
	}

	handleAbort() {
		navigate.bind(this)(View.FAREWELL);
	}
}