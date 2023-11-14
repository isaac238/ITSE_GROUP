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
	static async login({email, password}) {
		try {
			await pb.collection('users').authWithPassword(email, password);
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
		let nonUnique = (pinData) ? pinData.code == "validation_not_unique" : false;
		
		return !(pinData && nonUnique);
	}

	static emailValid(error) {
		let emailData = error.data.data.email;
		let invalidEmail = (emailData) ? emailData.code == "validation_invalid_email" : false;
		
		return !(emailData && invalidEmail);
	}

	static passwordValid(error) {
		let passwordData = error.data.data.password;
		let invalidPassword = (passwordData) ? passwordData.code == "validation_length_out_of_range" : false;
		
		return !(passwordData && invalidPassword);
	}

	static async imageFromUrl(url) {
		const response = await fetch(url);
		const blob = await response.blob();
		return new File([blob], "profile.svg", {type: blob.type});
	}

	static async register(formData) {		
		try {
			const data = {
				"email": formData.get('email'),
				"emailVisibility": true,
				"first_name": formData.get('first-name'),
				"surname": formData.get('surname'),
				"DOB": formData.get('birthdate'),
				"password": formData.get('password'),
				"passwordConfirm": formData.get('confirm-password'),
				"pin": this.generatePin(formData.get('birthdate')),
				"avatar": await this.imageFromUrl("https://api.iconify.design/mdi/user.svg?download=1"),
			};

			const record = await pb.collection('users').create(data);
			return {success: true, message: "Registered!"};
		} catch(error) {

			if (!this.pinValid(error)) return this.register(formData);
			if (!this.passwordValid(error)) return {success:false,message:error.data.data.password.message};
			if (!this.emailValid(error)) return {success: false, message:error.data.data.email.message};
			console.log(error.data);
			return {success:false,message:"Something else went wrong check console for details"};
		}
		
	}

}
