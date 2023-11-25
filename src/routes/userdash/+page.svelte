<script>
	import { writable } from 'svelte/store';
	import Nav from '../../components/nav.svelte';
	import Workout from '$lib/assets/workout.jpg';

	export let data; //Importing data so page isn't static, for route guarding (DO NOT DELETE)..

	const navState = writable("Dashboard");
	
	function updateNavState(state) { //Sets nav state for single page navigation
		navState.set(state);
	}

</script>

<div class="carousel carousel-center max-w-full p-4 space-x-4 bg-neutral h-fit overflow-x-scroll">
  <div class="carousel-item bg-gradient-to-t from-cyan-500 to-blue-500 md:w-[35rem] h-[45rem] w-[95%] rounded-lg">
	<div class="w-fit h-fit mx-10 my-10 text-2xl font-bold text-white">
		<h1>HIT Workout</h1>
		<a class="btn">View</a>
	</div>
  </div>

  <div class="carousel-item bg-gradient-to-t from-cyan-500 to-blue-500 md:w-[35rem] h-[45rem] w-[95%] rounded-lg">
	<div class="w-fit h-fit mx-10 my-10 text-2xl font-bold text-white">
		<h1>HIT Workout</h1>
		<a class="btn">View</a>
	</div>
  </div>

  <div class="carousel-item bg-gradient-to-t from-cyan-500 to-blue-500 md:w-[35rem] h-[45rem] w-[95%] rounded-lg">
	<div class="w-fit h-fit mx-10 my-10 text-2xl font-bold text-white">
		<h1>HIT Workout</h1>
		<a class="btn">View</a>
	</div>
  </div>

  <div class="carousel-item bg-gradient-to-t from-cyan-500 to-blue-500 md:w-[35rem] h-[45rem] w-[95%] rounded-lg">
	<div class="w-fit h-fit mx-10 my-10 text-2xl font-bold text-white">
		<h1>HIT Workout</h1>
		<a class="btn">View</a>
	</div>
  </div>

</div>



<div class="btm-nav md:w-1/5 md:m-auto join min-w-[460px]">
	<button class="bg-slate-900 text-slate-200 join-item transition ease-in-out hover:bg-slate-500 duration-300" class:active={$navState == "Workout"} on:click={() => updateNavState("Workout")}>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
		<span class="btm-nav-label">Workout</span>
	</button>
	<button class="bg-slate-800 text-slate-200 join-item transition ease-in-out hover:bg-slate-500 duration-300" class:active={$navState == "Nutrition"} on:click={() => updateNavState("Nutrition")}>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
		<span class="btm-nav-label">Nutrition</span>
	</button>
	<button class="bg-slate-700 text-slate-200 join-item transition ease-in-out hover:bg-slate-500 duration 300" class:active={$navState == "Dashboard"} on:click={() => updateNavState("Dashboard")}>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
		<span class="btm-nav-label">Dashboard</span>
	</button>
	<button class="bg-slate-600 text-slate-200 join-item transition ease-in-out hover:bg-slate-500 duration 300" class:active={$navState == "Add"} on:click={() => updateNavState("Add")}>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
		<span class="btm-nav-label">New Entry</span>
	</button>
</div>	
