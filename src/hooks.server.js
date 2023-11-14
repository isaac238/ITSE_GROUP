import { startPocketbase, getPocketbase } from '$lib/server/database_handler';
import databaseHandler from './lib/server/database_handler';
import { redirect } from '@sveltejs/kit';

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

	const trainerOnlyRoutes = ["/trainerdash"];
	const memberOnlyRoutes = ["/userdash"];
	console.log(event.url.pathname);
	console.log(event.locals.user);

	if (!await databaseHandler.isTrainer() && trainerOnlyRoutes.includes(event.url.pathname)) {
		console.log("IS NOT TRAINER ACCESSING TRAINER ONLY ROUTE");
		throw redirect(302, "/");
	}

	if (!await databaseHandler.isMember() && memberOnlyRoutes.includes(event.url.pathname)) {
		console.log("IS NOT MEMBER ACCESSING MEMBER ONLY ROUTE");
		throw redirect(302, "/");
	}

	const response = await resolve(event);
	response.headers.set(
		'Set-Cookie',
		event.locals.pb.authStore.exportToCookie({ httpOnly: true, sameSite: 'strict' })
	);
	return response;
});
