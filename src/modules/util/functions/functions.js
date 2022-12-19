import { VIEW_CACHE_KEY } from 'util/constants';

export function navigate(viewName, caching = true) {
	this.dispatchEvent(new CustomEvent('navigate', {
		detail: viewName
	}));
	if(caching) {
		sessionStorage.setItem(VIEW_CACHE_KEY, viewName);
	}
 }