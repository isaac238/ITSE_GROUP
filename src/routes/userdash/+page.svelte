<script>
	import { writable } from 'svelte/store';
	import Nav from '../../components/nav.svelte';
	import Workout from '$lib/assets/workout.jpg';
	import WorkoutItem from '../../components/WorkoutItem.svelte';

	export let data; //Importing data so page isn't static, for route guarding (DO NOT DELETE)..

	const navState = writable("Dashboard");
	
	function updateNavState(state) { //Sets nav state for single page navigation
		navState.set(state);
	}

</script>



<div class="w-screen h-screen flex flex-col items-center bg-neutral">
  <ul class="menu menu-horizontal rounded-xl mt-2 p-0 h-fit">
    <button class="btn-sm bg-slate-800 rounded-lg mx-1">Nutrition</button>
    <button class="btn-sm bg-slate-800 rounded-lg mx-1">Workout</button>
    <button class="btn-sm bg-slate-800 rounded-lg mx-1">Dashboard</button>
  </ul>

  <div class="md:hidden flex snap-x snap-mandatory overflow-x-auto p-4 space-x-4 bg-neutral w-screen flex-grow">
    <div class="snap-always snap-center flex-shrink-0 w-[100%] h-100% bg-red-200 rounded-lg"></div>
    <div class="snap-always snap-center flex-shrink-0 w-[100%] h-100% bg-gray-300 rounded-lg"></div>
    <div class="snap-always snap-center flex-shrink-0 w-[100%] h-100% bg-gray-300 rounded-lg"></div>
    <div class="snap-always snap-center flex-shrink-0 w-[100%] h-100% bg-gray-300 rounded-lg"></div>
  </div>

 <div class="hidden md:flex w-4/6 h-5/6 bg-red-100 my-auto rounded-xl">
	
 </div>
</div>





