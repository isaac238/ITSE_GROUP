import pocketbase from 'pocketbase';
import { PUBLIC_POCKETBASE_HOST } from '$env/static/public';


let pb = new pocketbase(PUBLIC_POCKETBASE_HOST);
pb.autoCancellation(false);

export function startPocketbase() {
	pb = new pocketbase(PUBLIC_POCKETBASE_HOST);
	pb.autoCancellation(false);
}

export function getPocketbase() {
	return pb;
}

export default class databaseHandler {
	static async login(formData) {
		try {
			await pb.collection('users').authWithPassword(formData.get('username'), formData.get('password'));
			return {success: true, message: "Logged in"};
		} catch (error) {
			console.log(error);
			return {success: false, message: "Error occured"};
		}
	}

	static async register(formData) {

		var pin;
		var birthday = formData.get('birthdate')
		var year = birthday.toString().split('-')[0].substring(2,4)
		var month = birthday.toString().split('-')[1]
		var random = Math.round(Math.random()*9999).toString()
		if(random.length == 1){
			random = "000" + random;
		}
		else if(random.length == 2){
			random = "00" + random;
		}
		else if(random.length == 3){
			random = "0" + random;
		}

		pin = year + month + random
		console.log(pin)

		try {
			const data = {
				"username": formData.get('username'),
				"email": formData.get('email'),
				"emailVisibility": true,
				"password": formData.get('password'),
				"passwordConfirm": formData.get('confirm-password'),
				"pin_number": pin
			};

			const record = await pb.collection('users').create(data);
			return {success: true, message: "Registered!"};
		} catch(error) {
			console.log(error);
			return {success: false, message: "A user with those details already exists!"};
		}
		
	}

}
