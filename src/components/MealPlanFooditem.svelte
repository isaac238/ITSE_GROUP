<script>
	export let food;
	const fooditem = food.expand.foodItem
	const name = fooditem.name;
	const portion = food.portion_in_g;

	export let complete = food.complete;
	let prevComplete = complete;

	$: {
		if (complete !== prevComplete) {
			sendUpdateRequest({"complete": complete});
			prevComplete = complete;
		}
	}

	console.log(food);

	const sendUpdateRequest = async (data) => {
		console.log("Sending update req");
		await fetch("/api/record/update", {
			method: "POST",
			body: JSON.stringify({
				"collection": food.collectionName,
				"recordID": food.id,
				"data": data,
			}),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	let showTooltip = false;
</script>

<div class="collapse md:collapse-arrow my-2">
	<input type="checkbox" id={"collapse-check-" + food.id} class="hidden" hidden/>
	<div class="bg-gray-100 border-black text-black collapse-title relative w-full h-[5rem] mx-auto p-3 lg:p-0 rounded-lg shadow-lg flex justify-between items-center" class:brightness-50={complete}>
	<button on:click={() => document.getElementById("collapse-check-" + food.id).click()} class="w-full h-full mx-auto flex justify-center whitespace-nowrap  items-center lg:justify-center gap-4 lg:gap-10">
		<button class="tooltip md:w-fit" data-tip={name} class:tooltip-open={showTooltip} on:focus={() => showTooltip = true} on:blur={() => showTooltip = false}>
			<h1 class="text-xl overflow-x-hidden max-w-[6rem] min-w-[12rem] lg:min-w-[30rem] md:min-w-[25rem] overflow-ellipsis">{name}</h1>
		</button>
		<h1 class="text-xl overflow-x-hidden overflow-ellipsis mr-10">{portion}g</h1>
	</button>
		<input type="checkbox" bind:checked={complete} class="checkbox md:mr-10" />
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
