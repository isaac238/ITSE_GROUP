import { redirect } from "@sveltejs/kit";
import Auth from "$lib/server/auth";

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const auth = new Auth(locals.pb);
		const response = await auth.login(data);
		console.log(response);
		if (response.success) throw redirect(301, "/userdash");
	}
}
