<script>
	export let name;
    export let link;
</script>

<div class="w-[97%] h-[4rem] rounded-lg mt-2 flex items-center justify-center bg-white">
    <span class="ml-3 text-black text-lg">{name}</span>
    <a href={link} class="ml-auto mr-2 my-1  btn btn-primary w-20">View</a>
</div>
