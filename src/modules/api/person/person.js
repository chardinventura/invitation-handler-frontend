import { BASE_PATH } from "api/constants";

export class getPeopleByInvitationId {

	constructor(dataCallback) {
		this.dataCallback = dataCallback;
	}

	connect() {}

	async update({ invitationId }) {
		if(!invitationId) return;

		try {
			const response = await fetch(`${BASE_PATH}/people/invitation/${invitationId}`);
			const data = (await response.json())
			.map(({ id, firstName, lastName, attendance }) => ({
				id,
				firstName,
				lastName,
				attendance
			}));
			this.dataCallback({ data });
		} catch (error) {
			this.dataCallback({ error });
		}
	}

	disconnect() {}
}