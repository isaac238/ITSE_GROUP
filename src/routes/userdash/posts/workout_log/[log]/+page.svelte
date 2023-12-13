<script>
    import WeightWorkoutLog from "../../../../../components/WeightWorkoutLog.svelte";
    import CardioWorkoutLog from "../../../../../components/CardioWorkoutLog.svelte";
	import 'iconify-icon';

	export let data;

	const recordData = data.recordData;
	let [ day, month, year ] = recordData.name.split("/");
	const logDate = new Date(year, month - 1, day);

	let cardio_workouts = [];
	let weight_workouts = [];

	if (recordData.cardio_workouts.length > 0 )
		cardio_workouts = recordData.expand.cardio_workouts;

	if (recordData.weight_workouts.length > 0 )
		weight_workouts = recordData.expand.weight_workouts;
</script>

<header class="py-3 px-5">
<h1 class="bg-transparent text-xl md:text-3xl font-black">Modern Fit <iconify-icon icon="mdi:weight-lifter"/></h1>
<a href="/userdash"> <h2 class="bg-transparent text-lg md:text-2xl font-medium">&lt; Back</h2> </a>
</header>

<div class="w-screen md:w-3/4 rounded-lg md:mt-14 place-self-center md:bg-slate-900 md:shadow-lg h-[5rem] flex items-center justify-center md:justify-between">
	<h1 class="md:ml-10 max-w-screen text-2xl md:text-3xl text-white font-semibold">
		{logDate.toDateString() + "'s Log"}
	</h1>
</div>

{#if weight_workouts.length <= 0 && cardio_workouts <= 0}
	<div class="w-screen flex-grow flex flex-col items-center justify-center gap-4">
		<h1 class="text-lg md:text-2xl text-white font-semibold">
			No workouts found for {logDate.toDateString()}
		</h1>
		<button class="h-full text-md btn btn-primary bg-white text-black hover:text-white hover:bg-black drawer-button z-10 p-4 rounded-lg cursor-pointer" disabled><iconify-icon class="text-3xl" icon="mdi:weight-lifter"/>Add Your First Workout</button>
	</div>
{:else}
	<div class="w-screen md:w-3/4 p-3 md:p-0 rounded-lg flex-grow md:flex-grow-0 place-self-center">
		{#each weight_workouts as workout}
			<WeightWorkoutLog {workout}/>
		{/each}

		{#each cardio_workouts as workout}
			<CardioWorkoutLog {workout}/>
		{/each}
	</div>
{/if}

