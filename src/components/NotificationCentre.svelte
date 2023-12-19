<script>
    // imports

    // Libraries
    import { notifStore } from "../lib/store.js";

    // Components
    import Notification from "./Notification.svelte";

    function RemoveTimer(i) {
        setTimeout(() => {
            notifStore.removeNotification(i);
        }, 10000);
    }
</script>

<!-- Render -->

<div class="flex flex-col items-end absolute w-full z-10">
    {#each $notifStore as notification, i}
        <Notification
			{ notification }
            timer={ () => RemoveTimer(i) }
            callback={ () => notifStore.removeNotification(i) }
        />
    {/each}
</div>
