<script>
	export let workout;
	const name = workout.exercise;
	const duration = workout.durationInSeconds;
	const distance = workout.distanceMiles;
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

<div class="relative w-full h-[5rem] mx-auto my-3 p-3 lg:p-0 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg lg:shadow-none flex items-center justify-start lg:justify-center gap-4 lg:gap-10" class:brightness-75={complete}>
	<h1 class="text-xl lg:min-w-[7rem]">{name}</h1>
	<h1 class="text-xl lg:min-w-[7rem]">{duration}s</h1>
	<h1 class="text-xl lg:min-w-[7rem]">{distance} Miles</h1>
	<input type="checkbox" bind:checked={complete} class="checkbox absolute right-3 lg:right-10" />
</div>
