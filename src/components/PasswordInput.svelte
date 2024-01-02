<script>
  
  // imports
  
  // Libraries
  import "iconify-icon";
  

  // exports
  export let name;
  export let placeholder;
  export let value = "";
  export let required = false;

  //

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

	const setRequired = (node) => {
		node.required = required
	}
</script>

<span class="flex items-center input input-bordered p-1 focus-within:outline-1 focus-within:outline-white">
	<input use:setRequired {type} {name} {placeholder} id={name} on:input={(e) => value = e.target.value} class="bg-transparent border-none w-full focus:border-none focus:ring-0">
	<button id="toggleButton" type="button" class="px-4 text-gray-500 focus:border-none focus:ring-0" on:click={toggleType}><iconify-icon {icon}/></button>
</span>
