 export function navigate(viewName, caching = true) {
	this.dispatchEvent(new CustomEvent('navigate', {
		detail: viewName
	}));
	if(caching) {
		sessionStorage.setItem('view', viewName);
	}
 }