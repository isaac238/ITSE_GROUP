<script>
	import { goto } from "$app/navigation";
    import MealPlanFooditem from "../../../../../components/MealPlanFooditem.svelte";

	export let data;

	const recordData = data.recordData;
	let foods = recordData.foods.length > 0 ? recordData.expand.foods : [];

	let allFoodsEaten;

	let disabled;
	let logTip;

	$:  allFoodsEaten = foods.every((food) => food.complete);
	$: disabled = !allFoodsEaten;
	$: logTip = disabled ? "You must eat this meal before logging this plan." : `Log this meal as ${recordData.name} log.`;

	const getLog = async () => {
		console.log("Checking for existing log");
		const response = await fetch("/api/record/search", {
			method: "POST",
			body: JSON.stringify({
				"collection": "meal_log",
				"query": `name='${new Date(recordData.plan_date).toLocaleDateString()}'`,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		const responseJSON = await response.json();
		return responseJSON != null ? responseJSON : false;
	}

	const createLog = async () => {
		console.log("Creating new log");
		const response = await fetch("/api/record/create", {
			method: "POST",
			body: JSON.stringify({
				"collection": "meal_log",
				"data": {
					"user": recordData.user,
					"name": recordData.name,
					"foods": recordData.foods,
				},
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		const responseJSON = await response.json();
		return responseJSON != undefined ? responseJSON : false;
	}

	const updateLog = async (log) => {
		console.log("Updating existing log");
		const response = await fetch("/api/record/update", {
			method: "POST",
			body: JSON.stringify({
				"collection": "meal_log",
				"recordID": log.id,
				"data": {
					"foods": [...new Set([...recordrecordData.foods, ...log.foods])],
				},
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		const responseJSON = await response.json();
		console.log(responseJSON);
		return responseJSON != undefined ? responseJSON : false;
	}

	const logPlan = async () => {
		const logAlreadyExists = await getLog();
		console.log(logAlreadyExists);

		if (!logAlreadyExists) {
			let created = await createLog();
			console.log(created);
			goto("/userdash/posts/meal_log/" + created.id);
			return;
		} 

		let updated = await updateLog(logAlreadyExists);
		console.log(updated);

		if (updated) {
			goto("/userdash/posts/meal_log/" + updated.id);
		}
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
		<button on:click={() => logPlan()} class="w-11/12 h-16 my-3 md:my-0 md:h-fit md:w-fit btn btn-primary shadow-lg" disabled={disabled}>Log This Plan</button>	
	</span>
</div>

<div class="w-screen md:w-3/4 p-3 md:p-0 rounded-lg place-self-center">
	{#each foods as fooditem}
		<MealPlanFooditem {fooditem} bind:complete={fooditem.complete}/>
	{/each}
</div>
