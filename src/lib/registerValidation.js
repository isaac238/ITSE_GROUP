export default class RegisterValidation {
	static emailValidation(email) {
		const isEmpty =  email == "";
		const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

		const valid = emailRegex.test(email);
		let problems = [];

		if (!valid) problems.push("Email is not valid");
		if (isEmpty) problems = [];

		return { valid, problems }
	}

	static passwordValidation(password) {
		const isEmpty = password == "";
		const tooShort = password.length < 8;
		const containsLowercase = /[a-z]/.test(password);
		const containsUppercase = /[A-Z]/.test(password);
		const containsDigits = /[0-9]/.test(password);
		const containsSpecialCharacters = /[!@#$%^&*]/.test(password);

		const allowedCharacters = /[a-zA-Z0-9!@#$%^&*#]/g;
		let disallowed = password.replaceAll(allowedCharacters, "");
		const containsDisallowedCharacters = disallowed.length != "";

		const valid = !isEmpty && !tooShort && containsLowercase && containsUppercase && containsDigits && containsSpecialCharacters && !containsDisallowedCharacters;
		let problems = [];

		if (tooShort) problems.push("Password must be at least 8 characters long");
		if (!containsLowercase) problems.push("Password must have at least one lowercase letter");
		if (!containsUppercase) problems.push("Password must have at least one uppercase letter");
		if (!containsDigits) problems.push("Password must have at least one digit");
		if (!containsSpecialCharacters) problems.push("Password must have At least one special character");
		if (containsDisallowedCharacters) problems.push(`Password has disallowed characters: ${disallowed}`);
		if (isEmpty) problems = [];

		return { valid, problems }
	}

	static confirmValidation(password, confirmPassword) {
		const isEmpty = confirmPassword == "" || password == "";
		const match = password == confirmPassword;

		const valid = match && !isEmpty;
		let problems = [];

		if (!match) problems.push("Passwords do not match");
		if (isEmpty) problems = [];

		return { valid, problems }
	}


	static ageValidation(dateString) {
		console.log(dateString);
		const isEmpty = dateString == "";
		const birthday = new Date(dateString);
		const maxBirthday = new Date();
		maxBirthday.setFullYear(maxBirthday.getFullYear() - 16);

		const isSixteen = birthday <= maxBirthday;
		const valid = isSixteen && !isEmpty;
		let problems = []

		if (!isSixteen) problems.push("You must be at least 16 years old to use this service");
		if (isEmpty) problems = [];

		return { valid, problems }

	}

	static firstNameValidation(firstName) {
		const isEmpty = firstName == "";
		const hasNumbers = /[0-9]/.test(firstName);
		const hasSpecialCharacters = /[!@£$%^&*()_+{}\[\]\/,.;'":?"><~`¡€#§¶•9º≠+=æ«÷≥≤…æ«]/.test(firstName);

		const valid = !isEmpty && !hasNumbers && !hasSpecialCharacters;
		let problems = [];

		if (hasNumbers) problems.push("First name cannot contain numbers");
		if (hasSpecialCharacters) problems.push("First name cannot contain special characters");
		if (isEmpty) problems = [];

		return { valid, problems }
	}

	static surnameValidation(surname) {
		const isEmpty = surname == "";
		const hasNumbers = /[0-9]/.test(surname);
		const hasSpecialCharacters = /[!@£$%^&*()_+{}\[\]\/,.;'":?"><~`¡€#§¶•9º≠+=æ«÷≥≤…æ«]/.test(surname);

		const valid = !isEmpty && !hasNumbers && !hasSpecialCharacters;
		let problems = [];

		if (hasNumbers) problems.push("Surname cannot contain numbers");
		if (hasSpecialCharacters) problems.push("Surname cannot contain special characters");
		if (isEmpty) problems = [];

		return { valid, problems }
	}

	static dbEmailValid(error) {
		if (!error.data) return true;
		let emailData = error.data.data.email;
		let invalidEmail = (emailData) ? emailData.code == "validation_invalid_email" : false;
		
		return !(emailData && invalidEmail);
	}

	static dbPasswordValid(error) {
		if (!error.data) return true;
		let passwordData = error.data.data.password;
		let invalidPassword = (passwordData) ? passwordData.code == "validation_length_out_of_range" : false;
		
		return !(passwordData && invalidPassword);
	}
}

