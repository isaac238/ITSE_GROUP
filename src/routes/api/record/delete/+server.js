import Collections from "$lib/server/collections";

export async function POST({ locals, request }) {
	const body = await request.json()
	const { collection, id } = body;
	const pb = locals.pb;

	try {
		const collections = new Collections(pb);
		const record = await collections.deleteRecord(collection, id);
		return new Response(JSON.stringify(record), { status: 200 });
	} catch (error) {
		console.log(error)
		return new Response(undefined, { status: 444 });
	}
}
