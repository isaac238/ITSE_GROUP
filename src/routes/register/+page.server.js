// Register page server.js

// imports

// Libraries
import {redirect } from "@sveltejs/kit";
import Auth from "$lib/server/auth";
import Collections from '$lib/server/collections';

export async function load({ locals }) {
	const collections = new Collections(locals.pb);
	const branches = await collections.getAllRecords("branches");
	return { branches }
}

// exports
export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const auth = new Auth(locals.pb);
		const response = await auth.registerMember(data);

		if (response.success) {
			// throw (redirect(301, "/login"))
			throw redirect(301, "/login?redirected=true");
		}
		else {
			return response.message;
		}
	}
}

