<script>
	export let fooditem;
	const name = fooditem.name;
	const portion = fooditem.portion_size_g;

	const bin = fooditem.bin_number;

	// Get from API and * by portion_size_g
	const calories = "X";
	export let complete = fooditem.complete;
	let prevComplete = complete;

	$: {
		if (complete !== prevComplete) {
			sendUpdateRequest({"complete": complete});
			prevComplete = complete;
		}
	}

	console.log(fooditem);

	const sendUpdateRequest = async (data) => {
		console.log("Sending update req");
		await fetch("/api/record/update", {
			method: "POST",
			body: JSON.stringify({
				"collection": fooditem.collectionName,
				"recordID": fooditem.id,
				"data": data,
			}),
			headers: { 'Content-Type': 'application/json' },
		});
	}

	let showTooltip = false;
</script>

<div class="collapse collapse-arrow my-3">
	<input type="checkbox" id={"collapse-check-" + fooditem.id} class="hidden" hidden/>
	<div class="bg-gray-100 border-black text-black collapse-title relative w-full h-[5rem] mx-auto p-3 lg:p-0 rounded-lg shadow-lg flex justify-between items-center" class:brightness-50={complete}>
	<button on:click={() => document.getElementById("collapse-check-" + fooditem.id).click()} class="w-full h-full mx-auto flex justify-center whitespace-nowrap  items-center lg:justify-center gap-4 lg:gap-10">
		<button class="tooltip md:w-fit" data-tip={name} class:tooltip-open={showTooltip} on:focus={() => showTooltip = true} on:blur={() => showTooltip = false}>
			<h1 class="text-xl overflow-x-hidden max-w-[6rem] min-w-[12rem] lg:min-w-[30rem] md:min-w-[25rem] overflow-ellipsis">{name}</h1>
		</button>
		<h1 class="text-xl overflow-x-hidden overflow-ellipsis mr-10">{portion}g</h1>
		<!--<h1 class="text-xl md:min-w-[15rem] max-w-[6rem] overflow-x-hidden overflow-ellipsis">{calories}kcal</h1>-->
	</button>
		<input type="checkbox" bind:checked={complete} class="checkbox absolute right-3 lg:right-10" />
	</div>
	<div class="collapse-content mt-3 text-black rounded-lg bg-gray-100 shadow-lg ">
		<table class="table">
			<thead>
				<tr>
					<th></th>
					<th>Per 100g</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>Calories</th>
					<td>{"00Kcal"}</td>
					<td>{"000Kcal"}</td>
				</tr>
				<tr>
					<th>Protein</th>
					<td>{"00g"}</td>
					<td>{"000g"}</td>
				</tr>
				<tr>
					<th>Carbs</th>
					<td>{"00g"}</td>
					<td>{"000g"}</td>
				</tr>
				<tr>
					<th>Fat</th>
					<td>{"00g"}</td>
					<td>{"000g"}</td>
				</tr>
				<tr>
					<th>Sugar</th>
					<td>{"00g"}</td>
					<td>{"000g"}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
