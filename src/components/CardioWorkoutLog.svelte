<script>
	export let workout;
	const name = workout.exercise;
	const duration = workout.durationInSeconds;
	const distance = workout.distanceMiles;
	console.log(workout);
</script>

<div class="relative w-full h-[5rem] mx-auto my-3 p-3 lg:p-0 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg lg:shadow-none flex items-center justify-center gap-4 lg:gap-10">
	<h1 class="text-xl lg:min-w-[7rem]">{name}</h1>
	<h1 class="text-xl lg:min-w-[7rem]">{duration}s</h1>
	<h1 class="text-xl lg:min-w-[7rem]">{distance} Miles</h1>
</div>
