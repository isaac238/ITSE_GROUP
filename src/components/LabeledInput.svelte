<script>
	// imports

	// Components
    import PasswordInput from "./PasswordInput.svelte";

	// exports
	export let name;
	export let placeholder;
	export let type;
	export let value = "";
	export let required = false;
	export let max = "";
	export let step = "";
	export let min = "";
	
	let input = undefined;

	const setRequired = (node) => {
		node.required = required
	}

	$: if (type != "password" && input != undefined && input.value != value) { input.value = value; }
	
</script>

<!-- Render -->

<label for={name} class="flex flex-col gap-2">
	<span class="text-sm tracking-normal w-full">{placeholder}<span class="text-red-400">*</span></span>
	{#if type == "password"}
		<PasswordInput name={name} bind:value placeholder={placeholder} required={true} />
	{:else}
		<input bind:this={input} id={name} max={max} min={min} step={step} type={type} use:setRequired on:change={() => {value = input.value}} on:input={() => {value = input.value}} placeholder={placeholder} name={name} class="w-full input input-bordered focus:outline focus:outline-1 focus:outline-white focus:border-none focus:ring-0" />
	{/if}
</label>
