<script>
	import "iconify-icon";
</script>

<dialog id="userdash-information-modal" class="modal">
	<div class="modal-box bg-gradient-to-b from-gray-800 to-gray-950 flex flex-col gap-2">
		<h1 class="text-3xl text-white font-bold">Userdash Information</h1>
		<p class="text-xl text-white">The userdash is a dashboard with links to all your gym needs: Workout Logs, Workout Plans, Meal Logs and Meal Plans!</p>
		<h3 class="text-xl text-white font-semibold mt-4">Tips</h3>
		<p>Click on the <span class="font-bold">MENU</span> button to open the sidebar and navigate the dashboard.</p>
		<p>Click on the <span class="font-bold">CREATE</span> button to create a new log.</p>
		<p>After clicking <span class="font-bold">VIEW</span> you can see the workouts / foods in any trainer assigned plans or add / remove workouts and foods from your own logs.</p>
		<h3 class="text-xl text-white font-semibold mt-4">Keybinds</h3>
		<ul>
			<li> <span class="font-bold">M</span>   : Open the menu</li>
			<li> <span class="font-bold">ESC</span> : Exit a modal</li>
		</ul>
		<div class="modal-action">
		<form method="dialog" class="flex gap-4">
			<button class="btn btn-primary bg-white text-black hover:text-white hover:bg-black rounded-lg cursor-pointer border-none text-md" type="submit">Close</button>
		</form>
		</div>
	</div>
	<form class="modal-backdrop" method="dialog">
		<button>close</button>
	</form>
</dialog>
