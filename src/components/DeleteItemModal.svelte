<script>
	// Imports
	import "iconify-icon";
	import Utils from "$lib/utils.js"

	// Props
	export let callback;
	export let itemToDelete;

	async function sendDeleteRequest() {
		const requestBody = {
			"collection": itemToDelete.collectionName,
			"id": itemToDelete.id,
		};

		const deleteResponse = await Utils.sendPostRequest("/api/record/delete", requestBody);
		const deleteResponseJSON = await deleteResponse.json();
		callback(deleteResponseJSON);
	}
</script>

<!-- Renders -->
<dialog id="delete-item-modal" class="modal">
	<div class="modal-box bg-gradient-to-b from-gray-800 to-gray-950">
		<h2 class="text-xl text-white">Are you sure you want to <span class="font-semibold text-red-500">delete</span> this item?</h2>
		<div class="modal-action">
		<form method="dialog" class="flex gap-4">
			<button class="btn btn-primary bg-red-500 text-white hover:text-white hover:bg-red-800 rounded-lg cursor-pointer border-none text-md" type="submit" on:click={sendDeleteRequest}>Delete</button>
			<button class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md" type="submit">Cancel</button>
		</form>
		</div>
	</div>
	<form class="modal-backdrop" method="dialog">
		<button>close</button>
	</form>
</dialog>
