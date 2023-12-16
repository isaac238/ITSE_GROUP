// Login page server.js

// imports

import { redirect } from "@sveltejs/kit";
import Auth from "$lib/server/auth";
import { errorsStore } from "../../lib/store.js";

// exports

export async function load({ url }) {
	const params = new URLSearchParams(url.search);
	return {isFromRegister: params.get("redirected")}
}

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const auth = new Auth(locals.pb);
		const response = await auth.login(data);
		if (response.success) throw redirect(301, "/userdash")
		else errorsStore.addNotification(response.message);
	}
}
