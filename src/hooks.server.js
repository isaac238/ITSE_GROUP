import { startPocketbase, getPocketbase } from './lib/server/database_handler';

startPocketbase();

export const handle = (async ({ event, resolve }) => {
	const pb = getPocketbase();

	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		pb.authStore.isValid && (await pb.collection('users').authRefresh());
	} catch {
		pb.authStore.clear();
	}

	event.locals.pb = pb;
	event.locals.user = event.locals.pb.authStore.model;

	const response = await resolve(event);
	response.headers.set(
		'Set-Cookie',
		event.locals.pb.authStore.exportToCookie({ httpOnly: true, sameSite: 'strict' })
	);
	return response;
});

