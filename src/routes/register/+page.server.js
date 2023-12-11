import { error, redirect } from "@sveltejs/kit";
import Auth from "$lib/server/auth";
import { errorsStore,successStore } from "../../lib/store.js";

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const auth = new Auth(locals.pb);
		const response = await auth.registerMember(data);

		if (response.success) {
			successStore.addNotification(response)
			throw redirect(301, "/login");}
		else {
			console.log(response)
			errorsStore.addNotification(response);}

	}
}
