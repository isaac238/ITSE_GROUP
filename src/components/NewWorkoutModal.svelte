<script>
    import LabeledInput from "./LabeledInput.svelte";

	export let workoutModalObject
	export let callback;

	
	let maxStep = 1;

	$: console.log(workoutModalObject);

	const incrementStep = () => {
		if (workoutModalObject.step < maxStep)
			workoutModalObject.step++;
	}

	const decrementStep = () => {
		if (workoutModalObject.step > 0)
			workoutModalObject.step--;
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

	$: workoutModalObject.type = weight_exercises.includes(workoutModalObject.exercise) ? "weight" : "cardio";

	const handleSubmit = () => {
		if (workoutModalObject.exericse !== "") {
			callback();
			document.getElementById("cancelButton").click();
		} 
	}
</script>

<div class="modal-box bg-gradient-to-b from-gray-800 to-gray-950">
	<h2 class="text-xl text-white">New: <span class="font-semibold">Add New Workout</span></h2>
	<div class="flex flex-col gap-2 p-5">
	<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
		{#if workoutModalObject.step == 0}
		<label for="WorkoutType" class="text-white">Workout Type</label>
		<select class="select" name="WorkoutType" bind:value={workoutModalObject.exercise} required={true}>
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

		{#if weight_exercises.includes(workoutModalObject.exercise) && workoutModalObject.step == 1}
			<LabeledInput bind:value={workoutModalObject.weight_kg} name="Weight (kg)" type="number" min="0" step="0.1" placeholder="Weight (kg)" required={true}/>
			<LabeledInput bind:value={workoutModalObject.sets} name="Sets" type="number" min="0" step="1" placeholder="Sets" required={true}/>
			<LabeledInput bind:value={workoutModalObject.reps} name="Reps" type="number" min="0" step="1" placeholder="Reps" required={true}/>
		{/if}

		{#if cardio_exercises.includes(workoutModalObject.exercise) && workoutModalObject.step == 1}
			<LabeledInput bind:value={workoutModalObject.duration} name="Duration" type="time" placeholder="Duration" required={true}/>
			<LabeledInput bind:value={workoutModalObject.calories} name="Calories Burned" type="number" min="0" step="1" placeholder="Calories Burned" required={true}/>
			<LabeledInput bind:value={workoutModalObject.distance} name="Distance (miles)" type="number" min="0" step="0.1" placeholder="Distance" required={true}/>
		{/if}

		<button type="submit" class="hidden" id="formSubmit"></button>
	</form>
	</div>
	<div class="modal-action">
	{#if workoutModalObject.step < maxStep && workoutModalObject.exercise != ""}
	<button class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md" on:click={incrementStep}>Next</button>
	{/if}
	{#if workoutModalObject.step > 0}
	<button class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md" on:click={decrementStep}>Back</button>
	{/if}
	{#if workoutModalObject.step === maxStep}
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
