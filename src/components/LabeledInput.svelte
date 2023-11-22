<script>
    import PasswordInput from "./PasswordInput.svelte";

	export let name;
	export let placeholder;
	export let type;
</script>

<label for={name} class="flex flex-col gap-2">
	<span class="text-sm tracking-normal w-full">{placeholder} <span class="text-red-400">*</span></span>
	{#if type == "password"}
		<PasswordInput name={name} placeholder={placeholder} required />
	{:else if type == "email"}
	<input id={name} type={type} pattern=".+@example\.com" placeholder={placeholder} name={name} class="w-full input input-bordered focus:outline focus:outline-1 focus:outline-white focus:border-none focus:ring-0" required />

	{:else}
		<input id={name} type={type} placeholder={placeholder} name={name} class="w-full input input-bordered focus:outline focus:outline-1 focus:outline-white focus:border-none focus:ring-0" required />
	{/if}
</label>
