<!-- Login.svelte -->

<script>
    // imports

    // Components
    import LabeledInput from "../../components/LabeledInput.svelte";
    import NotificationCentre from "../../components/NotificationCentre.svelte";

    // Libraries
    import { notifStore } from "../../lib/store.js";
	import { goto } from "$app/navigation";
	import {enhance} from "$app/forms";
	import { invalidateAll } from "$app/navigation";

    // exports
    export let form;
    export let data;
    
    // Register on load is broken 

    const isFromRegister = data.isFromRegister;
    
    if(isFromRegister){
        notifStore.clearAll()
        notifStore.addSuccess("Registered successfully!")
    }

    $:{
		if (form !== null && form.success) goto("/userdash").then(() => invalidateAll());
        if(form !== null && !form.success) notifStore.addError(form);
    }
    
</script>

<!-- Render -->

<NotificationCentre/>

<form method="post" class="m-auto card w-[95%] md:w-[30%] bg-base-300 p-10" use:enhance>
      <h1 class="text-2xl font-bold mb-8">Login</h1>
      <div class="form-control gap-2 mb-4">
		<LabeledInput name="email" placeholder="Email" type="email" />
		<LabeledInput name="password" placeholder="Password" type="password" />
		<button class="btn hover:bg-green-500 text-white bg-slate-700">Login</button>
      </div>
      <p><a href="/forgotPassword" class="text-indigo-600 hover:underline">Forgot Password?</a></p>
      <p>Don't have an account?<a href="/register" class="text-indigo-600 hover:underline pl-2">Register here</a></p>
</form>
