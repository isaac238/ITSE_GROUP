// imports

// Libraries
import { writable } from "svelte/store";

// exports

export const notifStore = createNotificationStore();


const addNotification = (notificationMessage) => update((prevVal) => [...prevVal, notificationMessage]);

function createNotificationStore() {
    const { subscribe, update } = writable([]);

    return {
        subscribe,

        // Remove notification method
        removeNotification: (itemIdx) => update((prevVal) => prevVal.filter((_, idx) => idx !== itemIdx)),

		addError: (message) => addNotification({message: message, type: "error"}),
		addWarning: (message) => addNotification({message: message, type: "warning"}),
		addSuccess: (message) => addNotification({message: message, type: "success"})
    }
}


