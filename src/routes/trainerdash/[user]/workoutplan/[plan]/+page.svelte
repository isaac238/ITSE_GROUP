<script>
	// Imports
	import 'iconify-icon';
	import Utils from "$lib/utils.js"

	// Component Imports
    import WeightWorkoutLog from "../../../../../components/WeightWorkoutLog.svelte";
    import CardioWorkoutLog from "../../../../../components/CardioWorkoutLog.svelte";
    import DeleteItemModal from "../../../../../components/DeleteItemModal.svelte";
    import NewWorkoutModal from "../../../../../components/NewWorkoutModal.svelte";

	// Props
	export let data;

	const recordData = data.workoutPlans;
	console.log(recordData);

	let [ day, month, year ] = recordData.name.split("/");
	const logDate = new Date(year, month - 1, day);

	let weight_workouts = recordData.weight_workouts.length > 0 ? recordData.expand.weight_workouts : [];
	let cardio_workouts = recordData.cardio_workouts.length > 0 ? recordData.expand.cardio_workouts : [];

	let itemToDelete;
	let workoutModalState;


	// DELETE MODAL FUNCTIONS

	function deleteCallback(responseJSON) {
		if (!responseJSON) return;

		const relationField = itemToDelete.collectionName.split("_")[0];

		if (relationField == "weight") weight_workouts = weight_workouts.filter((item) => item.id != itemToDelete.id);
		if (relationField == "cardio") cardio_workouts = cardio_workouts.filter((item) => item.id != itemToDelete.id);

		itemToDelete = null;
	}

	function showDeleteModal(item) {
		itemToDelete = item;
		document.getElementById("delete-item-modal").showModal();
	}




	// NEW WORKOUT MODAL FUNCTIONS

	function clearWorkoutModalState() {
		workoutModalState = {
			step: 0,
			exercise: "",
			weight_kg: "",
			sets: "",
			reps: "",
			durationInSeconds: "",
			caloriesBurned: "",
			distanceMiles: "",
			type: "",
		};
	}

	function showNewWorkoutModal() {
		clearWorkoutModalState();
		console.log("Opening modal workout");
		document.getElementById("new-workout-modal").showModal();
	}

	async function newWorkoutCallback(createdRecord) {
		let updateResponseJSON;
		let requestData = {};

		if (!createdRecord) return;

		if (workoutModalState.type == "weight") requestData = {[`weight_workouts`]: [...weight_workouts.map((item) => item.id), createdRecord.id]};
		if (workoutModalState.type == "cardio") requestData = {[`cardio_workouts`]: [...cardio_workouts.map((item) => item.id), createdRecord.id]};

		const requestBody = {
			"collection": "workout_plan",
			"recordID": recordData.id,
			"data": requestData,
		};

		const updateResponse = await Utils.sendPostRequest('/api/record/update', requestBody);
		updateResponseJSON = await updateResponse.json();

		console.log("createResponseJSON");
		console.log(createdRecord);

		console.log("updateResponseJSON");
		console.log(updateResponseJSON);

		if (updateResponse.ok && workoutModalState.type == "weight") weight_workouts = [...weight_workouts, createdRecord];
		if (updateResponse.ok && workoutModalState.type == "cardio") cardio_workouts = [...cardio_workouts, createdRecord];
	}

	clearWorkoutModalState();
</script>

<DeleteItemModal callback={deleteCallback} bind:itemToDelete/>
<NewWorkoutModal bind:workoutModalState callback={newWorkoutCallback}/>

<header class="py-3 px-5">
<h1 class="bg-transparent text-xl md:text-3xl font-black">Modern Fit <iconify-icon icon="mdi:weight-lifter"/></h1>
<a href="/userdash"> <h2 class="bg-transparent text-lg md:text-2xl font-medium">&lt; Back</h2> </a>
</header>

<div class="w-screen md:w-3/4 rounded-lg md:mt-14 place-self-center md:bg-slate-900 md:shadow-lg h-[5rem] flex items-center justify-center md:justify-between">
	<h1 class="md:ml-10 max-w-screen text-2xl md:text-3xl text-white font-semibold">
		{recordData.name}
	</h1>
	<button on:click={() => showNewWorkoutModal()} class="bg-white hover:bg-black text-black hover:text-white md:mr-4 md:relative absolute bottom-0 md:w-fit w-11/12 h-16 my-3 md:my-0 md:h-fit btn btn-primary shadow-lg"><iconify-icon class="text-3xl" icon="mdi:weight-lifter"/>Add Workout</button>
</div>

{#if weight_workouts.length <= 0 && cardio_workouts <= 0}
	<div class="w-screen flex-grow flex flex-col items-center justify-center gap-4">
		<h1 class="text-lg md:text-2xl text-white font-semibold">
			No workouts found for {recordData.name}
		</h1>
		<button on:click={() => showNewWorkoutModal()} class="h-full text-md btn btn-primary bg-white text-black hover:text-white hover:bg-black drawer-button z-10 p-4 rounded-lg cursor-pointer"><iconify-icon class="text-3xl" icon="mdi:weight-lifter"/>Add Your First Workout</button>
	</div>
{:else}
	<div class="w-screen md:w-3/4 p-3 md:p-0 rounded-lg flex-grow md:flex-grow-0 place-self-center">
		{#each weight_workouts as workout}
			<WeightWorkoutLog deleteEvent={() => showDeleteModal(workout)} {workout}/>
		{/each}

		{#each cardio_workouts as workout}
			<CardioWorkoutLog deleteEvent={() => showDeleteModal(workout)} {workout}/>
		{/each}
	</div>
{/if}

