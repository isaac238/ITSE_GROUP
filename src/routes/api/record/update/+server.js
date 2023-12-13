export async function POST({ locals, request }) {
	const body = await request.json()
	const { collection, recordID, data } = body;
	const pb = locals.pb;

	try {
		const record = await pb.collection(collection).update(recordID, data);
		return new Response(JSON.stringify(record), { status: 200 });
	} catch (error) {
		console.log(error)
		return new Response(JSON.stringify(undefined), { status: 444 });
	}
}
