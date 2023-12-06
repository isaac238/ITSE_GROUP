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
				response[collection] = data;
			}
		} catch (error) {
			console.log(error);
		}

		return response;
	}
}
