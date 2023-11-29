<script>
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import Nav from "../../components/nav.svelte";
    import MobileItem from "../../components/MobileItem.svelte";
    import DesktopItem from "../../components/DesktopItem.svelte";

    export let data; //Importing data so page isn't static, for route guarding (DO NOT DELETE)..

    const screenWidth = writable(0);

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

    $: isMobile = $screenWidth < 768;
</script>

<div class="w-screen h-screen flex flex-col items-center bg-transparent">
    <div class="flex justify-center w-full">
        {#if isMobile}
            <!-- Mobile View -->
            <div
                class="md:hidden flex snap-x snap-mandatory overflow-x-auto p-4 space-x-4 bg-neutral w-screen h-screen"
            >
                <MobileItem
                    title="Weight Workout"
                    subtitle="Monday Workout Plan with Weights, involving back."
                    description="Back and arms split."
                />
                <MobileItem
                    title="Component Title"
                    subtitle="Subtitle"
                    description="description"
                />
                <MobileItem
                    title="Component Title"
                    subtitle="Subtitle"
                    description="description"
                />
                <MobileItem
                    title="Component Title"
                    subtitle="Subtitle"
                    description="description"
                />
            </div>
        {:else}
            <!-- Desktop View -->
            <div
                class="flex flex-wrap items-center w-4/6 h-5/6 rounded-xl overflow-y-auto gap-7 p-4"
            >
                <DesktopItem
                    title="Title"
                    subtitle="Subtitle"
                    description="Description"
                />
                <DesktopItem
                    title="Title"
                    subtitle="Subtitle"
                    description="Description"
                />
                <DesktopItem
                    title="Title"
                    subtitle="Subtitle"
                    description="Description"
                />
                <DesktopItem
                    title="Title"
                    subtitle="Subtitle"
                    description="Description"
                />
            </div>
        {/if}
    </div>
</div>
