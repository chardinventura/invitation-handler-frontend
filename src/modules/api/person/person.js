import { BASE_PATH } from "api/constants";

export class getPeopleByInvitation {

	constructor(dataCallback) {
		this.dataCallback = dataCallback;
	}

	connect() {}

	async update({ invitationId, invitationKey }) {
		const body = {
			id: invitationId,
			key: invitationKey
		};
		try {
			const response = await fetch(`${BASE_PATH}/people/invitation`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});
			const people = await response.json();
			this.dataCallback({ data: people });
		} catch (error) {
			this.dataCallback({ error });
		}
	}

	disconnect() {}
}