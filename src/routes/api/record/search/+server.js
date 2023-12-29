import Collections from "../../../../lib/server/collections";

export async function POST({ locals, request }) {
	const body = await request.json()
	const { collection, query } = body;
	const pb = locals.pb;

	try {
		console.log(query);
		const collections = new Collections(pb);
		const record = await collections.findRecord(collection, query);

		let responseCode = 444;

		console.log("Record:");
		console.log(record);

		let response = JSON.stringify(record);

		if (record != undefined && record != null) {
			responseCode = 200;
			response = JSON.stringify(record);
		}

		console.log("responseCode", responseCode);
		return new Response(response, { status: responseCode });
	} catch (error) {
		console.log(error)
	}
}
