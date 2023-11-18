<script>
	export let workoutTitle;
	export let workoutItems = [];
	export let imgSource;
	export let altTag;
</script>	
	<div class="card w-[90%] h-fit p-10 bg-base-200 shadow-xl mt-10 md:w-1/3 md:m-10">
		  <div class="card-body">
			<h2 class="card-title pb-5">{workoutTitle}</h2>
			<figure><img src={imgSource} class="rounded-xl h-full w-full" alt={altTag} /></figure>
			<ul>
				{#each workoutItems as workoutItem}
					<li>{workoutItem}</li>	
				{/each}
			</ul>
			<div class="card-actions justify-end">
				<button class="btn btn-primary w-full">Check it out</button>
			</div>
		  </div>
	</div>

