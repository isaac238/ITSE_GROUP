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

	static generatePin(birthday) {
		var year = birthday.toString().split('-')[0].substring(2,4);
		var month = birthday.toString().split('-')[1];
		
		var random = Math.round(Math.random()*999).toString();
		random += "0".repeat(3-random.length);
		
		return year + month + random;
	}

	static pinValid(error) {
		let pinData = error.data.data.pin;
		let nonUnique = pinData.code == "validation_not_unique";
		
		return !(pinData && nonUnique);
	}

	static emailValid(error) {
		let emailData = error.data.data.email;
		let invalidEmail = emailData.code == "validation_invalid_email";
		
		return !(emailData && invalidEmail);
	}

	static passwordValid(error) {
		let passwordData = error.data.data.password;
		let invalidPassword = passwordData.code == "validation_length_out_of_range";
		
		return !(passwordData && invalidPassword);
	}

	static async register(formData) {
		var birthday = formData.get('birthdate');
		var pin = generatePin(birthday);
		
		try {
			const data = {
				"username": formData.get('username'),
				"email": formData.get('email'),
				"emailVisibility": true,
				"password": formData.get('password'),
				"passwordConfirm": formData.get('confirm-password'),
				"pin": pin
			};

			const record = await pb.collection('users').create(data);
			return {success: true, message: "Registered!"};
		} catch(error) {

			if (!pinValid(error)) return this.register(formData);
			if (!passwordValid(error)) return {success:false,message:error.data.data.password.message};
			if (!emailValid(error)) return {success: false, message:error.data.data.email.message};
			console.log(error.data);
			return {success:false,message:"Something else went wrong check console for details"};
		}
		
	}

}
