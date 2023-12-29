import Pin from '$lib/server/pin.js';

export async function load({ locals }) {
	const pin = new Pin(locals.pb);
	const pinDecrypted = await pin.get(locals.user.pin);
	return {user: locals.user, pin: pinDecrypted }
 }
