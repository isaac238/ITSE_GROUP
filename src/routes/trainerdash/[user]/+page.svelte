<script>
    // Imports
    import { enableCache } from 'iconify-icon';
    import { writable } from 'svelte/store';
    
    // Component Imports
    import User from '../../../components/User.svelte';
    import NewPlanModal from '../../../components/NewPlanModal.svelte';

    // Props
    export let data;

    // Variables
    const workoutPlans = writable(data.workoutPlans);
    const mealPlans = writable(data.mealPlans);
    const user = writable(data.userId);
    
	const emptyPlanState = {
		type: "",
        step: 0,
		name: "",
		trainer: data.user.id,
		user: data.userId,
		plan_date: "",
	}
    
    let newPlanState = structuredClone(emptyPlanState);

    const showNewPlanModal = () => {
        newPlanState = structuredClone(emptyPlanState);
        const modal = document.getElementById('new-plan-modal');
        modal.showModal()
    }
    
    const newPlanModalCallback = async (response) => {
        if (!response.ok) return;
        const responseJSON = await response.json()

        if (newPlanState.type == "meal_plan") {
            mealPlans.update((prevVal) => [...prevVal, responseJSON])
        }
        
        if (newPlanState.type == "workout_plan") {
            workoutPlans.update((prevVal) => [...prevVal, responseJSON])
        }
    }

</script>

<NewPlanModal bind:newPlanState callback={newPlanModalCallback}/>

<div class="w-screen h-fit flex flex-col items-center">
    <h1 class="text-2xl text-white w-fit m-auto mt-10">Workout Plans:</h1>
    {#each $workoutPlans as workoutPlan (workoutPlan.id)}
        <div class="w-[95%] h-[6rem] mt-10 bg-white rounded-xl flex items-center justify-center">
            <User name="{workoutPlan.name}" link="{$user}/workoutplan/{workoutPlan.id}"/>
        </div>
    {/each}   
    <h1 class="text-2xl text-white w-fit m-auto mt-10">Meal Plans:</h1>
    {#each $mealPlans as mealPlan (mealPlan.id)}
        <div class="w-[95%] h-[6rem] mt-10 bg-white rounded-xl flex items-center justify-center">
            <User name="{mealPlan.name}" link="{$user}/mealplan/{mealPlan.id}"/>
        </div>
    {/each}   
</div>

<button class="btn btn-primary" on:click={() => showNewPlanModal()}>Add</button>