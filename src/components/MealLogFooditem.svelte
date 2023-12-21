<script>
	export let food;
	const fooditem = food.expand.fooditem
	const name = fooditem.name;
	const portion = food.portion_in_g;

	export let deleteEvent;

	let showTooltip = false;
</script>

<div class="collapse collapse-arrow my-3">
	<input type="checkbox" id={"collapse-check-" + food.id} class="hidden" hidden/>
	<div class="bg-gray-100 border-black text-black collapse-title relative w-full h-[5rem] mx-auto p-3 lg:p-0 rounded-lg shadow-lg flex justify-between items-center">
	<button on:click={() => document.getElementById("collapse-check-" + food.id).click()} class="w-full h-full mx-auto flex justify-center whitespace-nowrap  items-center lg:justify-center gap-4 lg:gap-10">
		<button class="tooltip md:w-fit" data-tip={name} class:tooltip-open={showTooltip} on:focus={() => showTooltip = true} on:blur={() => showTooltip = false}>
			<h1 class="text-xl overflow-x-hidden max-w-[6rem] min-w-[12rem] lg:min-w-[30rem] md:min-w-[25rem] overflow-ellipsis">{name}</h1>
		</button>
		<h1 class="text-xl overflow-x-hidden overflow-ellipsis mr-10">{portion}g</h1>
	</button>
	<button on:click={deleteEvent} class="md:mr-10 w-fit p-4 inline-flex items-center justify-center btn btn-default bg-red-500 text-white h-fit border border-white hover:bg-red-800 hover:text-gray-50" aria-label="Delete this item"><iconify-icon class="text-xl" icon="mdi:bin"/></button>
	</div>
	<div class="collapse-content mt-3 text-black rounded-lg bg-gray-100 shadow-lg ">
		<table class="table">
			<thead>
				<tr class="text-black">
					<th></th>
					<th>Per 100g</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Calories</th>
					<td>{fooditem.calories_in_g}Kcal</td>
					<td>{(fooditem.calories_in_g/100)*portion}Kcal</td>
				</tr>
				<tr>
					<th>Protein</th>
					<td>{fooditem.protein_in_g}g</td>
					<td>{(fooditem.protein_in_g/100)*portion}g</td>
				</tr>
				<tr>
					<th>Carbs</th>
					<td>{fooditem.carbs_in_g}g</td>
					<td>{(fooditem.carbs_in_g/100)*portion}g</td>
				</tr>
				<tr>
					<th>Fat</th>
					<td>{fooditem.fats_in_g}g</td>
					<td>{(fooditem.fats_in_g/100)*portion}g</td>
				</tr>
				<tr>
					<th>Sugar</th>
					<td>{fooditem.sugar_in_g}g</td>
					<td>{(fooditem.sugar_in_g/100)*portion}g</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
