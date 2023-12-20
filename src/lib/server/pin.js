import crypto from "crypto";
import { PIN_ENCRYPTION_KEY } from "$env/static/private";

export default class Pin {
	constructor(pb) {
		this.pb = pb;
	}

	// Public methods
	async create(DOB) {
		try {
            const plainTextPin = this.#generatePin(DOB);
			const pinValid = this.isValid(plainTextPin, DOB);

			while (!pinValid) {
				plainTextPin = this.#generatePin(DOB);
				pinValid = this.isValid(plainTextPin, DOB);
			}

			const pin = this.#encryptPin(plainTextPin);

            const record = await this.pb.collection("pins").create(pin);

            return { success: true, message: "Pin created", body: record, plainText: plainTextPin };
        } catch (error) {
            console.log(error);
            return { success: false, message: "Error occured" };
        }
    }

    async get(pinId) {
        try {
            const pinRecord = await this.pb.collection("pins").getOne(pinId);
            const pin = this.#decryptPin(
                pinRecord.pin,
                pinRecord.iv,
                pinRecord.tag
            );

            return pin;
        } catch (e) {
            console.log(e);
            return null;
        }
    }


	// Private methods
    async isValid(plainTextPin, DOB) {
        try {
            const dob = new Date(DOB);
            const month = dob.getMonth();
            const year = dob.getFullYear();

            const maxDate = new Date(Date.UTC(year, month + 1, 1))
                .toISOString()
                .replace("T", " ");
            const minDate = new Date(Date.UTC(year, month, 1))
                .toISOString()
                .replace("T", " ");

            const potentialConflicts = await this.pb.collection("users").getFullList({
                filter: `DOB >= "${minDate}" && DOB < "${maxDate}" && pin != ""`,

				expand: `pin`,
            });

			const alreadyExists = potentialConflicts.some((user) => this.#decryptPin(user.expand.pin.pin, user.expand.pin.iv, user.expand.pin.tag) == plainTextPin);
			return !alreadyExists;

        } catch (e) {
            if (e.code == 404) return true;
            else console.log(e);
        }
    }

    #generatePin(birthday) {
        var year = birthday.toString().split("-")[0].substring(2, 4);
        var month = birthday.toString().split("-")[1];

        var random = Math.round(Math.random() * 999).toString();
        random += "0".repeat(3 - random.length);

        return year + month + random;
    }

    #encryptPin(pin) {
        const iv = crypto.randomBytes(12).toString("base64");
        const cipher = crypto.createCipheriv(
            "aes-256-gcm",
            Buffer.from(PIN_ENCRYPTION_KEY, "base64"),
            Buffer.from(iv, "base64")
        );

        let encrypted = cipher.update(pin, "utf8", "base64");
        encrypted += cipher.final("base64");

        const tag = cipher.getAuthTag();

        return {
            iv: iv,
            pin: encrypted,
            tag: tag.toString("base64"),
        };
    }

    #decryptPin(encrypted, iv, tag) {
        tag = Buffer.from(tag, "base64");
        const decipher = crypto.createDecipheriv(
            "aes-256-gcm",
            Buffer.from(PIN_ENCRYPTION_KEY, "base64"),
            Buffer.from(iv, "base64")
        );

        decipher.setAuthTag(Buffer.from(tag, "base64"));

        let decrypted = decipher.update(encrypted, "base64", "utf8");
        decrypted += decipher.final("utf8");

        return decrypted;
    }
}
