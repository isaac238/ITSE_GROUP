<script>
    // imports

    // Libraries
    import { notifStore } from "../lib/store.js";

    // Components
    import Notification from "./Notification.svelte";

    function RemoveTimer(i) {
        setTimeout(() => {
            notifStore.removeNotification(i);
        }, 7000);
    }
</script>

<!-- Render -->

<div class="flex flex-col items-end absolute w-full z-10">
    {#each $notifStore as notification (notification.id)}
        <Notification
			{ notification }
            timer={ () => RemoveTimer(notification.id) }
            callback={ () => notifStore.removeNotification(notification.id) }
        />
    {/each}
</div>
