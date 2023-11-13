import { getPocketbase } from '$lib/server/database_handler';
import  { redirect } from '@sveltejs/kit';

export function load({ params }) {
	const pb = getPocketbase();
	pb.authStore.clear();
	throw redirect(301, '/login');
}
