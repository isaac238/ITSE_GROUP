export async function POST({ locals, request }) {
	const body = await request.json()
	const { collection, query } = body;
	const pb = locals.pb;

	try {
		console.log(query);
		const record = await pb.collection(collection).getFirstListItem(query);
		console.log(record);
		return new Response(JSON.stringify(record), { status: 200 });
	} catch (error) {
		console.log(error)
		if (error.message == "The requested resource wasn't found.") {
			return new Response(JSON.stringify(null), { status: 444 });
		}
		return new Response(JSON.stringify(undefined), { status: 444 });
	}
}
