<script>
    import PasswordInput from "./PasswordInput.svelte";

	export let name;
	export let placeholder;
	export let type;
	export let value = "";
	export let required = false;
	export let max = "";

	const setRequired = (node) => {
		node.required = required
	}
</script>

<label for={name} class="flex flex-col gap-2">
	<span class="text-sm tracking-normal w-full">{placeholder} <span class="text-red-400">*</span></span>
	{#if type == "password"}
		<PasswordInput name={name} bind:value placeholder={placeholder} required={true} />
	{:else}
		<input id={name} max={max} type={type} use:setRequired on:input={(e) => value = e.target.value} placeholder={placeholder} name={name} class="w-full input input-bordered focus:outline focus:outline-1 focus:outline-white focus:border-none focus:ring-0" />
	{/if}
</label>
