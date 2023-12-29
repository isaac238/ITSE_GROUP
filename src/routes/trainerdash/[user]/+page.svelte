<script>
    import { enableCache } from 'iconify-icon';
    import { writable } from 'svelte/store';
    import User from '../../../components/User.svelte';

    export let data;

    const workoutPlans = writable(data.workoutPlans);
    const mealPlans = writable(data.mealPlans);
    const user = writable(data.userId);

</script>

<div class="w-screen h-fit flex flex-col items-center">
    <h1 class="text-2xl text-white w-fit m-auto mt-10">Workout Plans:</h1>
    {#each $workoutPlans as workoutPlan}
        <div class="w-[95%] h-[6rem] mt-10 bg-white rounded-xl flex items-center justify-center">
            <User name="{workoutPlan.name}" link="{$user}/workoutplan/{workoutPlan.id}"/>
        </div>
    {/each}   
    <h1 class="text-2xl text-white w-fit m-auto mt-10">Meal Plans:</h1>
    {#each $mealPlans as mealPlan}
        <div class="w-[95%] h-[6rem] mt-10 bg-white rounded-xl flex items-center justify-center">
            <User name="{mealPlan.name}" link="{$user}/mealplan/{mealPlan.id}"/>
        </div>
    {/each}   
</div>