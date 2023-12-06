import  { redirect } from '@sveltejs/kit';
import Auth from '$lib/server/auth';

export async function load({ locals }) {
	const auth = new Auth(locals.pb);
	const response = await auth.logout();
	console.log(response);
	if (response.success) throw redirect(301, '/login');
}
