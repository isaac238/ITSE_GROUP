export default class Collections {
	constructor(pb) {
		this.pb = pb;
	}

	async getAllLogsAndPlans() {
		const collectionsAndExpansions = {
			"workout_log": "weight_workouts,cardio_workouts",
			"workout_plan": "weight_workouts,cardio_workouts",
			"meal_log": "foods",
			"meal_plan": "foods",
		}
		const response = {}

		try {
			for (const collection of Object.keys(collectionsAndExpansions)) {
				const data = await this.pb.collection(collection).getFullList({
					expand: collectionsAndExpansions[collection],
				});
				data.forEach(record => {
					record.subtitle = getSubtitle(collection, record);
				});
				response[collection] = data;
			}
		} catch (error) {
			console.log(error);
		}

		return response;
	}

	async getRecord(collection, id) {
		try {
			const record = await this.pb.collection(collection).getOne(id);
			return record;
		} catch (error) {
			console.log(error);
			return undefined;
		}
	}
}

const getSubtitle = (table, record) => {
	if (table == "workout_log" || table == "meal_log") {
		const dateCreated = new Date(record.created);
		return "Created on: " + dateCreated.toLocaleDateString() + " at " + dateCreated.toLocaleTimeString().substring(0, 5);
	}

	if (table == "workout_plan" || table == "meal_plan") {
		const dateFor = new Date(record.plan_date);
		return "Plan for: " + dateFor.toLocaleDateString();
	}
}
