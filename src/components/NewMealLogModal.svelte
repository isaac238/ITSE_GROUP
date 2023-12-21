<script>
	import LabeledInput from "./LabeledInput.svelte";
	import "iconify-icon";

	export let eatenAt;
	export let name;
	export let callback;
	$: console.log(eatenAt);

	const handleSubmit = () => {
		console.log(name);
		console.log(eatenAt);
		if (name !== "" && eatenAt !== "") {
			callback();
			document.getElementById("cancelButton").click();
		} 
	}
</script>

<div class="modal-box bg-gradient-to-b from-gray-800 to-gray-950">
	<h2 class="text-xl text-white">New: <span class="font-semibold">Meal Log</span></h2>
	<div class="flex flex-col gap-2 p-5">
	<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
		<LabeledInput placeholder="Name" name="Name" type="text" bind:value={name} required={true}/>
		<LabeledInput placeholder="Eaten At" name="EatenAt" type="datetime-local" bind:value={eatenAt} required={true}/>
		<button type="submit" class="hidden" id="formSubmit"></button>
	</form>
	</div>
	<div class="modal-action">
	<button id="doneButton" class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md" type="submit" on:click={() => document.getElementById("formSubmit").click()}>Done</button>
	<form method="dialog" class="flex gap-4">
		<button id="cancelButton" class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md" aria-label="cancel">Cancel</button>
	</form>
	</div>
</div>
<form class="modal-backdrop" method="dialog">
	<button>close</button>
</form>
