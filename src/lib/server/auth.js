import Pin from './pin';
import Utils from './utils';

export default class Auth {
	constructor(pb) {
		this.pb = pb;
	}

	async login(formData) {
		try {
			const email = formData.get('email');
			const password = formData.get('password');
			await this.pb.collection('users').authWithPassword(email, password);
			return {success: true, message: "Logged in"};
		} catch (error) {
			console.log(error);
			return {success: false, message: "Error occured"};
		}
	}

	emailValid(error) {
		if (!error.data) return true;
		let emailData = error.data.data.email;
		let invalidEmail = (emailData) ? emailData.code == "validation_invalid_email" : false;
		
		return !(emailData && invalidEmail);
	}

	passwordValid(error) {
		if (!error.data) return true;
		let passwordData = error.data.data.password;
		let invalidPassword = (passwordData) ? passwordData.code == "validation_length_out_of_range" : false;
		
		return !(passwordData && invalidPassword);
	}

	async registerMember(formData) {
		try {
			const pin = new Pin(this.pb);
			const pinCreated = await pin.create(formData.get('birthdate'));

			let data = {
				"email": formData.get('email'),
				"emailVisibility": true,
				"first_name": formData.get('first-name'),
				"surname": formData.get('surname'),
				"DOB": formData.get('birthdate'),
				"password": formData.get('password'),
				"passwordConfirm": formData.get('confirm-password'),
				"avatar": await Utils.imageFromUrl("https://api.iconify.design/mdi/user.svg?download=1"),
				"pin": pinCreated.body.id,
				"role": "member",
			};

			await this.pb.collection('users').create(data);

			return {success: true, message: "Registered!"};
		} catch(error) {
			if (!this.passwordValid(error)) return {success:false,message:error.data.data.password.message};
			if (!this.emailValid(error)) return {success: false, message:error.data.data.email.message};
			console.log(error);
			return {success:false,message:"Something else went wrong check the console for details"};
		}
	}

	async requestPasswordReset(formData) {
		try {
			await this.pb.collection('users').requestPasswordReset(formData.get('email'));
			return {success:true,message:"Reset Password Email Sent!"};
		} catch(error) {
			console.log(error.data)
			return {success:false,message:"Something went wrong check the console for details"}
    	}
  	}

	async logout() {
		if (!this.pb.authStore.model) return {success: false, message: "Not logged in!"};
		await this.pb.authStore.clear();
		return {success: true, message: "Logged out!"};
	}

	

}
