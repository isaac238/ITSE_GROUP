
<script>
  // imports 
  import { errorsStore,successStore,warningsStore } from "../lib/store.js"
  import Error from "./notifications/Error.svelte";
  import Success from "./notifications/Success.svelte"
  import Warning from "./notifications/Warning.svelte"

  // exports
  
  console.log($errorsStore)
</script>

<div>
    {#each $errorsStore as error }
        <Error message={error}/>
    {/each}

</div>

<div>
  {#each $successStore as success }
    <Success message={success}/>
  {/each}
</div>

<div>
  {#each $warningsStore as warnings }
  <Warning message={warnings}/>
  {/each}
</div>
