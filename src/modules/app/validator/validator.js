import { api, LightningElement } from "lwc";
import { validateInvitation } from 'api/invitation';

export default class Validation extends LightningElement {

	@api
	invitationId;

	get label() {
		return {
			back: 'Volver',
			header: 'Ingrese la contraseña',
			password: 'Contraseña',
			validate: 'Validar'
		}
	}

	handlePasswordChange({ target }) {
		this.password = target.value;	
	}

	handleValidation() {
		validateInvitation(this.invitationId, this.password)
		.then((status) => {
			if(status === 200) {
				this.goToHomeView();
			} else if(status === 400) {
				alert('Credenciales inválidas, el enlace o la contraseña son incorrectos.')
			}
		}).catch((error) => {
			console.error('Error in handleValidation --> ', error);
		})
	}

	goToHomeView() {
		this.dispatchEvent(new CustomEvent('navigate', {
			detail: "home"
		}));
	}
}