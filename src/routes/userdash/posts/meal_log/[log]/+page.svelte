<!-- Userdash - Meal Log - Slug -->

<script>
	import DeleteItemModal from "../../../../../components/DeleteItemModal.svelte";
    import MealLogFooditem from "../../../../../components/MealLogFooditem.svelte";
    import NewFoodModal from "../../../../../components/NewFoodModal.svelte";
	import 'iconify-icon';

	export let data;

	const recordData = data.recordData;
	let foods = recordData.foods.length > 0 ? recordData.expand.foods : [];
	let itemToDelete;

	const sendDeleteRequest = async () => {
		const deleteResponse = await fetch(`/api/record/delete`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"collection": itemToDelete.collectionName,
				"id": itemToDelete.id,
			}),
		});

		const deleteResponseJSON = await deleteResponse.json();

		console.log("Delete Response");
		console.log(deleteResponseJSON);

		if (deleteResponseJSON) {
			foods = foods.filter((item) => item.id != itemToDelete.id);
		}

		itemToDelete = null;
	}

	const addNewFoodItem = (fooditem) => {
		console.log("Adding new food item");
		console.log(fooditem);
		// Use records/create api endpoint to create new fooditem record with the fooditem object from modal
	}

	const addNewPortionFooditem = (fooditemID, portion) => {
		console.log("Adding new portion_fooditem");
		console.log(fooditemID);
		console.log(portion);
		// Use records/create api endpoint to create new portion_fooditem record with the fooditemID and portion variables from modal
	}

	const newFoodModalCallback = () => {
		//Get state from newFoodModalState variable;
		if (newFoodModalState.fooditem.id == undefined) {
			// ID undefined so as not in DB yet so create new fooditem record
			// Return the new fooditem record from this function so the id can be passed into addNewPortionFooditem
			addNewFoodItem(newFoodModalState.fooditem);
		}

		addNewPortionFooditem(newFoodModalState.fooditem.id, newFoodModalState.portion);
	}

	const showDeleteModal = (item) => {
		itemToDelete = item;
		document.getElementById("delete-item-modal").showModal();
	}

	let newFoodModalState = {
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

	const getAllFoodItems = async () => {
		const response = await fetch("/api/record/getAll", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: (JSON.stringify({"collection": "foodItem"}))
		});

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
		const resp  = await getAllFoodItems();
		console.log(resp);
		clearNewFoodModalState();
		console.log("Opening modal new food");
		document.getElementById("new-food-modal").showModal();
	}
</script>

<dialog id="delete-item-modal" class="modal">
	<DeleteItemModal callback={sendDeleteRequest}/>
</dialog>

<dialog id="new-food-modal" class="modal">	
	<NewFoodModal bind:newFoodModalState callback={newFoodModalCallback} />
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
	</div>
{/if}

