<script>
export let errors = [];
</script>

<div>
	<ul class="list-disc list-inside text-red-500">
		{#each errors as problem}
		<li class="text-red-500">{problem}</li>
		{/each}
	</ul>
</div>
