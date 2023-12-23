<script>
    import { writable } from 'svelte/store';
	import User from '../../components/User.svelte';
    import { createEventDispatcher } from 'svelte';

	export let data; 

	const clientsData = writable(data.clientData);

	const trainees = $clientsData.expand.trainees;

</script>

<div class="h-screen w-screen flex justify-center items-center flex-col">
	<h1 class="my-4 text-xl text-white">Client List:</h1>
	<div class="w-[94%] md:w-1/3 h-[80%] rounded-xl flex flex-col items-center shadow-black overflow-y-auto">
		{#each trainees as record}
			<User name="{record.first_name} {record.surname}" link="trainerdash/{record.id}"/>
		{/each}
	</div>

</div>
