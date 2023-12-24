export async function POST({ locals, request }) {
	const body = await request.json()
	const { collection, data } = body;
	let expand = "";
	if (collection == "portion_fooditem") expand = "foodItem";
	
	const pb = locals.pb;

	if (locals.user && !data.user) {
		data.user = locals.user.id;
	}

	try {
		const record = await pb.collection(collection).create(data, {"expand": expand});
		return new Response(JSON.stringify(record), { status: 200 });
	} catch (error) {
		console.log(error)
		return new Response(JSON.stringify(undefined), { status: 444 });
	}
}
