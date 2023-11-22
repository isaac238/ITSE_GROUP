import pocketbase from 'pocketbase';
import { PUBLIC_POCKETBASE_HOST } from '$env/static/public';
import Pin from './pin';
import { BirthdayOutOfRangeError,FirstNameValidationError,PasswordValidationError, PasswordsNotMatchingError,SurnameValidationError } from './error';


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
			this.checkPassword(password)
			await pb.collection('users').authWithPassword(email, password);
			return {success: true, message: "Logged in"};
		} catch (error) {
			console.log(error);
			return {success: false, message: "Error occurred"};
		}
	}

	static emailValid(error) {
		if (!error.data) return true;
		let emailData = error.data.data.email;
		let invalidEmail = (emailData) ? emailData.code == "validation_invalid_email" : false;
		
		return !(emailData && invalidEmail);
	}

	static checkPassword(password){
		if(!/[a-z]/.test(password)){
			throw new PasswordValidationError("lowercase")
		}
		else if(!/[A-Z]/.test(password)){
			throw new PasswordValidationError("uppercase")
		}
		else if(!/[0-9]/.test(password)){
			throw new PasswordValidationError("digits")
		}
		else if(!/[!@#$%^&*:?.,-_]/.test(password)) {
			throw new PasswordValidationError("characters")
		}
	}

	static ageValidation(birthdate){
		let date =new Date()
		date.setFullYear(date.getFullYear() - 16);
		if(new Date(birthdate) <= new Date(date)){
			return true
		}
		else throw new BirthdayOutOfRangeError(date)
	}

	static passwordValid(error) {
		if (!error.data) return true;
		let passwordData = error.data.data.password;
		let invalidPassword = (passwordData) ? passwordData.code == "validation_length_out_of_range" : false;
		
		return !(passwordData && invalidPassword);
	}

	static firstNameValidation(firstName){
		if(/[0-9]/.test(firstName)){
			throw new FirstNameValidationError("digits")
		}
		else if(/[!@£$%^&*()_+{}\[\]]\/,.;'":?"><~`¡€#§¶•9º≠+=æ«÷≥≤…æ«/.test(firstName)){
			throw new FirstNameValidationError("characters")
		}
	}

	static surnameValidation(surname){
		if(/[0-9]/.test(surname)){
			throw new SurnameValidationError("digits")
		}
		else if(/[!@£$%^&*()_+{}\[\]]\/,.;'":?"><~`¡€#§¶•9º≠+=æ«÷≥≤…æ«/.test(surname)){
			throw new SurnameValidationError("characters")
		}
	}

	static async imageFromUrl(url) {
		const response = await fetch(url);
		const blob = await response.blob();
		return new File([blob], "profile.svg", {type: blob.type});
	}

	static async registerMember(formData) {		
		try {
			this.checkPassword(formData.get('password'))
			this.ageValidation(formData.get('birthdate'))
			this.firstNameValidation(formData.get('first-name'))
			this.surnameValidation(formData.get('surname'))
			
			if(formData.get('password') != formData.get('confirm-password')){
				throw new PasswordsNotMatchingError();
			}
			let data = {
				"email": formData.get('email'),
				"emailVisibility": true,
				"first_name": formData.get('first-name'),
				"surname": formData.get('surname'),
				"DOB": formData.get('birthdate'),
				"password": formData.get('password'),
				"passwordConfirm": formData.get('confirm-password'),
				"avatar": await this.imageFromUrl("https://api.iconify.design/mdi/user.svg?download=1"),
			};

			let pinCreated = await Pin.create(data);
			data = {...data, "pin": pinCreated.body.id};

			const userRecord = await pb.collection('users').create(data);
			await pb.collection('members').create({user: userRecord.id});
			return {success: true, message: "Registered!"};
		} catch(error) {
			if (!this.passwordValid(error)) return {success:false,message:error.data.data.password.message};
			else if (!this.emailValid(error)) return {success: false, message:error.data.data.email.message};
			try{
				if(error.type = "lowercase"){
					return {success:false,message:error.message}
				}
				else if(error.type = "uppercase"){
					return {success:false,message:error.message}
				}
				else if(error.type = "digits"){
					return {success:false,message:error.message}
				}
				else if(error.type = "characters"){
					return {success:false,message:error.message}
				}
			}
			catch{
				if(error)
				console.log(error);
				return {success:false,message:"Something else went wrong check the console for details"};
			}
			
		}
		
	}
	
	static async getUser() {
		const user = pb.authStore.model;
		if (!user) return null;
		try {
			return await pb.collection('users').getOne(user.id);
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	static async requestPasswordReset(formData) {
		try {
			const request = await pb.collection('users').requestPasswordReset(formData.get('email'));
			return {success:true,message:"Reset Password Email Sent!"};
		} catch(error) {
			console.log(error.data)
			return {success:false,message:"Something went wrong check the console for details"}
    	}
  	}

	static async isMember() {
		const user = pb.authStore.model;
		if (!user) return false;

		try {
			await pb.collection('members').getFirstListItem(`user.id = "${user.id}"`);
			return true;
		} catch (e) {
			if (e.code == 404) return false;
		}
	}

	static async isTrainer() {
		const user = pb.authStore.model;
		if (!user) return false;

		try {
			await pb.collection('trainers').getFirstListItem(`user.id = "${user.id}"`);
			return true;
		} catch (e) {
			if (e.code == 404) return false;
		}
	}
}
