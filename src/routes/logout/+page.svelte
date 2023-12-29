<script>
import { invalidateAll } from "$app/navigation";
import { goto } from "$app/navigation";
import { onMount } from "svelte";

export let data;

onMount(() => {
	if (data.success) goto('/login').then(() => invalidateAll());
	else goto('/');
});
</script>
