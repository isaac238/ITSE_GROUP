import databaseHandler from "$lib/server/database_handler";
import { redirect } from "@sveltejs/kit";
export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		console.log(...data)
		const response = await databaseHandler.login(data);
		if (response.success) throw redirect(301, "/userdash");
	}
}
