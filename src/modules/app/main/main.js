import { LightningElement } from 'lwc';

const DEFAULT_VIEW = 'home';

export default class HelloWorldApp extends LightningElement {

	View = {
		home: false,
		invitations: false
	};

	get invitationId() {
		const invitationId = window.location.pathname.replace(/\//, '');
		return !invitationId ? 'something' : invitationId;
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
}
