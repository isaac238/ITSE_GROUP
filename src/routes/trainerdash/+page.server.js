import Collections from '$lib/server/collections';

export async function load({locals, params}) {
	const collections = new Collections(locals.pb);
	const clientData = await collections.getRecord("users", locals.user.id);
	return { user: locals.user, clientData };
}
