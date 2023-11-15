<script>
	import LabeledInput from "./LabeledInput.svelte";
</script>



<dialog id="t&cs_modal" class="modal">
	<div class="modal-box relative max-w-none w-65">
		<h3 class="font-bold text-lg text-center pb-2 pt-2">Modern Fit Terms & Conditions & Privacy Policy</h3>
		<hr class="pb-3"/>
		<p>These terms and conditions ("Agreement") are entered into by and between the user ("User") and Modern Fit ("Service Provider"). 
			This Agreement governs the use of the Modern Fit website and any related services provided by the Service Provider. 
			By accessing or using the website, the User agrees to be bound by these terms and conditions.</p>
		
		<h3 class="font-bold text-lg pb-4 pt-4 text-center">Terms & Conditions For Modern Fit </h3>
		<hr class="pb-3"/>

			<h4 class="font-bold text-xl pb-2 pt-2">1. Acceptance & Terms</h4>
			<ul class="list-disc pl-9">
				<li>By accessing or using the Modern Fit website you agree to be bound by these terms and conditions. 
					If you do not agree with any part of these terms, you must not use the website or have access to Modern Fit Gyms.</li>
			</ul>
			<h4 class="font-bold text-xl pb-2 pt-2">2. User Accounts</h4>
			<ul class="list-disc pl-9">
				<li>To access certain features of the website, you may need to create a user account.</li>
				<li>You are responsible for maintaining the confidentiality of your account information.</li>
				<li>You are responsible for all activities that occur under your account.</li>
			</ul>
			<h4 class="font-bold text-xl pb-2 pt-2">3. Use Of The Website</h4>
			<h5 class="font-bold text-m pb-2 pt-2">Normal Users</h5>
			<ul class="list-disc pl-9">
				<li>The website is for personal use only. Commercial use is strictly prohibited.</li>
				<li>Any disruptive or harmful behavior affecting the functionality of the website is not allowed.</li>
			</ul>
			<h5 class="font-bold text-m pb-2 pt-2">Trainers</h5>
			<ul class="list-disc pl-9">
				<li>The website is for personal use only and you as a coach connected to Modern Fit Gym any outside coaching is strictly prohibited.</li>
				<li>Any disruptive or harmful behavior affecting the functionality of the website is not allowed.</li>
				<li>Leaking data of clients is also strictly prohibited.</li>
			</ul>
			<h5 class="font-bold text-xl pb-2 pt-2">4. Membership & Payments</h5>
			<ul class="list-disc pl-9">
				<li>Membership details, fees, and payment terms are outlined on the website.</li>
				<li>Membership pricing may change and varies between packages.</li>
				<li>You agree to pay all fees associated with your membership promptly. Failure to do so your membership with Modern Fit and their services are suspended immediately, if not paid the debts, legal action will be pursued and you the user will be denied access permanently.</li>
			</ul>
			<h5 class="font-bold text-xl pb-2 pt-2">5. Code of Conduct</h5>
			<ul class="list-disc pl-9">
				<li>Users must adhere to a code of conduct that includes refraining from unlawful, threatening, abusive, or harassing behavior.</li>
				<li>Uploading or distributing inappropriate content is strictly prohibited.</li>
				<li>Termination of the contract can be made if code of conduct is broken in Modern Fit facilities too.</li>
			</ul>

			<h3 class="font-bold text-lg pb-4 pt-4 text-center">Privacy Policy</h3>
			<hr class="pb-3"/>


**1. Information Collection:**
   - We collect personal information provided by users during account creation and through the use of the website.

**2. Use of Information:**
   - Personal information is used for creating and managing user accounts, processing payments, and providing personalized services.

**3. Security:**
   - We implement reasonable security measures to protect the confidentiality and integrity of your personal information.

**4. Third-Party Services:**
   - The website may integrate with third-party services, and their privacy policies may apply. We are not responsible for the practices of third parties.

**5. Cookies:**
   - The website may use cookies to enhance user experience. You can adjust your browser settings to refuse cookies if you prefer.

**6. Changes to Privacy Policy:**
   - We reserve the right to update our privacy policy. Users will be notified of any changes, and continued use of the website implies acceptance of the updated policy.

**7. Contact Information:**
   - For questions or concerns regarding the terms & conditions or privacy policy, contact us at [Your Contact Information].

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
