<script>
    import { writable } from "svelte/store";
    import { onMount } from "svelte";

    let workout;

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

{#if isMobile}
    <div class="w-screen h-screen bg-black">
        <div class="w-screen h-[7vh] flex items-center justify-center">
            <h1 class="max-w-screen text-2xl text-white font-semibold">
                Workout Name
            </h1>
        </div>

        <div
            class="w-screen h-[93vh] overflow-y-scroll bg-slate-700 flex items-center flex-col"
        >
            <div
                class="relative w-[90vw] h-[5rem] my-3 p-5 mx-auto flex items-center bg-gradient-to-r from-blue-400 to-blue-700 text-white shadow-lg rounded-lg gap-4"
            >
                <h1 class="text-lg">Workout Name</h1>
                <h1 class="text-lg">5x10</h1>
                <h1 class="text-lg">40kg</h1>
                <input
                    type="checkbox"
                    checked="checked"
                    class="checkbox ml-auto"
                />
            </div>

			<!-- This is the log button, it goes below all conditionals. Do not include it in any svelte conditionals.-->

            <button class="btn btn-primary w-[90vw] h-[4rem] my-3 shadow-lg absolute bottom-0">Log Workout</button>

            <!-- {#each workout as item}
                {#if item.type == "Weight"}
                    <div
                        class="w-[90vw] h-[5rem] my-3 p-5 mx-auto flex items-center bg-gradient-to-r from-blue-400 to-blue-700 text-white shadow-lg rounded-lg gap-4"
                    >
                        <h1 class="text-lg">{item.name}</h1>
                        <h1 class="text-lg">{item.reps}{item.sets}</h1>
                        <h1 class="text-lg">{item.weight}</h1>
                        <input
                            type="checkbox"
                            checked="checked"
                            class="checkbox ml-auto"
                        />
                    </div>
                    <button
                        class="btn btn-primary w-[90vw] mx-auto h-[4rem] mt-3 shadow-lg"
                        >Log Workout</button
                    >
                {:else}
                    <div
                        class="w-[90vw] h-[5rem] my-3 p-5 mx-auto flex items-center bg-gradient-to-r from-red-400 to-red-700 text-white shadow-lg rounded-lg gap-4"
                    >
                        <h1 class="text-lg">{item.name}</h1>
                        <h1 class="text-lg">{item.time}{item.sets}</h1>
                        <h1 class="text-lg">{item.distance}</h1>
                        <input
                            type="checkbox"
                            checked="checked"
                            class="checkbox ml-auto"
                        />
                    </div>
                    <button
                        class="btn btn-primary w-[90vw] mx-auto h-[4rem] mt-3 shadow-lg"
                        >Log Workout</button
                    >
                {/if}
            {/each} -->
        </div>
    </div>
{/if}
