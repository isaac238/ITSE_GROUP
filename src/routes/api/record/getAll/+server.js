export async function POST({ locals, request }) {
// this.pb.collection(collection)
    const body = await request.json()
	const { collection} = body;
	const pb = locals.pb;
    try {
        const record = await pb.collection(collection).getFullList();
        return new Response(JSON.stringify(record), {status: 200});
    } catch (error) {
		console.log(error)
		return new Response(JSON.stringify(undefined), { status: 444 });
    }
}
