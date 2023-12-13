<script>
    import WeightWorkoutPlan from "../../../../../components/WeightWorkoutPlan.svelte";
    import CardioWorkoutPlan from "../../../../../components/CardioWorkoutPlan.svelte";
	import { goto } from "$app/navigation";

	export let data;

	const recordData = data.recordData;
	const weight_workouts = recordData.expand.weight_workouts;
	const cardio_workouts = recordData.expand.cardio_workouts;

	let allWeightWorkoutsCompleted;
	let allCardioWorkoutsCompleted;

	let disabled;
	let logTip;

	$:  allWeightWorkoutsCompleted = weight_workouts.every((workout) => workout.complete);
	$:  allCardioWorkoutsCompleted = cardio_workouts.every((workout) => workout.complete);
	$: disabled = !(allWeightWorkoutsCompleted && allCardioWorkoutsCompleted);
	$: logTip = disabled ? "You must complete all workouts before logging this plan." : `Add all workouts to ${new Date(recordData.plan_date).toLocaleDateString()}'s' log.`;

	const getLog = async () => {
		console.log("Checking for existing log");
		const response = await fetch("/api/record/search", {
			method: "POST",
			body: JSON.stringify({
				"collection": "workout_log",
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
				"collection": "workout_log",
				"data": {
					"user": recordData.user,
					"name": new Date(recordData.plan_date).toLocaleDateString(),
					"weight_workouts": recordData.weight_workouts,
					"cardio_workouts": recordData.cardio_workouts,
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
				"collection": "workout_log",
				"recordID": log.id,
				"data": {
					"weight_workouts": [...new Set([...recordrecordData.weight_workouts, ...log.weight_workouts])],
					"cardio_workouts": [...new Set([...recordrecordData.cardio_workouts, ...log.cardio_workouts])],
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
			goto("/userdash/posts/workout_log/" + created.id);
			return;
		} 

		let updated = await updateLog(logAlreadyExists);
		console.log(updated);

		if (updated) {
			goto("/userdash/posts/workout_log/" + updated.id);
		}
	}
</script>

<header class="py-3 px-5">
<h1 class="bg-transparent text-xl md:text-3xl font-black">Modern Fit <iconify-icon icon="mdi:weight-lifter"/></h1>
<a href="/userdash"> <h2 class="bg-transparent text-lg md:text-2xl font-medium">&lt; Back</h2> </a>
</header>

<div class="w-screen md:w-3/4 rounded-lg md:mt-14 place-self-center md:bg-slate-900 md:shadow-lg h-[5rem] flex items-center justify-center md:justify-between">
	<h1 class="md:ml-10 max-w-screen text-2xl md:text-3xl text-white font-semibold">
		{new Date(recordData.plan_date).toDateString() + "'s Plan"}
	</h1>

	<span class="tooltip md:mr-4 md:relative absolute bottom-0 w-screen md:w-fit" data-tip={logTip}>
		<button on:click={() => logPlan()} class="w-11/12 h-16 my-3 md:my-0 md:h-fit md:w-fit btn btn-primary shadow-lg" disabled={disabled}>Log This Plan</button>	
	</span>
</div>

<div class="w-screen md:w-3/4 p-3 md:p-0 rounded-lg place-self-center">
	{#each weight_workouts as workout}
		<WeightWorkoutPlan {workout} bind:complete={workout.complete}/>
	{/each}

	{#each cardio_workouts as workout}
		<CardioWorkoutPlan {workout} bind:complete={workout.complete} />
	{/each}
</div>
