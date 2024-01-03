<script>
	// Imports
	import "../app.postcss";

	// Components
	import Nav from "../components/nav.svelte";

	// Exports
	export let data;
	let user = data.user;
	let isTrainer = data.isTrainer;
	let isMember = data.isMember;
	let pin = data.pin;

	$: user = data.user;
	$: isTrainer = data.isTrainer;
	$: isMember = data.isMember;
	$: pin = data.pin;
	
</script>

<main class="bg-gradient-to-t from-gray-800 to-gray-950 flex min-h-screen flex-col">
	<Nav {user} {isTrainer} {isMember} {pin}/>
<slot />
</main>

