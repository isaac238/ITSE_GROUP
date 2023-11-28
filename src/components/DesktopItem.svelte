<script>
	export let title;
	export let subtitle;
	export let description;
</script>

<div class="w-[24rem] h-[30rem] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white p-10 text-xl flex flex-col justify-between">
	<div>
		<h1 class="text-3xl font-bold mb-10">{title}</h1>
		<h1>{subtitle}</h1>
		<h1>{description}</h1>
	</div>
	<button class="btn btn-default bg-white text-black border-none hover:bg-black hover:text-white mt-4">View</button>
</div>
