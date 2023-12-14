<script>
	// imports
    import "iconify-icon";

    // exports
    export let message;
    export let callback = ""
    export let timer = ""

    timer();
</script>

<div role="alert" class="alert alert-success " >
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Success: {message}</span>
    <button on:click={callback(this)}><iconify-icon  icon="mdi:remove-bold" class="p-2"/></button>

  </div>