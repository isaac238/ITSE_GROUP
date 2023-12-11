import { error, redirect } from "@sveltejs/kit";
import Auth from "$lib/server/auth";
import { errorsStore } from "../../lib/store.js";

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const auth = new Auth(locals.pb);
		const response = await auth.registerMember(data);

		if (response.success) {
			// pre-made code (not tested errors yet)
			// successStore.addNotification(response.message)
			throw redirect(301, "/login");}
		// else errorsStore.addNotification(response.message);
		console.log(response)
	}
}
