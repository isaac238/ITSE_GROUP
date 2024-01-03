// Login page server.js

// imports

// Libraries
import { redirect } from "@sveltejs/kit";
import Auth from "$lib/server/auth";

// exports

// This feature won't work as noted in /login/+page.svelte

export async function load({ url }) {
	const params = new URLSearchParams(url.search);
	console.log(params.get("redirected"))
	console.log(params)
	return {isFromRegister: params.get("redirected")}
}

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const auth = new Auth(locals.pb);
		const response = await auth.login(data);
		console.log(response);
		return response;
	}
}
