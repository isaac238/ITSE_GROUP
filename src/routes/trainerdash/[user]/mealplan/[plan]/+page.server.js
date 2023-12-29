import Collections from "$lib/server/collections";

export async function load({locals, params}) {
    const planId = params.plan;
    const collections = new Collections(locals.pb);
    const mealPlans = await collections.getAllRecords("meal_plan", `id = '${planId}'`);

    return { user: locals.user, mealPlans };
}