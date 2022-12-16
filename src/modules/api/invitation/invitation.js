import { BASE_PATH } from 'api/constants';

export class getInvitations {

	constructor(dataCallback) {
		this.dataCallback = dataCallback;
	}

	connect() {}

	update() {
		fetch(`${BASE_PATH}/invitations`)
		.then((response) => response.json())
		.then((invitations) => this.dataCallback({ data: invitations }))
		.catch((error) => this.dataCallback({ error }));
	}

	disconnect(){}
}

export async function validateInvitation(id, invitation) {
	const response = await fetch(`${BASE_PATH}/invitations/${id}/validate`, {
		method: 'post',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(invitation)
	});
	return response.status;
}

export function registerAttendance(invitationId, people) {
	const body = {
		people
	};
	return fetch(`${BASE_PATH}/invitations/register-attendance/${invitationId}`, {
		method: "put",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	});
}