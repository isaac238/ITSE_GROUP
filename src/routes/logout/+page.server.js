import Auth from '$lib/server/auth';

export async function load({ locals }) {
	const auth = new Auth(locals.pb);
	const response = await auth.logout();
	console.log(response);
	return response;
}
