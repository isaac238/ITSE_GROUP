export class PasswordValidationError extends Error{

    constructor(error){
        switch(error){
            case "lowercase":
                super(`\x1b[31m ${"Password does not contain lowercase characters!"} \x1b[0m `)
                this.name = "PasswordValidationNoLowerCase"
                this.type = "lowercase"
            break;
            case "uppercase":
                super(`\x1b[31m${"Password does not contain uppercase characters!"} \x1b[0m `)
                this.name = "PasswordValidationNoUpperCase"
                this.type = "uppercase"

            break;
            case "digits":
                super(`\x1b[31m${"Password does not contain numbers!"} \x1b[0m `)
                this.name = "PasswordValidationNoNumbers"
                this.type = "digits"


            break;
            case "characters":
                super(`\x1b[31m${"Password does not contain any of these special characters !@#$%^&*:?.,- !"} \x1b[0m `)
                this.name = "PasswordValidationNoSpecialCharacters"
                this.type = "characters"

            break;
        }
    }
}

export class PasswordsNotMatchingError extends Error{
    constructor(){
        super("Passwords do not match")
        this.name = "PasswordsNotMatching"
    }
}

export class BirthdayOutOfRangeError extends Error{
    constructor(date){
        super(`Birth of date is out of range, birthday needs to be before ${date.toDateString()}`)
        this.name = "BirthdayOutOfRange"
    }
}

export class FirstNameValidationError extends Error{
    constructor(type){
        switch(type){
            case "digit":
                super("First name cannot contain a digit")
                this.name = "FirstNameContainsDigits"
            break;
            case "characters":
                super("First name cannot contain special characters")
                this.name = "FirstNameContainsSpecialCharacters"
            break;
        }
    }
}

export class SurnameValidationError extends Error{
    constructor(type){
        switch(type){
            case "digit":
                super("Surname cannot contain a digit")
                this.name = "SurnameContainsDigits"
            break;
            case "characters":
                super("Surname cannot contain special characters")
                this.name = "SurnameContainsSpecialCharacters"
            break;
        }
    }
}