<script>
  import "../app.postcss";
  import Nav from "../components/nav.svelte";
</script>

<main class="bg-gradient-to-t from-gray-800 to-gray-950 flex min-h-screen flex-col">
	<Nav />
<slot />
</main>

