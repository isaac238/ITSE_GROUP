import Collections from "$lib/server/collections";

export async function load({ locals }) {
	const collections = new Collections(locals.pb);
	const collectionsData = await collections.getAllLogsAndPlans(`user.id = '${locals.user.id}'`);
	return { user: locals.user, collectionsData };
}

