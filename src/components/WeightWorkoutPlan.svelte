<script>
	export let workout;
	const name = workout.exercise;
	const reps = workout.reps;
	const sets = workout.sets;
	const weight = workout.weight_kg;
	export let complete = workout.complete;
	let prevComplete = complete;

	$: {
		if (complete !== prevComplete) {
			sendUpdateRequest({"complete": complete});
			prevComplete = complete;
		}
	}

	console.log(workout);

	const sendUpdateRequest = async (data) => {
		console.log("Sending update req");
		await fetch("/api/record/update", {
			method: "POST",
			body: JSON.stringify({
				"collection": workout.collectionName,
				"recordID": workout.id,
				"data": data,
			}),
			headers: { 'Content-Type': 'application/json' },
		});
	}

</script>

<div class="relative w-full h-[5rem] mx-auto my-3 p-3 lg:p-0 rounded-lg bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg lg:shadow-none flex items-center justify-start lg:justify-center gap-4 lg:gap-10" class:brightness-50={complete}>
	<h1 class="text-white text-xl lg:min-w-[7rem]">{name}</h1>
	<h1 class="text-white text-xl lg:min-w-[7rem]">{sets}x{reps}</h1>
	<h1 class="text-white text-xl lg:min-w-[7rem]">{weight}kg</h1>
	<input type="checkbox" bind:checked={complete} class="checkbox absolute right-3 lg:right-10" />
</div>
