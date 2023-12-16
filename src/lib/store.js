// imports

// Libraries
import { writable } from "svelte/store";

// exports
export const errorsStore = createErrorNotificationsStore();
export const successStore = createSuccessNotificationsStore();
export const warningsStore = createWarningNotificationsStore();


// Create custom error store
function createErrorNotificationsStore() {
    const { subscribe, set, update } = writable([])

    return {
        subscribe,
        // Add notification method
        addNotification: (notificationMessage) => {
            update((prevVal) => [...prevVal, notificationMessage])
        },
        // Remove notification method
        removeNotification: (newArray) => update(() => newArray)
    }
}

// Create custom success store
function createSuccessNotificationsStore() {
    const { subscribe, set, update } = writable([])
    return {
        subscribe,
        // Add notification method
        addNotification: (notificationMessage) => update((prevVal) => [...prevVal, notificationMessage]),
        // Remove notification method
        removeNotification: (newArray) => update(() => newArray)
    }
}

// Create custom warning store
function createWarningNotificationsStore() {
    const { subscribe, set, update } = writable([])
    return {
        subscribe,
        // Add notification method
        addNotification: (notificationMessage) => update((prevVal) => [...prevVal, notificationMessage]),
        // Remove notification method
        removeNotification: (newArray) => update(() => newArray)
    }
}
