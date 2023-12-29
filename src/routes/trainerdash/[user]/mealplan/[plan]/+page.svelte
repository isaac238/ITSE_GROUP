<script>
    import { writable } from "svelte/store";
    import MealPlanFooditem from '../../../../../components/MealPlanFooditem.svelte';
    export let data;

    const mealPlanData = writable(data.mealPlans);
</script>


<div class="w-full h-full bg-transparent">
    {#each $mealPlanData as mealPlan }
    <h1 class="text-2xl text-center text-white my-10">{mealPlan.name}</h1>
        {#each mealPlan.expand.foods as food}
          <MealPlanFooditem {food} bind:complete={food.complete}/>  
        {/each}
    {/each}
</div>