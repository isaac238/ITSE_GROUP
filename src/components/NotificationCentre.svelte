<script>
    // imports

    // Libraries
    import { notifStore } from "../lib/store.js";

    // Components
    import Notification from "./notifications/Notification.svelte";

    function RemoveTimer(i) {
        setTimeout(() => {
            notifStore.removeNotification(i);
        }, 10000);
    }
</script>

<!-- Render -->

<div>
    {#each notifStore as notification, i}
        <Notification
            message={notification.message}
            type={notification.type}
            timer={() => RemoveTimer(i) }
            callback={() => notifStore.removeNotification(i) }
        />
    {/each}
</div>
