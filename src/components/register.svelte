<script>
	import LabeledInput from "./LabeledInput.svelte";
    import Notifactions from "./Notifactions.svelte";
	import Policies from "./Policies.svelte";


</script>

<div>
	<Notifactions notificationType="warning" message="this is a sample" />

</div>



<dialog id="t&cs_modal" class="modal">
	<Policies/>
</dialog>

<main class="w-screen h-screen flex items-center justify-center">
	<form method="post" class="card w-[25%] bg-base-300 p-10 ">
		<h1 class="text-2xl font-bold mb-8">Register</h1>

		<div class="form-control gap-2 mb-4">
			<LabeledInput name="first-name" placeholder="First Name" type="text" />
			<LabeledInput name="surname" placeholder="Surname" type="text" />
			<LabeledInput name="email" placeholder="Email" type="email" />
			<LabeledInput name="birthdate" placeholder="Date Of Birth" type="date" />
			<LabeledInput name="password" placeholder="Password" type="password" />
			<LabeledInput name="confirm-password" placeholder="Confirm Password" type="password" />
			<button class="btn hover:bg-green-500 bg-slate-700 text-white" type="submit">Register</button>

			<div class="flex justify-center">
				<input type="checkbox" checked="checked" class="checkbox checkbox-primary " />
				<p class="pl-4">Do you agree to the <span onclick="showModal()" class="text-indigo-600 hover:underline cursor-pointer">T&C and Privacy Policy</span></p>

			</div>


		</div>
		<p>Already have an account?<a href="/login" class="text-indigo-600 hover:underline pl-2">Login!</a></p>
	</form>
	
<script>
	function showModal(){
		document.getElementById('t&cs_modal').showModal()
	}
</script>
</main>
