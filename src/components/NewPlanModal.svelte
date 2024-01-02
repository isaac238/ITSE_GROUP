<script>
	// Imports
	import Utils from "$lib/utils.js"

	// Component Imports
    import LabeledInput from "./LabeledInput.svelte";

	// Props
    /*
    newPlanState = {
        type: "meal_plan || workout_plan",
        name: string
        trainer: locals.user,
        user: Select A user
        plan_date: Date input
    }
    */
	export let newPlanState;

	
	const planStateIsValid = () => {
		const hasEmpty = Object.values(newPlanState).some(
			(value) => value === ""
		);
		return !hasEmpty;
	}

	export let callback;
	
	let maxStep = 1;

	$: console.log(newPlanState);

	async function sendNewPlanRequest() {

        const {type, step, ...requestData} = newPlanState;
		requestData.plan_date = new Date(requestData.plan_date);

        const requestBody = {
            "collection": type,
            "data": requestData,
        }

		const response = await Utils.sendPostRequest("/api/record/create", requestBody);
		await callback(response);
	}

	function incrementStep() {
		if (newPlanState.step < maxStep)
			newPlanState.step++;
	}

	function decrementStep() {
		if (newPlanState.step > 0)
			newPlanState.step--;
	}

	let available_plans = [   
        "meal_plan",
        "workout_plan"
    ];

	function handleSubmit() {
		if (!planStateIsValid()) return;

		sendNewPlanRequest();
		document.getElementById("cancelButton").click();
	}
</script>

<dialog id="new-plan-modal" class="modal">	
	<div class="modal-box bg-gradient-to-b from-gray-800 to-gray-950">
		<h2 class="text-xl text-white">New: <span class="font-semibold">Add New Plan</span></h2>
		<div class="flex flex-col gap-2 p-5">
			<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
				{#if newPlanState.step == 0}
				<label for="WorkoutType" class="text-white">Plan Type</label>
				<select class="select" name="PlanType" bind:value={newPlanState.type} required={true}>
					<option value=""></option>
					<option value="" disabled>Types</option>
					{#each available_plans as type}
						<option value={type}>{type.split("_").map((item) => item[0].toUpperCase() + item.substr(1, item.length))}</option>
					{/each}
				</select>
				{/if}

				{#if newPlanState.step == 1}
					<LabeledInput bind:value={newPlanState.name} name="Name" placeholder="Name" type="text" required={true}/>
					<LabeledInput bind:value={newPlanState.plan_date} name="PlanDate" placeholder="Plan Date" type="date" required={true}/>
				{/if}

				<button type="submit" class="hidden" id="formSubmit"></button>
			</form>
		</div>

		<div class="modal-action">
			{#if newPlanState.step < maxStep && newPlanState.type !== ""}
				<button class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md" on:click={incrementStep}>Next</button>
			{/if}
			{#if newPlanState.step > 0}
				<button class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md" on:click={decrementStep}>Back</button>
			{/if}
			{#if newPlanState.step === maxStep && planStateIsValid()}
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
