<script>
    // imports
	import "iconify-icon";

    // exports    
    export let message;
    export let callback = "";
    export let timer = "";
    
    timer();
</script>

<div role="alert" class="alert alert-error border-1 border-[#a53f3f] m-2 shadow-md">
    <svg  xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Error! {message}</span>
    <iconify-icon on:click={callback} icon="mdi:remove-bold"></iconify-icon>
  </div>