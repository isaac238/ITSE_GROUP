import Collections from "$lib/server/collections";

export async function load({locals, params}) {
    const userId = params.user;
    const collections = new Collections(locals.pb);
    const workoutPlans = await collections.getAllRecords("workout_plan", `user.id = '${userId}'`);
    const mealPlans = await collections.getAllRecords("meal_plan", `user.id = '${userId}'`);

    return { user: locals.user, workoutPlans, mealPlans, userId };
}