export class PasswordValidation extends Error{

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
                this.message = `\x1b[31m${"Password does not contain numbers!"} \x1b[0m `
                this.name = "PasswordValidationNoNumbers"
                this.type = "digits"


            break;
            case "characters":
                this.message = (`\x1b[31m${"Password does not contain any of these special characters !@#$%^&*:?.,- !"} \x1b[0m `)
                this.name = "PasswordValidationNoSpecialCharacters"
                this.type = "characters"

            break;
        }
    }
}

export class PasswordsNotMatching extends Error{
    constructor(){
        this.message = "Passwords do not match" 
        this.name = "PasswordsNotMatching"
    }
}

export class BirthdayOutOfRange extends Error{

}