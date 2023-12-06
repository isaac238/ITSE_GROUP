import  { redirect } from '@sveltejs/kit';
import Auth from '$lib/server/auth';

export function load({ locals }) {
	const auth = new Auth(locals.pb);
	const response = auth.logout();
	if (response.success) throw redirect(301, '/login');
}
