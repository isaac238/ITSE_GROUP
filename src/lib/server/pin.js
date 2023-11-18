import crypto from "crypto";
import { PIN_ENCRYPTION_KEY } from "$env/static/private";
import { getPocketbase } from "./database_handler";

export default class Pin {
	static async create({ DOB }) {
		try {
			const pb = getPocketbase();
            const pin = await Pin.generateEncryptedPin(DOB);
            const record = await pb.collection("pins").create(pin);

            return { success: true, message: "Pin created", body: record };
        } catch (error) {
            console.log(error);
            return { success: false, message: "Error occured" };
        }
    }

    static async get() {
        const pb = getPocketbase();
        const user = pb.authStore.model;

        if (!user) return null;

        try {
            const pinRecord = await pb.collection("pins").getOne(user.pin);
            const pin = Pin.decryptPin(
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

    static async isValid(pinPlainText, DOB) {
        const pb = getPocketbase();

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

            const potentialConflicts = await pb.collection("users").getFullList({
                filter: `DOB >= "${minDate}" && DOB < "${maxDate}" && pin != ""`,
            });

            const potentialConflictsDecrypted = potentialConflicts.map((user) =>
                Pin.decryptPin(user.pin.pin, user.pin.iv, user.pin.tag)
            );

            console.log(potentialConflictsDecrypted);
            return !potentialConflictsDecrypted.includes(pinPlainText);
        } catch (e) {
            if (e.code == 404) return true;
            else console.log(e);
        }
    }

    static async generateEncryptedPin(birthday) {
        const pin = this.generatePin(birthday);
        console.log("VALID: " + (await this.isValid(pin, birthday)));

        if (!this.isValid(pin, birthday)) await generateEncryptedPin(birthday);

        return this.encryptPin(pin);
    }

    static generatePin(birthday) {
        var year = birthday.toString().split("-")[0].substring(2, 4);
        var month = birthday.toString().split("-")[1];

        var random = Math.round(Math.random() * 999).toString();
        random += "0".repeat(3 - random.length);

        return year + month + random;
    }

    static encryptPin(pin) {
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

    static decryptPin(encrypted, iv, tag) {
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
