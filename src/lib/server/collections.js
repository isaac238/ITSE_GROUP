import Utils from "../utils.js";

export default class Collections {
	constructor(pb) {
		this.pb = pb;
	}

	async createRecord(collection, data) {
		try {
			const record = await this.pb.collection(collection).create(data);
			return record;
		} catch (error) {
			console.log(error)
			return undefined;
		}
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
					record.subtitle = Utils.getSubtitle(collection, record);
					if (collection == "workout_log") {
						let [day, month, year] = record.name.split("/");
						record.name = new Date(year, month - 1, day).toLocaleDateString();
					}
				});

				if (collection === "meal_log")
					data.sort((record1, record2) => new Date(record2.eaten_at) + new Date(record1.eaten_at));
				if (collection === "workout_log")
					data.sort((record1, record2) => {
						let [day1, month1, year1] = record1.name.split("/");
						let [day2, month2, year2] = record2.name.split("/");

						return new Date(year2, month2 - 1, day2) - new Date(year1, month1 - 1, day1);
					});
				else
					data.sort((record1, record2) => new Date(record2.created) - new Date(record1.created));
				response[collection] = data;
			}
		} catch (error) {
			console.log(error);
		}

		return response;
	}

	async getRecord(collection, id) {
		try {
			const expand = {
				"workout_log": "weight_workouts,cardio_workouts",
				"workout_plan": "weight_workouts,cardio_workouts",
				"meal_log": "foods",
				"meal_plan": "foods",
			}
			const record = await this.pb.collection(collection).getOne(id, {
				expand: expand[collection]
			});
			return record;
		} catch (error) {
			console.log(error);
			return undefined;
		}
	}
}
