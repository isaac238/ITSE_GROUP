<script>
	// Imports
	import "../app.postcss";

	// Components
	import Nav from "../components/nav.svelte";

	// Exports
	export let data;
	let user = data.user;
	let pin = data.pin;
	$: user = data.user;
	$: pin = data.pin;
	
</script>

<main class="bg-gradient-to-t from-gray-800 to-gray-950 flex min-h-screen flex-col">
	<Nav {user} {pin}/>
<slot />
</main>

