<script>
    export let form;
    console.log(form)
    import { redirect } from "@sveltejs/kit";
</script>



<div>
{#if form == undefined || form.success !== true}
<div class="w-screen h-screen flex items-center justify-center">
    <form method="post" class="card w-[25%] bg-neutral-900 p-10">
        <h1 class="text-2xl font-bold mb-8">Forgot Password</h1>
        <div class="form-control gap-2 mb-4">
            <input type="email" placeholder="Email" name="email" class="input input-bordered">
            <button class="btn hover:bg-secondary text-white bg-slate-700" type="submit">Submit</button>
        </div>
    </form>
  
  </div>
{:else}
<div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Success Email Sent!</h2>
      <p>An email has been sent to {form.email}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
{/if}
</div>
