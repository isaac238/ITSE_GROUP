import { describe, it, expect } from 'vitest';
import pocketbase from 'pocketbase';
import { PUBLIC_POCKETBASE_HOST } from '$env/static/public';
import Pin from '$lib/server/pin.js';

const newPocketbaseConnection = () => {
	const pb = new pocketbase(PUBLIC_POCKETBASE_HOST);
	pb.autoCancellation(false);
	return pb;
}

let newPin;
const pb = newPocketbaseConnection();
const pin = new Pin(pb);

describe('Testing pin class', () => {
	it('Checks isValid function', async () => {
		const success = await pin.isValid("18071234", "2004-07-18");
		expect(success).toBe(true);
	});

	it('Attempts to create a pin in the db', async () => {
		newPin = await pin.create("2004-07-18");
		expect(newPin.success).toBe(true);
	});

	it('Attempts to get a pin from the db', async () => {
		if (newPin.success) {
			const getPin = await pin.get(newPin.body.id);
			expect(getPin).toBe(newPin.plainText);
		}
	});

	it("Attempts to delete a pin from the db", async () => {
		let success;
		if (newPin.success) {
			success = await pb.collection('pins').delete(newPin.body.id);
			expect(success).toBe(true);
		}


	});
});
