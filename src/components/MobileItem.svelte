<script>

	export let title;
	export let subtitle;

</script>


<div class="px-5 snap-always snap-center text-white flex-shrink-0 w-[100%] h-100% bg-gradient-to-r from-amber-500 to-red-500 rounded-lg flex justify-center items-center flex-col whitespace-nowrap">
	<span class="w-full text-center">
	<h1 class="text-3xl overflow-x-hidden pb-5 overflow-ellipsis font-bold">{title}</h1>
	</span>
	<h1 class="w-fit">{subtitle}</h1>
	<button class="btn btn-default w-full bg-white text-black border-none hover:bg-black hover:text-white mt-4">View</button>
</div>
