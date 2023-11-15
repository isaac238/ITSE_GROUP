<script>
	import LabeledInput from "./LabeledInput.svelte";
</script>



<dialog id="t&cs_modal" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg text-center pb-2">Modern Fit Terms & Conditions & Privacy Policy</h3>
		<hr/>
		<p>The terms & conditions and privacy policy below outline what data we ("Modern Fit") collect and how we ("Modern Fit") use it. </p>
		<p>In this we will refer to "us" and "we" as Modern Fit the company and 'you' and 'user' as the end user who pays for and uses the services that we ("Modern Fit") give access.</p>

		<h4 class="font-bold text-lg pb-2">1. Data Collected </h4>
			<p>We collect and process Personal Data for a variety of purposes, including:</p>
			<div class="">
				<ul class="list-disc pl-9">
					<li>To display personal content</li>
					<li>To send communications</li>
					<li>To handle contact and user support requests</li>
					<li>To bill for our services and manage our accounts (including usage and licensing compliance)</li>
					<li>To provide and optimize the performance of our services</li>
				</ul>
			</div>
			
			; 
			to maintain the security of Salesforce and its services;
			to administer surveys and conduct research; and
			to comply with our legal obligations.
			For the list of purposes for which we Process your Personal Data, please see the full Privacy Statement
			
			We only collect and process your Personal Data to the extent it is necessary for fulfilling these purposes and where we can rely on a legal basis for such processing as set out in our full Privacy Statement. Where required, we will ask you for your prior consent to processing.

		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
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
