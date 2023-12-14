<script>
    // imports 
	import "iconify-icon";

    // exports
    export let message;
    export let callback;
    export let timer;

    timer();
</script>
<div role="alert" class="alert alert-warning position:absolute">
    <svg  xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span>Warning: {message}</span>
    <iconify-icon on:click={callback} icon="mdi:remove-bold"/>

  </div>