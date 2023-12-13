import Collections from "$lib/server/collections";
import { redirect } from "@sveltejs/kit";

export async function load({ locals, params }) {
	const collections = new Collections(locals.pb);
	const recordID = params.plan;
	const recordData = await collections.getRecord("workout_plan", recordID);
	console.log(recordData);

	if (recordData === undefined) {
		throw redirect(301, "/userdash");
	}

	return { user: locals.user, recordData };
}
