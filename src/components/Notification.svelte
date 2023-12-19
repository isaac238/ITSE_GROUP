<script>
	// imports

    // Libraries
    import "iconify-icon";

    // exports
	export let notification;
    export let callback = "";
    export let timer = "";

	// Variables
	const type = notification.type;
	const message = notification.message;

	const icon =
		(type == "success")
			? "mdi:check-circle-outline"
			: (type == "warning")
					? "typcn:warning-outline" 
				: (type == "error")
					? "mdi:close-circle-outline"
					: "";

	timer();

</script>

<!-- Render -->

<div role="alert" class={`w-[25%] alert alert-${type} mx-5 mt-5 shadow-md `}>
	<iconify-icon class="text-2xl" icon={icon}/>
    <span>{type[0].toUpperCase() + type.substring(1, type.length)}: {message}</span>
    <button on:click={() => callback()}><iconify-icon  icon="mdi:remove-bold"/></button>
</div>
