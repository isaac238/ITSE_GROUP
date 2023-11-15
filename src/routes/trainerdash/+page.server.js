import databaseHandler from "../../lib/server/database_handler";

export async function load({ params }) {
	return { user: databaseHandler.getUser()}
}
