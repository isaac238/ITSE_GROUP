import Collections from "$lib/server/collections";

export async function POST({ locals, request }) {
// this.pb.collection(collection)
    const body = await request.json()
	const { collection} = body;
	const pb = locals.pb;
    try {
		const collections = new Collections(pb);
		const records = await collections.getAllRecords(collection);
        return new Response(JSON.stringify(records), {status: 200});
    } catch (error) {
		console.log(error)
		return new Response(JSON.stringify(undefined), { status: 444 });
    }
}
