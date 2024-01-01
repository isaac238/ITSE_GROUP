<script>
    import { writable } from "svelte/store";
    import MealPlanFooditem from '../../../../../components/MealPlanFooditem.svelte';
    import NewFoodModal from "../../../../../components/NewFoodModal.svelte";
    import Utils from '$lib/utils.js';
    import DeleteItemModal from "../../../../../components/DeleteItemModal.svelte";
    import MealLogFooditem from "../../../../../components/MealLogFooditem.svelte";

    export let data;

    const mealPlanData = writable(data.mealPlans);
    const planId = writable(data.planId);

    // console.log($planId);

    console.log($mealPlanData);

    let foods = $mealPlanData.foods.length > 0 ? $mealPlanData.expand.foods : [];

    let itemToDelete;
    let newFoodModalState;
    let allCurrentFoodItems = [];

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
 		updateMealPlan(portion.id);
 }

	  const updateMealPlan = async (portionId) => {
	  	const foodIds = foods.map((food) => food.id);

	  	const requestBody = {
	  		"collection": "meal_plan",
	  		"recordID": $planId,
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
	 	newFoodModalState = {
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
	 	};
	 }

	 const showNewFoodModal = async() => {
	 	allCurrentFoodItems  = await getAllFoodItems();
	 	clearNewFoodModalState();
	 	console.log("Opening modal new food");
	 	document.getElementById("new-food-modal").showModal();
	 }


	 clearNewFoodModalState();
</script>

<!-- <dialog id="new-food-modal" class="modal">
      <NewFoodModal bind:newFoodModalState callback={newFoodModalCallback}  bind:allCurrentFoodItems />  
    </dialog>

<div class="w-[97%] md:w-[50%] mx-auto h-full bg-transparent">
    {#each $mealPlanData as mealPlan}
        <h1 class="text-2xl text-center text-white my-10">{mealPlan.name}</h1>
        <div class="flex w-1/2 mx-auto justify-center gap-4 py-10">
            <button class="btn w-40 bg-red-500 text-white">Delete</button>
            <button class="btn w-40 bg-blue-400 text-white">Edit</button>
        </div>
        {#each mealPlan.expand.foods as food}
            <MealPlanFooditem {food} bind:complete={food.complete} />
        {/each}
    {/each}
</div> -->
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
			{$mealPlanData.name}
		</h1>
		<small class="text-[1rem] font-medium">
			{new Date($mealPlanData.created).toLocaleDateString()} at {new Date($mealPlanData.created).toLocaleTimeString().slice(0, -3)}
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
			No foods added to meal {$mealPlanData.name}
		</h1>
		<button on:click={() => showNewFoodModal()} class="h-full text-md btn btn-primary bg-white text-black hover:text-white hover:bg-black drawer-button z-10 p-4 rounded-lg cursor-pointer"><iconify-icon class="text-3xl" icon="mdi:burger"/>Add Your First Food</button>
	</div>
{:else}
	<div class="w-screen md:w-3/4 p-3 md:p-0 rounded-lg flex-grow md:flex-grow-0 place-self-center">
		{#each foods as food}
			<MealLogFooditem deleteEvent={() => showDeleteModal(food)} {food}/>
		{/each}
	</div>
{/if}
