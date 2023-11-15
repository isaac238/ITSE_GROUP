<script>
  import "iconify-icon";

  export let name;
  export let placeholder;

  let type = "password";
  let icon = "mdi:eye-off-outline";

  const toggleType = () => {
    switch (type) {
      case "password":
        type = "text";
        icon = "mdi:eye-outline";
        break;
      case "text":
        type = "password";
        icon = "mdi:eye-off-outline";
        break;
      default:
        break;
    }
  };
</script>

<span class="flex items-center input input-bordered p-1 focus-within:outline-1 focus-within:outline-white">
	<input {type} {name} {placeholder} id={name} class="bg-transparent border-none w-full focus:border-none focus:ring-0">
	<button id="toggleButton" type="button" class="px-4 text-gray-500 focus:border-none focus:ring-0" on:click={toggleType}><iconify-icon {icon}/></button>
</span>
