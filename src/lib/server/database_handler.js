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

		var random = Math.round(Math.random()*9999)
		
		if(random.toString().length == 1){
			random = "000" + random.toString();
		}
		else if(random.toString().length == 2){
			random = "00" + random.toString();
		}
		else if(random.toString().length == 3){
			random = "0" + random.toString();
		}

		

		try {
			const data = {
				"username": formData.get('username'),
				"email": formData.get('email'),
				"emailVisibility": true,
				"password": formData.get('password'),
				"passwordConfirm": formData.get('confirm-password'),
				"pin_number": random.toString()
			};

			const record = await pb.collection('users').create(data);
			return {success: true, message: "Registered!"};
		} catch(error) {
			console.log(error);
			return {success: false, message: "A user with those details already exists!"};
		}
		
	}

}
