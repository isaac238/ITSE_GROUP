
<script>
  // imports 
  
  // Libraries
  import { errorsStore,successStore,warningsStore } from "../lib/store.js"
  
  // Components
  import Error from "./notifications/Error.svelte";
  import Success from "./notifications/Success.svelte"
  import Warning from "./notifications/Warning.svelte"

  // exports

  // 

  let arr 

  function RemoveError(i,type){
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

  function RemoveTimer(i){
    setTimeout(()=>{
      RemoveError(i,"error")
    },10000)
  }

</script>

<!-- Render -->

<div>
  {#each $errorsStore as error,i }
    <Error message={error} timer={()=>{RemoveTimer(i+1)}} callback={()=>{RemoveError(i+1,"error")}}/>
  {/each}
  {#each $successStore as success,i }
    <Success message={success} timer={()=>{RemoveTimer(i+1)}} callback={()=>{RemoveError(i+1,"success")}}/>
  {/each}
  {#each $warningsStore as warnings,i }
    <Warning message={warnings} timer={()=>{RemoveTimer(i+1)}} callback={()=>{RemoveError(i+1,"success")}}/>
  {/each}
</div>
