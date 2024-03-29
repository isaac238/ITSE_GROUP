// Forgot password server.js

//imports
import Auth from '$lib/server/auth';

// exports
export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const auth = new Auth(locals.pb);
		const response = await auth.requestPasswordReset(data);

		return {success: response.success, email: data.get('email')}
	}
}
