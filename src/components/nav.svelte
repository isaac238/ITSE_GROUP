<script>
	// Imports
	import 'iconify-icon';

	// Exports
	export let user;

	// Variables
	const isTrainer = user ? user.role.includes("trainer") : false;
	const isMember = user ? user.role.includes("member") : false;
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
  <div class="navbar-end">
  </div>
</div>
