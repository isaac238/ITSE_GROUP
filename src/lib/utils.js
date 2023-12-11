export default class Utils {
	static async imageFromUrl(url) {
		const response = await fetch(url);
		const blob = await response.blob();
		return new File([blob], "profile.svg", { type: blob.type });
	}

	static getSubtitle(table, record) {

		if (table === "workout_log") {
			const dateCreated = new Date(record.created);
			return dateCreated.toDateString() + "'s Workout";

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
}
