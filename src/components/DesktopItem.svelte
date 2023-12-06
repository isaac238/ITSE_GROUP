<script>
	export let title;
	export let subtitle;
</script>

<div class="w-[24rem] h-[30rem] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white p-10 text-xl flex flex-col justify-center whitespace-nowrap">
	<span class="flex flex-col justify-center items-center mb-4">
		<span class="w-full">
			<h1 class="text-3xl m-auto text-center font-bold overflow-x-hidden overflow-ellipsis pb-5">{title}</h1> 
			<h1 class="m-auto text-center overflow-x-hidden overflow-ellipsis">{subtitle}</h1>
		</span>
	</span>
	<button class="btn btn-default bg-white text-black border-none hover:bg-black hover:text-white mt-4">View</button>
</div>

