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
	const classString = "w-[25%] alert mx-5 mt-5 shadow-md alert-" + type;
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

<div role="alert" class={classString}>
	<iconify-icon class="text-2xl" icon={icon}/>
    <span>{type[0].toUpperCase() + type.substring(1, type.length)}: {message}</span>
    <button on:click={() => callback()}><iconify-icon  icon="mdi:remove-bold"/></button>
</div>
