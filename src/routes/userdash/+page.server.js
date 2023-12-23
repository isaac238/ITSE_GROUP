import Collections from "$lib/server/collections";

export async function load({ locals }) {
	const x = await locals.pb.collection("users").getOne(locals.user.id,
	 {expand: "trainees"}
	);
	console.log(x);
	const collections = new Collections(locals.pb);
	const collectionsData = await collections.getAllLogsAndPlans();
	return { user: locals.user, collectionsData };
}

