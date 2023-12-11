// imports
import { writable } from "svelte/store";

// exports
export const errorsStore = createErrorNotificationsStore()

// Custom error store
function createErrorNotificationsStore(){
    const {subscribe,set,update} = writable([])

    return {
        subscribe,
        // Add notification update method
        addNotification: (notificationMessage) => update((prevVal)=>[...prevVal,notificationMessage]),
        // Remove notification update method
        removeNotification: (newArray) => update(()=>newArray)
    }
}
