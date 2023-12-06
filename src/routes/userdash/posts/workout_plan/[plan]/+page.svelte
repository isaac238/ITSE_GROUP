<script>
    import { writable } from "svelte/store";
    import { onMount } from "svelte";

    const screenWidth = writable(0);

    onMount(() => {
        const updateScreenWidth = () => {
            screenWidth.set(window.innerWidth);
        };

        updateScreenWidth();

        window.addEventListener("resize", updateScreenWidth);

        return () => {
            window.removeEventListener("resize", updateScreenWidth);
        };
    });

    $: isMobile = $screenWidth < 768;
</script>

{#if isMobile}
	<div class="w-screen h-screen bg-black">
		<div class="w-screen h-[4rem] flex items-center justify-center">
			<h1 class="max-w-screen text-2xl text-white font-semibold">Workout Name</h1>
		</div>
		<div class="w-screen h-screen bg-slate-700 flex itmes-center flex-col">
			<div class="w-[90vw] h-[5rem] my-3 p-5 mx-auto flex items-center 
			bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-lg gap-4">
				<h1 class="text-lg">Dumbbell Curl</h1>
				<h1 class="text-lg">5x10</h1>
				<h1 class="text-lg">20Kg</h1>
				<input type="checkbox" checked="checked" class="checkbox ml-auto"/>	
			</div>
		</div>

	</div>
{/if}
