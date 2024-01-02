<!-- Userdash - Meal Log  -->

<script>
	// Imports
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import Utils from "$lib/utils.js"
	import "iconify-icon";
	import { notifStore } from "../../lib/store.js"

	// Component Imports
    import MobileItem from "$components/MobileItem.svelte";
    import DesktopItem from "$components/DesktopItem.svelte";
	import NewMealLogModal from "$components/NewMealLogModal.svelte";
	import DeleteItemModal from "$components/DeleteItemModal.svelte";
	import UserdashInformation from "$components/UserdashInformation.svelte";
	import NotificationCentre from "../../components/NotificationCentre.svelte";

	// Props
    export let data; 

	//
    const screenWidth = writable(0);

	const currentTable = writable("workout_log");
	const collectionsData = writable(data.collectionsData);

	let collectionData = $collectionsData[$currentTable];
	$: collectionData = $collectionsData[$currentTable];

	let newLogTitle;
	let newLogSubtitle;
	let todaysWorkoutLogExists;

	$: todaysWorkoutLogExists = $collectionsData["workout_log"].some((log) => {
		return log.name === new Date().toLocaleDateString();
	});

	$: {
		if ($currentTable === "workout_log") {
			newLogTitle = "Todays Workouts";
			newLogSubtitle = "Log todays workouts!";
		}

		if ($currentTable === "meal_log") {
			newLogTitle = "Log a meal";
			newLogSubtitle = "Log another meal!";
		}
	}

	let drawerChecked;
	let menuString = "Menu";

    onMount(() => {
        const updateScreenWidth = () => {
            screenWidth.set(window.innerWidth);
        };

        updateScreenWidth();

        window.addEventListener("resize", updateScreenWidth);

        return () => {
            window.removeEventListener("resize", updateScreenWidth);
        };
    });

	let hasMenuToggled = false;

	function onKeyUp(e) {
		if (e.key === "m" || e.key === "M" && hasMenuToggled) 
			hasMenuToggled = false;
	}

	function onKeyDown(e) {
		if (e.key === "m" || e.key === "M" && !hasMenuToggled) {
			drawerChecked = !drawerChecked;
			hasMenuToggled = true;
		}
	}


	$: menuString = (drawerChecked) ? "Close" : "Menu";
    $: isMobile = $screenWidth < 768;


	// Delete Item Modal Methods

	let itemToDelete;

	const showDeleteItemModal = (item) => {
		itemToDelete = item;
		document.getElementById("delete-item-modal").showModal();
	}

	// Handles response from delete modal after it sends a delete request.
	async function deleteCallback(responseJSON) {
		if (!responseJSON) {
			notifStore.addError("There was an error deleting this record! Try again or contact support!")
			return;
		} 

		console.log("Callback running");
		const currentTableData = $collectionsData[$currentTable];
		const currentTableDataWithoutDeletedItem = currentTableData.filter((record) => record.id != itemToDelete.id);

		collectionsData.update((prev) => ({...prev, [$currentTable]: currentTableDataWithoutDeletedItem}));
		itemToDelete = null;
		notifStore.addSuccess("Deleted record successfully!")
	}


	// New Meal Log Modal Methods

	let mealLogName;
	let mealLogEatenAt;

	const showNewMealLogModal = () => {
		mealLogName = "";
		mealLogEatenAt = new Date().toISOString().slice(0, 16);
		document.getElementById("new-meal-log-modal").showModal();
	}

	const mealLogModalCallback = async () => {
		let requestData = {};

		requestData.name = mealLogName;
		requestData.eaten_at = new Date(mealLogEatenAt);
		sendNewRecordRequest(requestData);
	}

	// New Log Request Methods
	const startNewRecordRequest = async () => {
		let requestData = {};

		if ($currentTable === "workout_log") {
			requestData.name = new Date().toLocaleDateString();
			sendNewRecordRequest(requestData);
		}

		if ($currentTable === "meal_log") { showNewMealLogModal(); } // Opens modal, if done mealLogModalCallback is called.
	}


	const sendNewRecordRequest = async (requestData) => {
		const requestBody = {
			"collection": $currentTable,
			"data": requestData,
		};

		const response = await Utils.sendPostRequest("/api/record/create", requestBody);

		if (!response.ok) return;

		const newRecord = await response.json();
		newRecord.subtitle = Utils.getSubtitle($currentTable, newRecord);

		const currentTableData = $collectionsData[$currentTable];

		const newTableData = [...currentTableData, newRecord];
		newTableData.sort((record1, record2) => Utils.workoutLogComparator(record1, record2));

		collectionsData.update((prev) => ({...prev, [$currentTable]: newTableData}));
	}


	// Sends the user to the page for the passed in item
	const goToItem = (id) => {
		console.log("Going to: " + `/userdash/posts/${$currentTable}/${id}`);
		goto(`/userdash/posts/${$currentTable}/${id}`);
	}


	// Filter for the data in the current collection by name
	let filterDate = "";

	$: {
		collectionData = $collectionsData[$currentTable];

		if (filterDate !== "") {
			collectionData = $collectionsData[$currentTable].filter(
				(record) => record.name.includes(filterDate)
			);
		} 
	} 
</script>

<!-- Keybind event listeners -->
<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<!-- Modals -->
<NewMealLogModal bind:name={mealLogName} bind:eatenAt={mealLogEatenAt} callback={mealLogModalCallback}/>

<DeleteItemModal callback={deleteCallback} bind:itemToDelete/>

<UserdashInformation/>


<!-- Header -->
<header class="bg-transparent py-3 px-5">
<h1 class="bg-transparent text-xl md:text-3xl font-black">Modern Fit <iconify-icon icon="mdi:weight-lifter"/></h1>
<p class="bg-transparent text-lg md:text-2xl font-medium">
	{$currentTable.split("_").map((x) => {return x[0].toUpperCase() + x.substring(1, x.length)}).join(" ")}
</p>
</header>
<NotificationCentre/>


<!-- Main Content -->
<div class="drawer flex-grow">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerChecked}>
    <div class="drawer-content h-full flex flex-col">
            <div class="w-screen flex flex-col bg-transparent flex-grow flex-shrink-0 justify-center items-center h-full">
				<div class="flex items-center justify-center flex-col md:flex-row gap-4 lg:w-2/4">
					<h1>Search for a specific entry by name:</h1>
					<input type="text" placeholder="e.g. 2023" class="w-fit px-4 rounded-lg p-2" bind:value={filterDate}/>
				</div>
                {#if isMobile}
                    <!-- Mobile View -->
                    <div class="md:hidden flex snap-x snap-mandatory overflow-x-auto p-4 space-x-4 w-screen h-full" >
						{#if $currentTable === "meal_log" || ($currentTable === "workout_log" && !todaysWorkoutLogExists)}
							<MobileItem clickEvent={startNewRecordRequest} title={newLogTitle} subtitle={newLogSubtitle} button="Create" from="from-green-500" to="to-emerald-600"/>
						{/if}
						{#each collectionData as record} 
							{#if record.name === new Date().toLocaleDateString() && $currentTable === "workout_log"}
								<MobileItem clickEvent={() => goToItem(record.id)} deleteEvent={() => {showDeleteItemModal(record)}} title={record.name} subtitle={record.subtitle} from="from-green-500" to="to-emerald-600"/>
							{:else if $currentTable.split("_")[1] === "log"}
								<MobileItem clickEvent={() => goToItem(record.id)} deleteEvent={() => {showDeleteItemModal(record)}} title={record.name} subtitle={record.subtitle}/>
							{:else}
								<MobileItem clickEvent={() => goToItem(record.id)} title={record.name} subtitle={record.subtitle}/>
							{/if}
						{/each}
                    </div>
                {:else}
                    <!-- Desktop View -->
                    <div class="flex flex-wrap items-center justify-center h-fit rounded-xl overflow-y-auto gap-7 p-5" >
						{#if $currentTable === "meal_log" || ($currentTable === "workout_log" && !todaysWorkoutLogExists)}
							<DesktopItem clickEvent={startNewRecordRequest} title={newLogTitle} subtitle={newLogSubtitle} button="Create" from="from-green-500" to="to-emerald-600"/>
						{/if}
						{#each collectionData as record}
							{#if record.name === new Date().toLocaleDateString() && $currentTable === "workout_log"}
								<DesktopItem clickEvent={() => goToItem(record.id)} deleteEvent={() => {showDeleteItemModal(record)}} title={record.name} subtitle={record.subtitle} from="from-green-500" to="to-emerald-600"/>
							{:else if $currentTable.split("_")[1] === "log"}
								<DesktopItem clickEvent={() => goToItem(record.id)} deleteEvent={() => {showDeleteItemModal(record)}} title={record.name} subtitle={record.subtitle}/>
							{:else}
								<DesktopItem clickEvent={() => goToItem(record.id)} title={record.name} subtitle={record.subtitle}/>
							{/if}
						{/each}
                    </div>
                {/if}
            </div>
    </div>
    <div class="drawer-side">
        <label
            for="my-drawer"
            aria-label="close sidebar"
            class="drawer-overlay"
        />
        <ul class="menu p-4 w-full md:w-72 min-h-screen h-full bg-gradient-to-t from-gray-800 to-gray-950 md:border-r border-r-white text-base-content flex flex-col items-start">
            <!-- Sidebar content here -->
			<h1 class="px-1 bg-transparent text-xl md:text-3xl font-black mt-1 mb-5">Modern Fit <iconify-icon icon="mdi:weight-lifter"/></h1>
			{#if data.user}
				<span class="inline-flex items-center justify-center gap-2 mb-5 px-1">
					<img src={data.user.avatar} alt="Avatar" class="w-8 h-8 rounded-full border border-white" />
					<h1 class="text-md font-medium">{data.user.first_name + " " + data.user.surname}</h1>
				</span>
			{/if}
            <li><button class:active ={$currentTable === "workout_log"} on:click={() => currentTable.set("workout_log")}>Workout Log</button></li>
            <li><button class:active ={$currentTable === "workout_plan"} on:click={() => currentTable.set("workout_plan")}>Workout Plans</button></li>
            <li><button class:active ={$currentTable === "meal_log"} on:click={() => currentTable.set("meal_log")}>Meal Log</button></li>
            <li><button class:active ={$currentTable === "meal_plan"} on:click={() => currentTable.set("meal_plan")}>Meal Plans</button></li>
        </ul>
    </div>
</div>

<span class="inline-flex fixed bottom-6 left-5 md:bottom-10 md:left-3 z-10 gap-3 h-[3.5rem]">
<label  id="drawer-activate" for="my-drawer" class="h-full btn btn-primary bg-white text-black hover:text-white hover:bg-black drawer-button z-10 p-4 rounded-lg cursor-pointer border-none">
	{menuString}
</label>

<span class="tooltip" data-tip="Information">
<button on:click={() => document.getElementById("userdash-information-modal").showModal()} class="h-full btn btn-primary bg-white text-black hover:text-white hover:bg-black p-4 rounded-lg cursor-pointer border-none text-2xl inline-flex justify-center items-center"><iconify-icon icon="mdi:information"/></button>
</span>
		
</span>
