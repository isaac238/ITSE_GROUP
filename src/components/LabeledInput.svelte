<script>
    import PasswordInput from "./PasswordInput.svelte";

	export let name;
	export let placeholder;
	export let type;
</script>

<label class="flex flex-col gap-2">
	<span class="text-sm tracking-normal w-full">{placeholder}</span>
	{#if type == "password"}
		<PasswordInput name={name} placeholder={placeholder} />
	{:else}
		<input type={type} placeholder={placeholder} name={name} class="w-full input input-bordered" />
	{/if}
</label>
