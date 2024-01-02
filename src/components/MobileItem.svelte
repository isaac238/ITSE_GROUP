<script>
	// imports

	// Components
	import "iconify-icon";

	// exports
	export let title;
	export let subtitle;
	export let button = "View";
	export let from = "from-amber-500";
	export let to = "to-red-500";
	export let clickEvent = "";
	export let deleteEvent = "";

	// 

</script>

<!-- Render -->

<div class="relative px-5 snap-always snap-center text-white flex-shrink-0 w-[100%] h-100% bg-gradient-to-r {from} {to} rounded-lg flex justify-center items-center flex-col whitespace-nowrap">
	<span class="w-full text-center pb-3">
		<h1 class="text-3xl overflow-x-hidden pb-1 overflow-ellipsis font-bold">{title}</h1>
		<h1 class="overflow-x-hidden overflow-ellipsis">{subtitle}</h1>
	</span>
	<button on:click={clickEvent} class="btn btn-default w-full bg-white text-black border-none hover:bg-black hover:text-white mt-4">{button}</button>
	{#if deleteEvent !== ""}
		<span class="tooltip absolute bottom-2 right-2" data-tip="Delete Item">
			<button on:click={deleteEvent} class="w-fit p-4 inline-flex items-center justify-center btn btn-default bg-red-500 text-white h-fit border border-white hover:bg-red-800 hover:text-gray-50" aria-label="Delete this item"><iconify-icon class="text-xl" icon="mdi:bin"/></button>
		</span>
	{/if}
</div>
