import databaseHandler from "$lib/server/database_handler";
import { redirect } from "@sveltejs/kit";
export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const response = await databaseHandler.requestPasswordReset(data);

		if (response.success) throw redirect(301, "/login");
		else{
			console.log(response.message)
		}
	}
}
