import { LightningElement, wire } from 'lwc';
import { getInvitations } from 'api/invitation';
import { View, VIEW_CACHE_KEY } from 'util/constants';

const DEFAULT_VIEW = View.HOME;

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

	activeView = {};

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
		const cachedView = sessionStorage.getItem(VIEW_CACHE_KEY);
		const isValidView = Object.values(View).some((viewName) => {
			return viewName === cachedView;
		});
		if(cachedView && !isValidView) {
			sessionStorage.removeItem(VIEW_CACHE_KEY);
			this.enableView(DEFAULT_VIEW);
		} else {
			this.enableView(cachedView || DEFAULT_VIEW);
		}
	}

	handleNavigation({ detail }) {
		this.enableView(detail);
	}

	enableView(viewName) {
		this.activeView = { [viewName]: true };
	}

	handleViewInvitation({ detail }) {
		this._selectedInvitation = this.invitations.find(({ id }) => {
			return id === detail.id
		});
	}
}
