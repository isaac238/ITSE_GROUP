import Utils from "../utils.js";

export default class Collections {
	constructor(pb) {
		this.pb = pb;
	}

	static collectionsAndExpansions = {
		"workout_log": "weight_workouts,cardio_workouts",
		"workout_plan": "weight_workouts,cardio_workouts",
		"meal_log": "foods,foods.foodItem",
		"meal_plan": "foods,foods.foodItem",
	};

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
		const collectionsAndExpansions = Collections.collectionsAndExpansions;
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
					data.sort((record1, record2) => Utils.workoutLogComparator(record1, record2));

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
			const collectionsAndExpansions = Collections.collectionsAndExpansions;

			const record = await this.pb.collection(collection).getOne(id, {
				expand: collectionsAndExpansions[collection]
			});
			return record;
		} catch (error) {
			console.log(error);
			return undefined;
		}
	}
}
