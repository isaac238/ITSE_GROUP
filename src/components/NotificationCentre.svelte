
<script>
  // imports 
  import { errorsStore,successStore,warningsStore } from "../lib/store.js"
  import Error from "./notifications/Error.svelte";
  import Success from "./notifications/Success.svelte"
  import Warning from "./notifications/Warning.svelte"

  // exports

  let arr 

  function RemoveError(i,type){
    console.log("Remove error")
    switch(type){
      case "error":
        arr = $errorsStore;
        arr.pop(i)
        errorsStore.removeNotification(arr)
        break;
      case "success":
        arr = $successStore;
        arr.pop(i)
        successStore.removeNotification(arr)

        break;
    }
  }

</script>

<div class="absoloute">

  {#each $errorsStore as error,i }
    <Error message={error} callback={()=>{RemoveError(i+1,"error")}}/>
  {/each}
  {#each $successStore as success,i }
    <Success message={success} callback={()=>{RemoveError(i+1,"success")}}/>
  {/each}
  {#each $warningsStore as warnings,i }
  <Warning message={warnings}/>
  {/each}
</div>
