export default class Utils {
	static async imageFromUrl(url) {
		const response = await fetch(url);
		const blob = await response.blob();
		return new File([blob], "profile.svg", { type: blob.type });
	}

	static workoutLogComparator(record1, record2) {
		let [day1, month1, year1] = record1.name.split("/");
		let [day2, month2, year2] = record2.name.split("/");

		return new Date(year2, month2 - 1, day2) - new Date(year1, month1 - 1, day1);
	}

	static getSubtitle(table, record) {

		if (table === "workout_log") {
			let [day, month, year] = record.name.split("/");
			const dateOfWorkout = new Date(year, month - 1, day);
			return dateOfWorkout.toDateString() + "'s Workout";

		}

		if (table == "meal_log") {
			const dateEaten = new Date(record.eaten_at);
			return "Eaten on " + dateEaten.toLocaleDateString() + " at " + dateEaten.toLocaleTimeString().substring(0, dateEaten.toLocaleTimeString().lastIndexOf(":"));
		}

		if (table == "workout_plan" || table == "meal_plan") {
			const dateFor = new Date(record.plan_date);
			return "Plan for: " + dateFor.toLocaleDateString();
		}
	}

	static async sendPostRequest(url, body) {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		return response;
	}
}
