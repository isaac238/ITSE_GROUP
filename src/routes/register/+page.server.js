// Register page server.js

// imports
import {redirect } from "@sveltejs/kit";
import Auth from "$lib/server/auth";

// exports
export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const auth = new Auth(locals.pb);
		const response = await auth.registerMember(data);

		if (response.success) {
			throw redirect(301, "/login?register=true");
		}
		else {
			return response.message;
		}
	}
}

