export async function POST({ locals, request }) {
	const body = await request.json()
	const { collection, data } = body;
	const pb = locals.pb;

	if (locals.user && !data.user) {
		data.user = locals.user.id;
	}

	try {
		const record = await pb.collection(collection).create(data);
		return new Response(JSON.stringify(record), { status: 200 });
	} catch (error) {
		console.log(error)
		return new Response(undefined, { status: 444 });
	}
}
