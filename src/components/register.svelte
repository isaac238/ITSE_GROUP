<script>
  import "iconify-icon";

  let type = "password";
  let icon = "mdi:eye-off-outline";

  const toggleType = (event) => {
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

<div class="w-screen h-screen flex items-center justify-center">
  <form method="post" class="card w-[25%] bg-neutral-900 p-10">
      <h1 class="text-2xl font-bold mb-8">Register</h1>
      <div class="form-control gap-2 mb-4">
          <input type="email" placeholder="Email" name="email" class="input input-bordered">
          <input type="date" name="birthdate" class="input input-bordered">
          <input type="{type}" name="password" placeholder="Password" class="input input-bordered">
          <input type="{type}" name="confirm-password" placeholder="Confirm Password" class="input input-bordered">

          <button id="toggleButton" type="button" on:click={toggleType}><iconify-icon {icon}/></button>
          <button class="btn hover:bg-secondary text-white bg-slate-700" type="submit">Register</button>
      </div>
  </form>

</div>