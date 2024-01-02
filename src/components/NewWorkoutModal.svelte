<script>
	// Imports
	import Utils from "$lib/utils.js"
    import { onMount } from "svelte";

	// Component Imports
    import LabeledInput from "./LabeledInput.svelte";

	// Props
	export let workoutModalState
	export let callback;

	
	let maxStep = 1;

	$: console.log(workoutModalState);


	async function sendNewWorkoutRequest() {
		let requestData = {};
		let createResponseJSON;

		if (workoutModalState.type == "weight") {
			const {
			step,
			durationInSeconds,
			caloriesBurned,
			distanceMiles,
			type,
			...remainingData
			} = workoutModalState;
			requestData = remainingData;
		}

		if (workoutModalState.type == "cardio") {
			const {
			step,
			weight_kg,
			sets,
			reps,
			type,
			...remainingData
			} = workoutModalState;

			remainingData.durationInSeconds = remainingData.durationInSeconds.split(":")
			.reduce(
			(accumulator, time) => parseInt(60 * accumulator) + parseInt(time)
			);

			requestData = remainingData;
		}

		const requestBody = {
			"collection": `${workoutModalState.type}_workout`,
			"data": {...requestData, "complete": true},
		}

		const createResponse = await Utils.sendPostRequest("/api/record/create", requestBody);
		createResponseJSON = await createResponse.json();
		await callback(createResponseJSON);
	}

	function incrementStep() {
		if (workoutModalState.step < maxStep)
			workoutModalState.step++;
	}

	function decrementStep() {
		if (workoutModalState.step > 0)
			workoutModalState.step--;
	}

	let weight_exercises = [
	"Bicep Curl",
	"Leg Press",
	"Lateral Pulldown",
	"Pec Fly"
	];

	let cardio_exercises = [
	"Running",
	"Walking",
	"Cycling",
	"Swimming"
	];

	// onMount(async () => {
	// workoutModalState = structuredClone({
	// 	step: 1,
	// 	exercise: cardio_exercises[Math.floor(Math.random() * 4)],
	// 	weight_kg: "",
	// 	sets: "",
	// 	reps: "",
	// 	durationInSeconds: "00:10:00",
	// 	caloriesBurned: Math.floor(Math.random() * 250) + 1,
	// 	distanceMiles: Math.floor(Math.random() * 10) + 1,
	// 	type: "cardio",
	// });
	// await sendNewWorkoutRequest();
	// workoutModalState = structuredClone({
	// 	step: 1,
	// 	exercise: weight_exercises[1],
	// 	weight_kg: Math.floor(Math.random() * 82) + 1,
	// 	sets: 3,
	// 	reps: 10,
	// 	durationInSeconds: "",
	// 	caloriesBurned: "",
	// 	distanceMiles: "",
	// 	type: "weight",
	// });
	// await sendNewWorkoutRequest();
	// workoutModalState = structuredClone({
	// 	step: 1,
	// 	exercise: weight_exercises[2],
	// 	weight_kg: Math.floor(Math.random() * 82) + 1,
	// 	sets: 3,
	// 	reps: 10,
	// 	durationInSeconds: "",
	// 	caloriesBurned: "",
	// 	distanceMiles: "",
	// 	type: "weight",
	// });
	// await sendNewWorkoutRequest();
	// workoutModalState = structuredClone({
	// 	step: 1,
	// 	exercise: weight_exercises[3],
	// 	weight_kg: Math.floor(Math.random() * 82) + 1,
	// 	sets: 3,
	// 	reps: 10,
	// 	durationInSeconds: "",
	// 	caloriesBurned: "",
	// 	distanceMiles: "",
	// 	type: "weight",
	// });
	// await sendNewWorkoutRequest();
	// })

	$: workoutModalState.type = weight_exercises.includes(workoutModalState.exercise) ? "weight" : "cardio";

	function handleSubmit() {
		if (workoutModalState.exercise == "") return;

		sendNewWorkoutRequest();
		document.getElementById("cancelButton").click();
	}
</script>

<dialog id="new-workout-modal" class="modal">	
	<div class="modal-box bg-gradient-to-b from-gray-800 to-gray-950">
		<h2 class="text-xl text-white">New: <span class="font-semibold">Add New Workout</span></h2>
		<div class="flex flex-col gap-2 p-5">
			<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
				{#if workoutModalState.step == 0}
				<label for="WorkoutType" class="text-white">Workout Type</label>
				<select class="select" name="WorkoutType" bind:value={workoutModalState.exercise} required={true}>
					<option value=""></option>
					<option value="Weights" disabled>Weights</option>
					{#each weight_exercises as exercise}
						<option value={exercise}>{exercise}</option>
					{/each}
					<option value="Cardio" disabled>Cardio</option>
					{#each cardio_exercises as exercise}
						<option value={exercise}>{exercise}</option>
					{/each}
				</select>
				{/if}

				{#if weight_exercises.includes(workoutModalState.exercise) && workoutModalState.step == 1}
					<LabeledInput bind:value={workoutModalState.weight_kg} name="Weight (kg)" type="number" min="0" step="0.1" placeholder="Weight (kg)" required={true}/>
					<LabeledInput bind:value={workoutModalState.sets} name="Sets" type="number" min="0" step="1" placeholder="Sets" required={true}/>
					<LabeledInput bind:value={workoutModalState.reps} name="Reps" type="number" min="0" step="1" placeholder="Reps" required={true}/>
				{/if}

				{#if cardio_exercises.includes(workoutModalState.exercise) && workoutModalState.step == 1}
					<LabeledInput bind:value={workoutModalState.durationInSeconds} name="Duration" step="1" type="time" placeholder="Duration" required={true}/>
					<LabeledInput bind:value={workoutModalState.caloriesBurned} name="Calories Burned" type="number" min="0" step="1" placeholder="Calories Burned" required={true}/>
					<LabeledInput bind:value={workoutModalState.distanceMiles} name="Distance (miles)" type="number" min="0" step="0.1" placeholder="Distance" required={true}/>
				{/if}

				<button type="submit" class="hidden" id="formSubmit"></button>
			</form>
		</div>

		<div class="modal-action">
			{#if workoutModalState.step < maxStep && workoutModalState.exercise != ""}
				<button class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md" on:click={incrementStep}>Next</button>
			{/if}
			{#if workoutModalState.step > 0}
				<button class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md" on:click={decrementStep}>Back</button>
			{/if}
			{#if workoutModalState.step === maxStep}
				<button id="doneButton" class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md" type="submit" on:click={() => document.getElementById("formSubmit").click()}>Done</button>
			{/if}
			<form method="dialog" class="flex gap-4">
				<button id="cancelButton" class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md" aria-label="cancel">Cancel</button>
			</form>
		</div>
	</div>

	<form class="modal-backdrop" method="dialog">
		<button>close</button>
	</form>
</dialog>
