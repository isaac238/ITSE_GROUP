import Pin from '$lib/server/pin.js';

export async function load({ locals }) {
	const pin = new Pin(locals.pb);
	let pinDecrypted = null;
	if (locals.user) {
		pinDecrypted = await pin.get(locals.user.pin);
	}
	return {user: locals.user, isTrainer: locals.isTrainer, isMember: locals.isMember, pin: pinDecrypted }
 }
