<script>
	// Imports
	import {enhance} from "$app/forms";

	// Component Imports
	import InputError from "./InputError.svelte";
	import LabeledInput from "./LabeledInput.svelte";
	import Policies from "./Policies.svelte";
	import RegisterValidation from "$lib/registerValidation.js";

	let firstName = "";
	let surname = "";
	let email = "";
	let birthdate = "";
	let password = "";
	let confirmPassword = "";
	let errors = [];

	let maxDate = new Date()
	maxDate.setFullYear(maxDate.getFullYear() - 16);
	
	$: errors = [
	...RegisterValidation.passwordValidation(password).problems,
	...RegisterValidation.confirmValidation(password, confirmPassword).problems,
	...RegisterValidation.emailValidation(email).problems,
	...RegisterValidation.firstNameValidation(firstName).problems,
	...RegisterValidation.surnameValidation(surname).problems,
	...RegisterValidation.ageValidation(birthdate).problems,
	];

	// Modal show definition
	function showTCModal() {
		document.getElementById('t&cs_modal').showModal();
	}
</script>


<!-- Modals -->
<dialog id="t&cs_modal" class="modal">
	<Policies/>
</dialog>

<!-- Page Content -->
<form method="post" class="mx-auto mt-4 card w-[95%] md:w-[60%] lg:w-[30%] bg-base-300 p-10" use:enhance={() => {
return async ({update}) => {
	update({ reset: false });
	}
}}
>
	<h1 class="text-2xl font-bold mb-8">Register</h1>

	<div class="form-control gap-2 mb-4">
		<LabeledInput name="first-name" placeholder="First Name" type="text" bind:value={firstName} required={true} />
		<LabeledInput name="surname" placeholder="Surname" type="text" bind:value={surname} required={true} />
		<LabeledInput name="email" placeholder="Email" type="email" bind:value={email} required={true} />
		<LabeledInput name="birthdate" placeholder="Date Of Birth" type="date" max={maxDate.toISOString().split("T")[0]} bind:value={birthdate} required={true} />
		<LabeledInput name="password" placeholder="Password" type="password" bind:value={password} required={true} />
		<LabeledInput name="confirm-password" placeholder="Confirm Password" type="password" bind:value={confirmPassword} required={true} />
		<button class="btn hover:bg-green-500 bg-slate-700 text-white" type="submit">Register</button>
		<!--<InputError {errors} />-->
		<div class="flex justify-center">
			<input type="checkbox" class="checkbox checkbox-primary" required/>
			<p class="pl-4">Do you agree to the <span on:click={() => showTCModal()} class="text-indigo-600 hover:underline cursor-pointer">T&C and Privacy Policy</span></p>

		</div>


	</div>
	<p>Already have an account?<a href="/login" class="text-indigo-600 hover:underline pl-2">Login!</a></p>
</form>
