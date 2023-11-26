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



<div class="w-screen h-screen flex flex-col items-center bg-transparent">
  <ul class="menu menu-horizontal rounded-xl my-2 p-0 h-fit">
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

 <div class="hidden md:flex flex-wrap items-center w-4/6 h-5/6 rounded-xl overflow-y-auto gap-7 p-4">
	<div class="w-[24rem] h-[30rem] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white p-10 text-xl flex flex-col justify-between">
		<div>
			<h1 class="text-3xl font-bold mb-10">Jimbo 10k</h1>
			<h1>The Jimbo Special</h1>
			<h1>Alcohol for preworkout.</h1>
		</div>
		<button class="btn btn-default bg-white text-black border-none hover:bg-black hover:text-white mt-4">View</button>
	</div>
	<div class="w-[24rem] h-[30rem] bg-gradient-to-r from-amber-500 to-red-500 rounded-lg text-white p-10 text-xl flex flex-col justify-between">
		<div>
			<h1 class="text-3xl font-bold mb-10">Jimbo 10k</h1>
			<h1>The Jimbo Special</h1>
			<h1>Alcohol for preworkout.</h1>
		</div>
		<button class="btn btn-default bg-white text-black border-none hover:bg-black hover:text-white mt-4">View</button>
	</div>
	<div class="w-[24rem] h-[30rem] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white p-10 text-xl flex flex-col justify-between">
		<div>
			<h1 class="text-3xl font-bold mb-10">Jimbo 10k</h1>
			<h1>The Jimbo Special</h1>
			<h1>Alcohol for preworkout.</h1>
		</div>
		<button class="btn btn-default bg-white text-black border-none hover:bg-black hover:text-white mt-4">View</button>
	</div>
	<div class="w-[24rem] h-[30rem] bg-gradient-to-r from-amber-500 to-red-500 rounded-lg text-white p-10 text-xl flex flex-col justify-between">
		<div>
			<h1 class="text-3xl font-bold mb-10">Jimbo 10k</h1>
			<h1>The Jimbo Special</h1>
			<h1>Alcohol for preworkout.</h1>
		</div>
		<button class="btn btn-default bg-white text-black border-none hover:bg-black hover:text-white mt-4">View</button>
	</div>
	

 </div>
</div>





