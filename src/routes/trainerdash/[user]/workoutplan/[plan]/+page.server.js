import Collections from "$lib/server/collections";

export async function load({locals, params}) {
    const planId = params.plan;
    const collections = new Collections(locals.pb);
    const workoutPlans = await collections.getRecord("workout_plan", planId);

    return { user: locals.user, workoutPlans };
}
