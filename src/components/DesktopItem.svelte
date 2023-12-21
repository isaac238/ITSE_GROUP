<script>
	import "iconify-icon";

	export let title;
	export let subtitle;
	export let button = "View";
	export let from = "from-cyan-500";
	export let to = "to-blue-500";
	export let clickEvent = "";
	export let deleteEvent = "";
</script>

<div class="relative w-[24rem] h-[30rem] bg-gradient-to-r {from} {to} rounded-lg text-white p-10 text-xl flex flex-col justify-center whitespace-nowrap">
	<span class="flex flex-col justify-center items-center mb-4">
		<span class="w-full">
			<h1 class="text-3xl m-auto text-center font-bold overflow-x-hidden overflow-ellipsis pb-5">{title}</h1> 
			<h1 class="m-auto text-center overflow-x-hidden overflow-ellipsis">{subtitle}</h1>
		</span>
	</span>
	<button on:click={clickEvent} class="w-full btn btn-default bg-white text-black border-none hover:bg-black hover:text-white mt-4">{button}</button>
	{#if deleteEvent !== ""}
		<span class="tooltip absolute bottom-2 right-2" data-tip="Delete Item">
			<button on:click={deleteEvent} class="w-fit p-4 inline-flex items-center justify-center btn btn-default bg-red-500 text-white h-fit border-none hover:bg-red-800 hover:text-gray-50" aria-label="Delete this item"><iconify-icon class="text-xl" icon="mdi:bin"/></button>
		</span>
	{/if}
</div>

