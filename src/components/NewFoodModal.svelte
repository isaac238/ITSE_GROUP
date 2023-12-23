<script>
	// imports

	import LabeledInput from "./LabeledInput.svelte";

	// exports
	export let callback;
	export let newFoodModalState;

	$: console.log(newFoodModalState);

	$: {
		if (!fooditemIsValid()) {
			newFoodModalState.portion = "";
		}
	}

	// Get all current fooditems from db using searchAll api endpoint
	// let allCurrentFoodItems = [
	// 	// Read these from db instead of using these placeholders
	// 	{
	// 		"id": 1,
	// 		"name": "Chicken Breast",
	// 		"calories_in_g": 165,
	// 		"protein_in_g": 31,
	// 		"carbs_in_g": 0,
	// 		"fats_in_g": 3.6,
	// 		"sugar_in_g": 0,
	// 	},
	// 	{
	// 		"id": 2,
	// 		"name": "Chicken Thigh",
	// 		"calories_in_g": 209,
	// 		"protein_in_g": 26,
	// 		"carbs_in_g": 0,
	// 		"fats_in_g": 11,
	// 		"sugar_in_g": 0,
	// 	},
	// 	{
	// 		"id": 3,
	// 		"name": "Broccoli",
	// 		"calories_in_g": 34,
	// 		"protein_in_g": 2.8,
	// 		"carbs_in_g": 6,
	// 		"fats_in_g": 0.4,
	// 		"sugar_in_g": 1.7,
	// 	},
	// 	{
	// 		"id": 4,
	// 		"name": "Rice",
	// 		"calories_in_g": 130,
	// 		"protein_in_g": 2.7,
	// 		"carbs_in_g": 28,
	// 		"fats_in_g": 0.3,
	// 		"sugar_in_g": 0,
	// 	},
	// ];

	let allCurrentFoodItems = [];

	const emptyFooditem = {
		name: "",
		calories_in_g: "",
		protein_in_g: "",
		carbs_in_g: "",
		fats_in_g: "",
		sugar_in_g: "",
	};

	let maxStep = 1;

	const incrementStep = () => {
		if (newFoodModalState.step < maxStep) newFoodModalState.step++;
	};

	const decrementStep = () => {
		if (newFoodModalState.step > 0) newFoodModalState.step--;
	};

	const fooditemIsValid = () => {
		const hasEmpty = Object.values(newFoodModalState.fooditem).some(
			(value) => value === ""
		);
		return !hasEmpty;
	};

	const handleSubmit = () => {
		if (fooditemIsValid()) {
			// create a new newFoodModalState.fooditem using newFoodModalState.fooditem object if id = undefined here or in callback
			// use callback to create new portion_newFoodModalState.fooditem record based on newFoodModalState.fooditem id for reference to newFoodModalState.fooditem and portion variable for portion_in_g
			callback();
			document.getElementById("cancelButton").click();
		}
	};

	let createNewFood = false;
	let showFoodList = false;

	const createNewFoodClicked = () => {
		createNewFood = true;
		maxStep = 2;
		newFoodModalState.fooditem = emptyFooditem;
		newFoodModalState.foodListFilter = "";

		setTimeout(() => {
			incrementStep();
		}, 1);
	};

	$: if (newFoodModalState.step == 0 && fooditemIsValid())
		createNewFood = false;
	$: showFoodList = newFoodModalState.foodListFilter != "" ? true : false;
</script>

<!-- Render -->

<div class="modal-box bg-gradient-to-b from-gray-800 to-gray-950">
	<h2 class="text-xl text-white">
		New: <span class="font-semibold">Food</span>
	</h2>
	<div class="flex flex-col gap-2 p-5">
		<form
			on:submit|preventDefault={handleSubmit}
			class="flex flex-col gap-4"
		>
			<!-- STEP 1 -->
			{#if newFoodModalState.step == 0}
				<label for="foodType" class="text-white"
					>Choose a Food Type</label
				>
				<div>
					<LabeledInput
						bind:value={newFoodModalState.foodListFilter}
						name="foodType"
						type="text"
						placeholder="Food Name"
						required={true}
					/>
					{#if showFoodList}
						<div class=" flex flex-col items-center mt-4 gap-2 overflow-y-scroll min-h-fit max-h-28">
							{#each allCurrentFoodItems as fooditem}
								{#if fooditem.name
									.toLowerCase()
									.includes(newFoodModalState.foodListFilter.toLowerCase())}
									<button
										on:click={() => {
											newFoodModalState.fooditem =
												fooditem;
											newFoodModalState.foodListFilter =
												fooditem.name;
										}}
										type="button"
										class="block w-full bg-base-100 rounded-lg p-2"
										>{fooditem.name}</button
									>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
				<h1>Or</h1>
				<button 
					type="button"
					class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md"
					on:click={() => createNewFoodClicked()}
					>Add a new Food Type</button
				>
			{/if}

			<!-- STEP 2 -->
			{#if createNewFood && newFoodModalState.step == 1}
				<LabeledInput
					bind:value={newFoodModalState.fooditem.name}
					name="Food Name"
					type="text"
					placeholder="Food Name"
					required={true}
				/>
				<h1 class="font-bold">Macros per 100g</h1>
				<LabeledInput
					bind:value={newFoodModalState.fooditem.calories_in_g}
					name="Calories (Kcal)"
					type="number"
					min="0"
					step="1"
					placeholder="Calories"
					required={true}
				/>
				<LabeledInput
					bind:value={newFoodModalState.fooditem.protein_in_g}
					name="Protein (g)"
					type="number"
					min="0"
					step="0.1"
					placeholder="Protein"
					required={true}
				/>
				<LabeledInput
					bind:value={newFoodModalState.fooditem.carbs_in_g}
					name="Carbs (g)"
					type="number"
					min="0"
					step="0.1"
					placeholder="Carbs"
					required={true}
				/>
				<LabeledInput
					bind:value={newFoodModalState.fooditem.fats_in_g}
					name="Fats (g)"
					type="number"
					min="0"
					step="0.1"
					placeholder="Fats"
					required={true}
				/>
				<LabeledInput
					bind:value={newFoodModalState.fooditem.sugar_in_g}
					name="Sugar (g)"
					type="number"
					min="0"
					step="0.1"
					placeholder="Sugar"
					required={true}
				/>
			{/if}

			<!-- ADD PORTION (STEP 3) -->
			{#if (newFoodModalState.step == 1 && !createNewFood) || (newFoodModalState.step == 2 && createNewFood)}
				<LabeledInput
					bind:value={newFoodModalState.portion}
					name="Portion (g)"
					type="number"
					min="0"
					step="1"
					placeholder="Portion"
					required={true}
				/>
			{/if}

			<button type="submit" class="hidden" id="formSubmit" />
		</form>
	</div>
	<div class="modal-action">
		{#if newFoodModalState.step < maxStep && fooditemIsValid()}
			<button
				class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md"
				on:click={incrementStep}>Next</button>
		{/if}

		{#if newFoodModalState.step > 0}
			<button
				class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md"
				on:click={decrementStep}>Back</button>
		{/if}

		{#if newFoodModalState.step === maxStep}
			<button
				id="doneButton"
				class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md"
				type="submit"
				on:click={() => document.getElementById("formSubmit").click()}
				>Done</button>
		{/if}

		<form method="dialog" class="flex gap-4">
			<button
				id="cancelButton"
				class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md"
				aria-label="cancel">Cancel</button
			>
		</form>
	</div>
</div>

<form class="modal-backdrop" method="dialog">
	<button>close</button>
</form>
