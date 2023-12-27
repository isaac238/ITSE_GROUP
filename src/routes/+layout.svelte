<script>
	// Imports
	import "../app.postcss";

	// Components
	import Nav from "../components/nav.svelte";

	// Exports
	export let data;
	let user = data.user;
	$: user = data.user;
	
</script>

<main class="bg-gradient-to-t from-gray-800 to-gray-950 flex min-h-screen flex-col">
	<Nav {user}/>
<slot />
</main>

