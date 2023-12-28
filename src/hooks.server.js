import { redirect } from '@sveltejs/kit';
import pocketbase from 'pocketbase';
import { PUBLIC_POCKETBASE_HOST } from '$env/static/public';

const newPocketbaseConnection = () => {
	const pb = new pocketbase(PUBLIC_POCKETBASE_HOST);
	pb.autoCancellation(false);
	return pb;
}

export const handle = (async ({ event, resolve }) => {
	const pb = newPocketbaseConnection();

	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		pb.authStore.isValid && (await pb.collection('users').authRefresh());
	} catch {
		pb.authStore.clear();
	}

	event.locals.pb = pb;
	event.locals.user = event.locals.pb.authStore.model;
	if (event.locals.user)
		event.locals.user.avatar = pb.files.getUrl(event.locals.user, event.locals.user.avatar);

	const trainerOnlyRoutes = ["/trainerdash"];
	const memberOnlyRoutes = ["/userdash"];

	const isTrainer = event.locals.user ? event.locals.user.role.includes("trainer") : false;
	const isMember = event.locals.user ? event.locals.user.role.includes("member") : false;

	const routeIsTrainerOnly = trainerOnlyRoutes.includes(event.url.pathname);
	const routeIsMemberOnly = memberOnlyRoutes.includes(event.url.pathname);

	if (!isTrainer && routeIsTrainerOnly) throw redirect(302, "/");
	if (!isMember && routeIsMemberOnly) throw redirect(302, "/");

	const response = await resolve(event);
	response.headers.set(
		'Set-Cookie',
		event.locals.pb.authStore.exportToCookie({ httpOnly: true, sameSite: 'strict' })
	);
	return response;
});

