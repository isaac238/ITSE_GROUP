<script>

	export let title;
	export let subtitle;
	export let description;

</script>


<div class="snap-always snap-center text-white flex-shrink-0 w-[100%] h-100% bg-gradient-to-r from-amber-500 to-red-500 rounded-lg flex justify-center items-center flex-col">
	<div class="mx-14">
		<h1 class="text-3xl font-bold mb-10">{title}</h1>
		<h1 class="w-fit">{subtitle}</h1>
		<h1 class="w-fit">{description}</h1>
		<button class="btn btn-default w-full bg-white text-black border-none hover:bg-black hover:text-white mt-4">View</button>
	</div>
</div>
