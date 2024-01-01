<!-- Userdash - Meal Log - Slug -->
	 

<script>
	// Libraries
	import 'iconify-icon';
	import Utils from "$lib/utils.js"

	// Component Imports
	import DeleteItemModal from "$components/DeleteItemModal.svelte";
    import MealLogFooditem from "$components/MealLogFooditem.svelte";
    import NewFoodModal from "$components/NewFoodModal.svelte";

	// Props
	export let data;

	const recordData = data.recordData;
	let foods = recordData.foods.length > 0 ? recordData.expand.foods : [];
	let itemToDelete;
	let newFoodModalState;
	let allCurrentFoodItems = []


	let allUsedFoodItems;
	let averageFoodStatsPer100;
	let totalPortion;
	let totalFoodStats;

	function calculateAverageOfProperty(array, propertyName) {
		if (array.length > 0) {
			return array.reduce((total, next) => total + next[propertyName], 0) / array.length;
		} else {
			return 0;
		}
	}

	function calculateTotalOfProperty(array, propertyName) {
		if (array.length > 0) {
			return array.reduce((total, next) => total + ((next.expand.foodItem[propertyName] / 100) * next.portion_in_g), 0);
		} else {
			return 0;
		}
	}

	$: allUsedFoodItems = foods.map((food) => food.expand.foodItem);

	$: averageFoodStatsPer100 = {
		"calories_in_g": calculateAverageOfProperty(allUsedFoodItems, "calories_in_g"),
		"protein_in_g": calculateAverageOfProperty(allUsedFoodItems, "protein_in_g"),
		"carbs_in_g": calculateAverageOfProperty(allUsedFoodItems, "carbs_in_g"),
		"fats_in_g": calculateAverageOfProperty(allUsedFoodItems, "fats_in_g"),
		"sugar_in_g": calculateAverageOfProperty(allUsedFoodItems, "sugar_in_g"),
	};

	$: totalFoodStats = {
		"calories_in_g": calculateTotalOfProperty(foods, "calories_in_g"),
		"protein_in_g": calculateTotalOfProperty(foods, "protein_in_g"),
		"carbs_in_g": calculateTotalOfProperty(foods, "carbs_in_g"),
		"fats_in_g": calculateTotalOfProperty(foods, "fats_in_g"),
		"sugar_in_g": calculateTotalOfProperty(foods, "sugar_in_g"),
	};


	$: console.log(allUsedFoodItems);
	$: console.log(averageFoodStatsPer100);

	// DELETE MODAL FUNCTIONS

	function deleteCallback(responseJSON) {
		if (!responseJSON) return;

		const foodsWithoutDeletedItem = foods.filter((item) => item.id != itemToDelete.id);
		foods = foodsWithoutDeletedItem;
		itemToDelete = null;
	}


	function showDeleteModal(item) {
		itemToDelete = item;
		document.getElementById("delete-item-modal").showModal();
	}


	// FOOD MODAL FUNCTIONS

	const addNewFoodItem = async (fooditem) => {
		console.log("Adding new food item");
		console.log(fooditem);
		//  {"food":"chicken","price":4.00}
		const requestBody = {
			"collection": "foodItem",
			"data": fooditem
		};
		const response = await Utils.sendPostRequest("/api/record/create", requestBody);
		// Use records/create api endpoint to create new fooditem record with the fooditem object from modal
		return newFoodModalState.fooditem = await response.json();
	}


	const addNewPortionFooditem = async (fooditemID, portion) => {
	
		console.log("Adding new portion_fooditem");
		// Use records/create api endpoint to create new portion_fooditem record with the fooditemID and portion variables from modal

		const requestBody = {
			"collection": "portion_fooditem",
			"data": {
				"foodItem": fooditemID,
				"portion_in_g": portion,
			},
		};

		const response = await Utils.sendPostRequest("/api/record/create", requestBody);
		const responseJSON = await response.json();
		
		return responseJSON
	}


	const newFoodModalCallback = async () => {
		//Get state from newFoodModalState variable;
		const isANewFoodItem = newFoodModalState.fooditem.id == undefined;
		
		if (isANewFoodItem) {
			// ID undefined so as not in DB yet so create new fooditem record
			// Return the new fooditem record from this function so the id can be passed into addNewPortionFooditem
			newFoodModalState.fooditem = await addNewFoodItem(newFoodModalState.fooditem);
		}


		let portion = await addNewPortionFooditem(newFoodModalState.fooditem.id, newFoodModalState.portion);
		
		// Appends the new portion to the foods array so that the page renders it
		foods = [...foods, portion];

		// Updates the relations of this meal log
		updateMealLog(portion.id);
}

	const updateMealLog = async (portionId) => {
		const foodIds = foods.map((food) => food.id);

		const requestBody = {
			"collection": "meal_log",
			"recordID": recordData.id,
			"data": {"foods": foodIds},
		}

		const response = await Utils.sendPostRequest("/api/record/update", requestBody);
		const responseJSON = await response.json();

		return responseJSON;
		
	}

	const getAllFoodItems = async () => {
		const requestBody = {
			"collection": "foodItem",
		};

		const response = await Utils.sendPostRequest("/api/record/getAll", requestBody);
		const responseJSON = await response.json();

		console.log(responseJSON);
		return responseJSON;
	}

	const clearNewFoodModalState = () => {
		newFoodModalState = structuredClone({
			"step": 0,
			"fooditem": {
				"name": "",
				"calories_in_g": "",
				"protein_in_g": "",
				"carbs_in_g": "",
				"fats_in_g": "",
				"sugar_in_g": "",
			},
			"portion": "",
			"foodListFilter": "",
		});
	}

	const showNewFoodModal = async() => {
		allCurrentFoodItems  = await getAllFoodItems();
		clearNewFoodModalState();
		console.log("Opening modal new food");
		document.getElementById("new-food-modal").showModal();
	}


	clearNewFoodModalState();
</script>

<DeleteItemModal callback={deleteCallback} bind:itemToDelete />

<dialog id="new-food-modal" class="modal">	
	<NewFoodModal bind:newFoodModalState callback={newFoodModalCallback}  bind:allCurrentFoodItems />
</dialog>

<header class="py-3 px-5">
<h1 class="bg-transparent text-xl md:text-3xl font-black">Modern Fit <iconify-icon icon="mdi:weight-lifter"/></h1>
<a href="/userdash"> <h2 class="bg-transparent text-lg md:text-2xl font-medium">&lt; Back</h2> </a>
</header>

<div class="w-screen md:w-3/4 rounded-lg md:mt-14 place-self-center md:bg-slate-900 md:shadow-lg h-[5rem] flex items-center justify-center md:justify-between">
	<div class="flex flex-col md:ml-10">
		<h1 class="max-w-screen text-2xl md:text-3xl text-white font-semibold">
			{recordData.name}
		</h1>
		<small class="text-[1rem] font-medium">
			{new Date(recordData.created).toLocaleDateString()} at {new Date(recordData.created).toLocaleTimeString().slice(0, -3)}
		</small>
	</div>
	<button on:click={() => showNewFoodModal()} class="bg-white hover:bg-black text-black hover:text-white md:mr-4 md:relative absolute bottom-0 md:w-fit w-11/12 h-16 my-3 md:my-0 md:h-fit btn btn-primary shadow-lg">
		<iconify-icon class="text-3xl" icon="mdi:burger"/>Add Food
	</button>
</div>

<!-- Foods -->
{#if foods.length <= 0}
	<div class="w-screen flex-grow flex flex-col items-center justify-center gap-4">
		<h1 class="text-lg md:text-2xl text-white font-semibold">
			No foods added to meal {recordData.name}
		</h1>
		<button on:click={() => showNewFoodModal()} class="h-full text-md btn btn-primary bg-white text-black hover:text-white hover:bg-black drawer-button z-10 p-4 rounded-lg cursor-pointer"><iconify-icon class="text-3xl" icon="mdi:burger"/>Add Your First Food</button>
	</div>
{:else}
	<div class="w-screen md:w-3/4 p-3 md:p-0 rounded-lg flex-grow md:flex-grow-0 place-self-center">
		{#each foods as food}
			<MealLogFooditem deleteEvent={() => showDeleteModal(food)} {food}/>
		{/each}
		<h1 class="mt-4 text-xl font-semibold text-center">Totals</h1>
		<div class="mt-3 text-black rounded-lg bg-gray-100 shadow-lg ">
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
						<td>{averageFoodStatsPer100.calories_in_g}Kcal</td>
						<td>{totalFoodStats.calories_in_g}Kcal</td>
					</tr>
					<tr>
						<th>Protein</th>
						<td>{averageFoodStatsPer100.protein_in_g}g</td>
						<td>{totalFoodStats.protein_in_g}g</td>
					</tr>
					<tr>
						<th>Carbs</th>
						<td>{averageFoodStatsPer100.carbs_in_g}g</td>
						<td>{totalFoodStats.carbs_in_g}g</td>
					</tr>
					<tr>
						<th>Fat</th>
						<td>{averageFoodStatsPer100.fats_in_g}g</td>
						<td>{totalFoodStats.fats_in_g}g</td>
					</tr>
					<tr>
						<th>Sugar</th>
						<td>{averageFoodStatsPer100.sugar_in_g}g</td>
						<td>{totalFoodStats.sugar_in_g}g</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
{/if}
