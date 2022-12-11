import { BASE_PATH } from 'api/constants';

export async function validateInvitation(id, password) {
	const body = {
		id,
		password
	};
	const response = await fetch(`${BASE_PATH}/invitations/validate`, {
		method: 'post',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
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