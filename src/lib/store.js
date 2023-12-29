// imports

// Libraries
import { writable } from "svelte/store";

// exports

export const notifStore = createNotificationStore();

function createNotificationStore() {
	let notifCounter = 0;
    const { subscribe, update, set } = writable([]);

	const addNotification = (notificationObject) => {
		update((prevVal) => [...prevVal, notificationObject]);
		notifCounter++;
	}

    return {
        subscribe,

        // Remove notification method
        removeNotification: (idToRemove) => update((prevVal) => prevVal.filter((notification) => notification.id !== idToRemove)),
        clearAll: ()=> set([]),
		addError: (message) => addNotification({message: message, type: "error", id: notifCounter}),
		addWarning: (message) => addNotification({message: message, type: "warning", id: notifCounter}),
		addSuccess: (message) => addNotification({message: message, type: "success", id: notifCounter}),
    }
}
