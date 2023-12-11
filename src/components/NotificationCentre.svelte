
<script>
  // imports 
  import { errorsStore } from "../lib/store.js"
  import Error from "./notifications/Error.svelte";

  // exports
  
  console.log($errorsStore)
</script>

<div>
    {#each $errorsStore as error }
        <script>console.log(error)</script>
        <Error message={error}/>
    {/each}

</div>
