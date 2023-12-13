<script>
    import WeightWorkoutLog from "../../../../../components/WeightWorkoutLog.svelte";
    import CardioWorkoutLog from "../../../../../components/CardioWorkoutLog.svelte";
    import DeleteItemModal from "../../../../../components/DeleteItemModal.svelte";
    import NewWorkoutModal from "../../../../../components/NewWorkoutModal.svelte";
	import 'iconify-icon';

	export let data;

	const recordData = data.recordData;
	let [ day, month, year ] = recordData.name.split("/");
	const logDate = new Date(year, month - 1, day);

	let weight_workouts = recordData.weight_workouts.length > 0 ? recordData.expand.weight_workouts : [];
	let cardio_workouts = recordData.cardio_workouts.length > 0 ? recordData.expand.cardio_workouts : [];

	let itemToDelete;
	const sendDeleteRequest = async () => {
		const deleteResponse = await fetch(`/api/record/delete`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"collection": itemToDelete.collectionName,
				"id": itemToDelete.id,
			}),
		});

		const deleteResponseJSON = await deleteResponse.json();
		console.log("Delete Response");
		console.log(deleteResponseJSON);
		const relationField = `${itemToDelete.collectionName.split("_")[0]}_workouts`;

		if (deleteResponseJSON == true && itemToDelete.collectionName.split("_")[0] == "weight") {
			weight_workouts = weight_workouts.filter((item) => item.id != itemToDelete.id);
		}

		if (deleteResponseJSON == true && itemToDelete.collectionName.split("_")[0] == "cardio") {
			weight_workouts = cardio_workouts.filter((item) => item.id != itemToDelete.id);
		}
		itemToDelete = null;
	}

	const showDeleteModal = (item) => {
		itemToDelete = item;
		document.getElementById("delete-item-modal").showModal();
	}

	let workoutModalObject = {
		step: 0,
		exercise: "",
		weight_kg: "",
		sets: "",
		reps: "",
		duration: "",
		calories: "",
		distance: "",
		type: "",
	}

	const showNewWorkoutModal = () => {

		workoutModalObject.step = 0;
		workoutModalObject.exercise = "";
		workoutModalObject.weight_kg = "";
		workoutModalObject.sets = "";
		workoutModalObject.reps = "";
		workoutModalObject.duration = "";
		workoutModalObject.calories = "";
		workoutModalObject.distance = "";
		workoutModalObject.type = "";

		console.log("Opening modal workout");
		console.log(workoutModalObject);
		document.getElementById("new-workout-modal").showModal();
	}

	const sendNewWorkoutRequest = async () => {
		let requestData = {};
		let updateResponseJSON;
		let createResponseJSON;

		if (workoutModalObject.type == "weight") {
			const {step, duration, calories, distance, type, ...remainingData} = workoutModalObject;
			requestData = remainingData;
		}

		if (workoutModalObject.type == "cardio") {
			const {step, weight_kg, sets, reps, type, ...remainingData} = workoutModalObject;
			requestData = remainingData;
		}

		const createResponse = await fetch(`/api/record/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"collection": `${workoutModalObject.type}_workout`,
				"data": {...requestData, "complete": true},
			}),
		});

		createResponseJSON = await createResponse.json();

		if (createResponseJSON != undefined) {
			if (workoutModalObject.type == "weight") {
				requestData = {[`weight_workouts`]: [...weight_workouts.map((item) => item.id), createResponseJSON.id]};
			}

			if (workoutModalObject.type == "cardio") {
				requestData = {[`cardio_workouts`]: [...cardio_workouts.map((item) => item.id), createResponseJSON.id]};
			}

			const updateResponse = await fetch('/api/record/update', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					"collection": "workout_log",
					"recordID": recordData.id,
					"data": requestData,
				}),
			});

			updateResponseJSON = await updateResponse.json();
		}

		console.log("createResponseJSON");
		console.log(createResponseJSON);

		console.log("updateResponseJSON");
		console.log(updateResponseJSON);

		console.log(workoutModalObject.type);
		if (updateResponseJSON != undefined && workoutModalObject.type == "weight") {
			weight_workouts = [...weight_workouts, createResponseJSON];
		}

		if (updateResponseJSON != undefined && workoutModalObject.type == "cardio") {
			cardio_workouts = [...cardio_workouts, createResponseJSON];
		}
	}
</script>

<dialog id="delete-item-modal" class="modal">
	<DeleteItemModal callback={sendDeleteRequest}/>
</dialog>

<dialog id="new-workout-modal" class="modal">	
	<NewWorkoutModal bind:workoutModalObject callback={() => sendNewWorkoutRequest()}/>
</dialog>

<header class="py-3 px-5">
<h1 class="bg-transparent text-xl md:text-3xl font-black">Modern Fit <iconify-icon icon="mdi:weight-lifter"/></h1>
<a href="/userdash"> <h2 class="bg-transparent text-lg md:text-2xl font-medium">&lt; Back</h2> </a>
</header>

<div class="w-screen md:w-3/4 rounded-lg md:mt-14 place-self-center md:bg-slate-900 md:shadow-lg h-[5rem] flex items-center justify-center md:justify-between">
	<h1 class="md:ml-10 max-w-screen text-2xl md:text-3xl text-white font-semibold">
		{logDate.toDateString() + "'s Log"}
	</h1>
	<button on:click={() => showNewWorkoutModal()} class="bg-white hover:bg-black text-black hover:text-white md:mr-4 md:relative absolute bottom-0 md:w-fit w-11/12 h-16 my-3 md:my-0 md:h-fit btn btn-primary shadow-lg"><iconify-icon class="text-3xl" icon="mdi:weight-lifter"/>Add Workout</button>
</div>

{#if weight_workouts.length <= 0 && cardio_workouts <= 0}
	<div class="w-screen flex-grow flex flex-col items-center justify-center gap-4">
		<h1 class="text-lg md:text-2xl text-white font-semibold">
			No workouts found for {logDate.toDateString()}
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

