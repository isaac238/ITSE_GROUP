<script>
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import MobileItem from "../../components/MobileItem.svelte";
    import DesktopItem from "../../components/DesktopItem.svelte";
	import "iconify-icon";

    export let data; //Importing data so page isn't static, for route guarding (DO NOT DELETE)..

    const screenWidth = writable(0);

	const currentTable = writable("workout_log");

	let collectionData = data.collectionsData[$currentTable];
	$: collectionData = data.collectionsData[$currentTable];

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

	let hasActivated = false;

	function onKeyUp() {
		hasActivated = false;
	}

	function onKeyDown(e) {
		if (e.key === "Escape" && !hasActivated) {
			drawerChecked = !drawerChecked;
			hasActivated = true;
		}
	}


	$: menuString = (drawerChecked) ? "Close" : "Menu";

    $: isMobile = $screenWidth < 768;
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<span class="inline-flex fixed bottom-5 left-5 md:bottom-10 md:left-8 z-10 gap-3">
<label  id="drawer-activate" for="my-drawer" class="btn btn-primary bg-white text-black hover:text-white hover:bg-black drawer-button z-10 px-4 py-2 rounded-lg cursor-pointer border-none">
	{menuString}
</label>
<button id="new-record" class="btn btn-primary bg-white text-black hover:text-white hover:bg-black px-4 py-2 rounded-lg cursor-pointer border-none text-2xl"><iconify-icon icon="mdi:create-new-folder"/></button>
<button id="new-record" class="btn btn-primary bg-white text-black hover:text-white hover:bg-black px-4 py-2 rounded-lg cursor-pointer border-none text-2xl"><iconify-icon icon="mdi:information"/></button>
</span>

<div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerChecked}>
    <div class="drawer-content min-h-screen flex flex-col">
		<h1 class="py-3 px-4 md:p-4 bg-transparent text-xl md:text-3xl font-bold">{$currentTable.split("_").map((x) => {return x[0].toUpperCase() + x.substring(1, x.length)}).join(" ")}</h1>
		<div class="w-screen flex flex-col items-center justify-center bg-transparent flex-grow flex-shrink-0">
            <div class="flex justify-center items-center w-full h-full">
                {#if isMobile}
                    <!-- Mobile View -->
                    <div class="md:hidden flex snap-x snap-mandatory overflow-x-auto p-4 space-x-4 w-screen h-full" >
					{#each collectionData as record} 
						<MobileItem title={record.name} subtitle={record.subtitle}/>
						<MobileItem title={record.name} subtitle={record.subtitle}/>
						<MobileItem title={record.name} subtitle={record.subtitle}/>
						<MobileItem title={record.name} subtitle={record.subtitle}/>
						<MobileItem title={record.name} subtitle={record.subtitle}/>
						<MobileItem title={record.name} subtitle={record.subtitle}/>
					{/each}
                    </div>
                {:else}
                    <!-- Desktop View -->
                    <div class="flex flex-wrap items-center w-[82rem] h-[63rem] rounded-xl overflow-y-auto gap-7 p-4" >
					{#each collectionData as record}
						<DesktopItem title={record.name} subtitle={record.subtitle}/>
						<DesktopItem title={record.name} subtitle={record.subtitle}/>
						<DesktopItem title={record.name} subtitle={record.subtitle}/>
						<DesktopItem title={record.name} subtitle={record.subtitle}/>
						<DesktopItem title={record.name} subtitle={record.subtitle}/>
						<DesktopItem title={record.name} subtitle={record.subtitle}/>
					{/each}
                    </div>
                {/if}
            </div>
		</div>
    </div>
    <div class="drawer-side">
        <label
            for="my-drawer"
            aria-label="close sidebar"
            class="drawer-overlay"
        />
        <ul class="menu p-4 w-full md:w-72 min-h-screen h-full bg-gradient-to-t from-gray-800 to-gray-950 border-r border-r-white text-base-content flex flex-col items-start">
            <!-- Sidebar content here -->
			{#if data.user}
				<span class="inline-flex items-center justify-center gap-2 mb-5 mt-5 px-4">
					<img src={data.user.avatar} alt="Avatar" class="w-8 h-8 rounded-full border border-white" />
					<h1 class="text-md font-medium">{data.user.first_name + " " + data.user.surname}</h1>
				</span>
			{/if}
            <li><button on:click={() => currentTable.set("workout_log")}>Workout Log</button></li>
            <li><button on:click={() => currentTable.set("workout_plan")}>Workout Plans</button></li>
            <li><button on:click={() => currentTable.set("meal_log")}>Meal Log</button></li>
            <li><button on:click={() => currentTable.set("meal_plan")}>Meal Plans</button></li>
        </ul>
    </div>
</div>
