<script>
	import { writable } from 'svelte/store';
	import Workout from '$lib/assets/workout.jpg';

	export let data; //Importing data so page isn't static, for route guarding (DO NOT DELETE)..

	const navState = writable("Dashboard");
	
	function updateNavState(state) { //Sets nav state for single page navigation
		navState.set(state);
	}

</script>

{#if $navState == "Workout"}
	<div class="h-fit w-screen flex-row justify-center items-center">
		<div class="card w-[90%] h-fit p-4 bg-base-200 shadow-xl m-auto my-10">
		  <div class="card-body">
			<h2 class="card-title pb-5">Upper Body Workout</h2>
			<figure><img src={Workout} class="rounded-xl h-full" alt="Shoes" /></figure>
			<ul>
				<li class="my-4">2x20 Chest Flys</li>
				<li class="my-4">5x10 Dumbbell Curls</li>
				<li class="my-4">1x10 Barbell Thingies</li>
			</ul>
			<div class="card-actions justify-end">
				<button class="btn btn-primary w-full">Check it out</button>
			</div>
		  </div>
		</div>
	</div>
	<div class="card w-[90%] h-fit p-4 bg-base-200 shadow-xl m-auto my-10">
	  <div class="card-body">
		<h2 class="card-title pb-5">Upper Body Workout</h2>
		<figure><img src={Workout} class="rounded-xl h-full" alt="Shoes" /></figure>
		<ul>
			<li class="my-4">2x20 Chest Flys</li>
			<li class="my-4">5x10 Dumbbell Curls</li>
			<li class="my-4">1x10 Barbell Thingies</li>
		</ul>
		<div class="card-actions justify-end">
			<button class="btn btn-primary w-full">Check it out</button>
		</div>
	  </div>
	</div>
{/if}




<div class="btm-nav">
	<button class="bg-red-600 text-pink-200" class:active={$navState == "Workout"} on:click={() => updateNavState("Workout")}>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
		<span class="btm-nav-label">Workout</span>
	</button>
	<button class="bg-blue-600 text-blue-200" class:active={$navState == "Nutrition"} on:click={() => updateNavState("Nutrition")}>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
		<span class="btm-nav-label">Nutrition</span>
	</button>
	<button class="bg-teal-600 text-teal-200" class:active={$navState == "Dashboard"} on:click={() => updateNavState("Dashboard")}>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
		<span class="btm-nav-label">Dashboard</span>
	</button>
</div>	
