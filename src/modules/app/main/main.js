import { LightningElement, wire } from 'lwc';
import { getInvitations } from 'api/invitation';

const DEFAULT_VIEW = 'test';

export default class HelloWorldApp extends LightningElement {

	invitations;

	get selectedInvitation() {
		return this._selectedInvitation || {};
	}

	_selectedInvitation;

	get isLoading() {
		return !this.anyError &&
		(
			!this.invitations
		);
	}

	anyError;

	View = {
		home: false,
		test: true,
		invitations: false
	};

	@wire(getInvitations)
	getInvitations({ data, error }) {
		if(data) {
			this.invitations = data;
		} else if(error) {
			console.error('Error in --> getInvitations ', error);
			this.anyError = true;
		}
	}

	connectedCallback() {
		const cachedView = sessionStorage.getItem('view');
		if(cachedView && this.View[cachedView] != null) {
			this.enableView(cachedView);
		} else {
			this.enableView(DEFAULT_VIEW);
		}
	}

	handleNavigation({ detail }) {
		this.enableView(detail);
		sessionStorage.setItem('view', detail);
	}

	enableView(viewName) {
		this.View = Object.entries(this.View)
		.reduce((accumulator, [name]) => ({
			...accumulator,
			[name]: name === viewName
		}), {});
	}

	handleViewInvitation({ detail }) {
		this._selectedInvitation = detail;
		this.enableView('invitations');
	}
}
