<script>
	export let workout;
	export let deleteEvent;
	const name = workout.exercise;
	const reps = workout.reps;
	const sets = workout.sets;
	const weight = workout.weight_kg;
	console.log(workout);
</script>

<div class="relative w-full h-[5rem] mx-auto my-3 p-3 lg:p-0 rounded-lg bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg lg:shadow-none flex items-center justify-center gap-4 lg:gap-10">
	<h1 class="text-white text-xl lg:min-w-[7rem]">{name}</h1>
	<h1 class="text-white text-xl lg:min-w-[7rem]">{sets}x{reps}</h1>
	<h1 class="text-white text-xl lg:min-w-[7rem]">{weight}kg</h1>
	<span class="tooltip absolute right-3" data-tip="Delete Item">
		<button on:click={deleteEvent} class="w-fit p-4 inline-flex items-center justify-center btn btn-default bg-red-500 text-white h-fit border border-white hover:bg-red-800 hover:text-gray-50" aria-label="Delete this item"><iconify-icon class="text-xl" icon="mdi:bin"/></button>
	</span>
</div>
