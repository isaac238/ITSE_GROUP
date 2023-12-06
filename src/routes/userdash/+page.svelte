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
	console.log(collectionData);
	$: collectionData = data.collectionsData[$currentTable];

    onMount(() => {
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);
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

	function onKeyUp(e) {
		hasActivated = false;
	}

	function onKeyDown(e) {
		const drawer = document.querySelector(".drawer-toggle");

		if (e.key === "Escape" && !hasActivated) {
			drawer.checked = !drawer.checked;
			hasActivated = true;
		}
	}

    $: isMobile = $screenWidth < 768;
</script>

<span class="inline-flex fixed bottom-10 left-8 z-10 gap-3">
<label id="drawer-activate" for="my-drawer" class="btn btn-primary bg-white text-black hover:text-white hover:bg-black drawer-button z-10 px-4 py-2 rounded-lg cursor-pointer border-none"> Menu </label>
<button id="new-record" class="btn btn-primary bg-white text-black hover:text-white hover:bg-black px-4 py-2 rounded-lg cursor-pointer border-none text-2xl"><iconify-icon icon="mdi:create-new-folder"/></button>
<button id="new-record" class="btn btn-primary bg-white text-black hover:text-white hover:bg-black px-4 py-2 rounded-lg cursor-pointer border-none text-2xl"><iconify-icon icon="mdi:information"/></button>
</span>

<div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
		<h1 class="p-4 text-3xl font-bold">{$currentTable.split("_").map((x) => {return x[0].toUpperCase() + x.substring(1, x.length)}).join(" ")}</h1>
        <div class="w-screen flex flex-col items-center justify-center bg-transparent">
            <div class="flex justify-center items-center w-full">
                {#if isMobile}
                    <!-- Mobile View -->
                    <div class="md:hidden flex snap-x snap-mandatory overflow-x-auto p-4 space-x-4 bg-neutral w-screen" >
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
        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col items-start">
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
