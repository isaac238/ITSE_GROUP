<script>
	// Imports
	import 'iconify-icon';

	// Exports
	export let user;
	export let pin;

	// Variables
	const isTrainer = user ? user.role.includes("trainer") : false;
	const isMember = user ? user.role.includes("member") : false;
	let showPin = false;
	let icon;
	let pinText;
	$: icon = showPin ? "mdi:eye-outline" : "mdi:eye-off-outline";
	$: pinText = showPin ? pin : "*******";

	function showPinRevealModal() {
		const modal = document.getElementById("pin-reveal-modal");
		modal.showModal();
	}
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a href="/">Home</a></li>

		{#if !user}
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
		{/if}

		{#if user}
			<li><a href="/logout">Logout</a></li>
			{#if isTrainer}
				<li><a href="/trainerdash">Trainer Dashboard</a></li>
			{/if}

			{#if isMember}
				<li><a href="/userdash">User Dashboard</a></li>
			{/if}
		{/if}
      </ul>
    </div>
  </div>
  <div class="navbar-center">
    <a href="/" class="btn btn-ghost text-xl">ModernFit Gym<iconify-icon icon="mdi:weight-lifter"/></a>
  </div>
  <div class="navbar-end mr-2">
	{#if user}
		<div class="hidden md:inline-flex justify-center items-center">
			<iconify-icon icon="mdi:keypad" class="text-2xl mr-2" />
			<button aria-label="Reveal Pin" on:click={() => showPin = !showPin} class="inline-flex bg-base-300 p-2 rounded-lg items-center justify-center hover:shadow-lg hover:scale-110">
				<h1>{pinText}</h1>
			</button>
		</div>

		<div class="inline-flex md:hidden justify-center items-center">
			<button aria-label="Reveal Pin" on:click={() => showPinRevealModal()} class="btn btn-ghost btn-circle inline-flex p-2 items-center justify-center hover:shadow-lg hover:scale-110">
				<iconify-icon class="text-lg" icon="mdi:keypad" />
			</button>
		</div>
	{/if}
  </div>
</div>

<dialog id="pin-reveal-modal" class="modal">
	<div class="modal-box bg-gradient-to-b from-gray-800 to-gray-950 flex flex-col gap-2">
		<h1 class="text-3xl text-white font-bold">Your Pin is: {pin}</h1>
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
