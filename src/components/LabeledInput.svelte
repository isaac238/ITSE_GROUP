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
	{:else if type == "email"}
		<input id={name} type={type} use:setRequired pattern="([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)" on:input={(e) => value = e.target.value} placeholder={placeholder} name={name} class="w-full input input-bordered focus:outline focus:outline-1 focus:outline-white focus:border-none focus:ring-0" />
	{:else}
		<input id={name} max={max} type={type} use:setRequired on:input={(e) => value = e.target.value} placeholder={placeholder} name={name} class="w-full input input-bordered focus:outline focus:outline-1 focus:outline-white focus:border-none focus:ring-0" />
	{/if}
</label>
