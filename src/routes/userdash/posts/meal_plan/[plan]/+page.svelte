<script>
	// Imports
	import { goto } from "$app/navigation";
	import Utils from "$lib/utils.js";

	// Component Imports
    import MealPlanFooditem from "$components/MealPlanFooditem.svelte";

	// Props
	export let data;

	const recordData = data.recordData;
	let foods = recordData.foods.length > 0 ? recordData.expand.foods : [];

	let allFoodsEaten;
	let disabled;
	let logTip;

	$: allFoodsEaten = foods.every((food) => food.complete);
	$: disabled = !allFoodsEaten;
	$: logTip = disabled ? "You must eat this meal before logging this plan." : `Log this meal as ${recordData.name} log.`;
	console.log(JSON.stringify(recordData));

	let allUsedFoodItems;
	let averageFoodStatsPer100;
	let totalFoodStats;

	function calculateAverageOfProperty(array, propertyName) {
		if (array.length > 0) {
			return Math.round((array.reduce((accumulator, next) => accumulator + next[propertyName], 0) / array.length) * 10) / 10;
		} else {
			return 0;
		}
	}

	function calculateTotalOfProperty(array, propertyName) {
		if (array.length > 0) {
			return Math.round(array.reduce((accumulator, next) => accumulator + ((next.expand.foodItem[propertyName] / 100) * next.portion_in_g), 0) * 10) / 10;
		} else {
			return 0;
		}
	}

	$: allUsedFoodItems = foods.map((food) => food.expand.foodItem);

	$: averageFoodStatsPer100 = {
		"calories_in_g": calculateAverageOfProperty(allUsedFoodItems, "calories_in_g"),
		"protein_in_g": calculateAverageOfProperty(allUsedFoodItems, "protein_in_g"),
		"carbs_in_g": calculateAverageOfProperty(allUsedFoodItems, "carbs_in_g"),
		"fats_in_g": calculateAverageOfProperty(allUsedFoodItems, "fats_in_g"),
		"sugar_in_g": calculateAverageOfProperty(allUsedFoodItems, "sugar_in_g"),
	};

	$: totalFoodStats = {
		"calories_in_g": calculateTotalOfProperty(foods, "calories_in_g"),
		"protein_in_g": calculateTotalOfProperty(foods, "protein_in_g"),
		"carbs_in_g": calculateTotalOfProperty(foods, "carbs_in_g"),
		"fats_in_g": calculateTotalOfProperty(foods, "fats_in_g"),
		"sugar_in_g": calculateTotalOfProperty(foods, "sugar_in_g"),
	};


	$: console.log(allUsedFoodItems);
	$: console.log(averageFoodStatsPer100);


	async function getLog() {
		console.log("Checking for existing log");

		const requestBody = {
			"collection": "meal_log",
			"query": `name='${recordData.name}'`,
		}

		const response = await Utils.sendPostRequest("/api/record/search", requestBody);

		if (response.status != 200) return false;
		return await response.json();
	}

	async function createLog() {
		console.log("Creating new log");

		const requestBody = {
			"collection": "meal_log",
			"data": {
				"user": recordData.user,
				"name": recordData.name,
				"foods": recordData.foods,
				"eaten_at": new Date(),
			},
		};

		const response = await Utils.sendPostRequest("/api/record/create", requestBody);

		const responseJSON = await response.json();
		return responseJSON != undefined ? responseJSON : false;
	}

	async function updateLog(log) {
		console.log("Updating existing log");

		const foodSet = new Set([...recordData.foods, ...log.foods]);

		const requestBody = {
			"collection": "meal_log",
			"recordID": log.id,
			"data": {
				"foods": [...foodSet],
			},
		};

		const response = await Utils.sendPostRequest("/api/record/update", requestBody);

		const responseJSON = await response.json();
		console.log(responseJSON);
		return responseJSON != undefined ? responseJSON : false;
	}

	async function logPlan() {
		const logAlreadyExists = await getLog();
		console.log("Already Exists:");
		console.log(logAlreadyExists);

		if (!logAlreadyExists) {
			console.log("Creating:");
			let created = await createLog();
			console.log(created);
			goto("/userdash/posts/meal_log/" + created.id);
			return;
		} 

		console.log("Updating:");
		console.log(logAlreadyExists);
		let updated = await updateLog(logAlreadyExists);
		console.log(updated);

		if (updated) { goto("/userdash/posts/meal_log/" + updated.id); }
	}
</script>

<header class="py-3 px-5">
<h1 class="bg-transparent text-xl md:text-3xl font-black">Modern Fit <iconify-icon icon="mdi:weight-lifter"/></h1>
<a href="/userdash"> <h2 class="bg-transparent text-lg md:text-2xl font-medium">&lt; Back</h2> </a>
</header>

<div class="w-screen md:w-3/4 rounded-lg md:mt-14 place-self-center md:bg-slate-900 md:shadow-lg h-[5rem] flex items-center justify-center md:justify-between">
	<div class="md:ml-10 flex flex-col items-center md:items-start">
		<h1 class="max-w-screen text-2xl md:text-3xl text-white font-semibold">
			{recordData.name}
		</h1>
		<small class="text-[1rem] font-medium">
			{new Date(recordData.plan_date).toLocaleDateString()} at {new Date(recordData.plan_date).toLocaleTimeString().slice(0, -3)}
		</small>
	</div>

	<span class="tooltip md:mr-4 md:relative absolute bottom-0 w-screen md:w-fit" data-tip={logTip}>
		<button on:click={() => logPlan()} class="w-11/12 h-16 my-3 md:my-0 md:h-fit md:w-fit btn btn-primary shadow-lg" disabled={disabled}>Log This Meal</button>	
	</span>
</div>

<div class="w-screen md:w-3/4 p-3 md:p-0 rounded-lg place-self-center">
	{#each foods as food}
		<MealPlanFooditem {food} bind:complete={food.complete}/>
	{/each}
	<h1 class="mt-4 text-xl font-semibold text-center">Totals</h1>
	<div class="mt-3 text-black rounded-lg bg-gray-100 shadow-lg ">
		<table class="table">
			<thead>
				<tr class="text-black">
					<th></th>
					<th>Per 100g</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Calories</th>
					<td>{averageFoodStatsPer100.calories_in_g}Kcal</td>
					<td>{totalFoodStats.calories_in_g}Kcal</td>
				</tr>
				<tr>
					<th>Protein</th>
					<td>{averageFoodStatsPer100.protein_in_g}g</td>
					<td>{totalFoodStats.protein_in_g}g</td>
				</tr>
				<tr>
					<th>Carbs</th>
					<td>{averageFoodStatsPer100.carbs_in_g}g</td>
					<td>{totalFoodStats.carbs_in_g}g</td>
				</tr>
				<tr>
					<th>Fat</th>
					<td>{averageFoodStatsPer100.fats_in_g}g</td>
					<td>{totalFoodStats.fats_in_g}g</td>
				</tr>
				<tr>
					<th>Sugar</th>
					<td>{averageFoodStatsPer100.sugar_in_g}g</td>
					<td>{totalFoodStats.sugar_in_g}g</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
