<script>
	import LabeledInput from "./LabeledInput.svelte";
</script>

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

			<div class="flex">
				<p>Do you agree to the <span class="text-indigo-600 hover:underline pr- ">T&Cs</span></p>
				<input type="checkbox" checked="checked" class="checkbox checkbox-primary" />

			</div>


		</div>
		<p>Already have an account?<a href="/login" class="text-indigo-600 hover:underline pl-2">Login!</a></p>
	</form>
</main>

<dialog id="t&cs_modal" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Hello!</h3>
		<p class="py-4">Press ESC key or click the button below to close</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>