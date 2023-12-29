<script>
    import { writable } from "svelte/store";
    import MealPlanFooditem from '../../../../../components/MealPlanFooditem.svelte';
    export let data;

    const workoutPlanData = writable(data.workoutPlans);
</script>


<div class="w-full h-full bg-black">
    {#each $workoutPlanData as workoutPlan}
        {#each workoutPlan.expand.cardio_workouts as cardioWorkout}

            <h1>{cardioWorkout.exercise}</h1>
        {/each}
    {/each}

    <!-- {#each $mealPlanData as mealPlan }
        {#each mealPlan.expand.foods as food}
          <MealPlanFooditem {food} bind:complete={food.complete}/>  
        {/each}
    {/each} -->
</div>