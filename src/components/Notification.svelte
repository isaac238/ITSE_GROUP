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
	const classString = "w-[25%] alert mx-5 mt-5 shadow-md";

	const isSuccess = type == "success";
	const isWarning = type == "warning";
	const isError = type == "error";
	let icon;

	if (isError) icon = "mdi:close-circle-outline";
	if (isWarning) icon = "typcn:warning-outline";
	if (isSuccess) icon = "mdi:check-circle-outline";

	timer();

</script>

<!-- Render -->

<div role="alert" class="w-[25%] alert mx-5 mt-5 shadow-md"
class:alert-error={isError}
class:alert-warning={isWarning}
class:alert-success={isSuccess}>
	<iconify-icon class="text-2xl" icon={icon}/>
    <span>{type[0].toUpperCase() + type.substring(1, type.length)}: {message}</span>
    <button on:click={() => callback()}><iconify-icon  icon="mdi:remove-bold"/></button>
</div>
