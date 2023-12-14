// imports
import { writable } from "svelte/store";

// exports
export const errorsStore = createErrorNotificationsStore();
export const successStore = createSuccessNotificationsStore();
export const warningsStore = createWarningNotificationsStore();


// Custom error store
function createErrorNotificationsStore(){
const {subscribe,set,update} = writable([])

    return {
        subscribe,
        // Add notification update method
        addNotification: (notificationMessage) => {
            update((prevVal)=>[...prevVal,notificationMessage])
            
        },
        // Remove notification update method
        removeNotification: (newArray) => update(()=>newArray)
    }
}

function createSuccessNotificationsStore(){
    const{subscribe,set,update} = writable([])
    return{
        subscribe,
        addNotification:(notificationMessage)=>update((prevVal)=>[...prevVal,notificationMessage]),
        removeNotification: (newArray) => update(()=>newArray)
    }
}

function createWarningNotificationsStore(){
    const{subscribe,set,update} = writable([])
    return{
        subscribe,
        addNotification:(notificationMessage)=>update((prevVal)=>[...prevVal,notificationMessage]),
        removeNotification: (newArray) => update(()=>newArray)
    }
}
