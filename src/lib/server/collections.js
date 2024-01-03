import Utils from "../utils.js";

export default class Collections {
	constructor(pb) {
		this.pb = pb;
	}

	static expansionsMap = {
		"workout_log": "weight_workouts,cardio_workouts",
		"workout_plan": "weight_workouts,cardio_workouts",
		"meal_log": "foods,foods.foodItem",
		"meal_plan": "foods,foods.foodItem",
		"portion_fooditem": "foodItem",
		"users": "trainees",
	};

	async getAllRecords(collection, query = "") {
		try {
			const records = await this.pb.collection(collection).getFullList({
				expand: Collections.expansionsMap[collection],
				filter: query,
			});

			return records;
		} catch (error) {
			console.log(error);
		}
	}

	async createRecord(collection, data) {
		try {
			const record = await this.pb.collection(collection).create(data, {
				expand: Collections.expansionsMap[collection]
			});

			return record;
		} catch (error) {
			console.log(error);
			return undefined;
		}
	}

	async updateRecord(collection, recordID, data) {
		try {
			const record = await this.pb.collection(collection).update(recordID, data);
			return record;
		} catch (error) {
			console.log(error);
		}
	}

	async deleteRecord(collection, recordID) {
		try {
			const record = await this.pb.collection(collection).delete(recordID);
			return record;
		} catch (error) {
			console.log(error);
		}
	}

	async findRecord(collection, query) {
		try {
			const record = await this.pb.collection(collection).getFirstListItem(query);
			return record;
		} catch (error) {
			if (error.message == "The requested resource wasn't found.") {
				return undefined;
			}
			return null;
		}
	}

	async getAllLogsAndPlans(query = "") {
		const response = {}

		try {
			for (const collection of Object.keys(Collections.expansionsMap)) {

				const data = await this.pb.collection(collection).getFullList({
					expand: Collections.expansionsMap[collection],
					filter: query,
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
			const record = await this.pb.collection(collection).getOne(id, {
				expand: Collections.expansionsMap[collection]
			});

			return record;
		} catch (error) {
			console.log(error);
			return undefined;
		}
	}
}
