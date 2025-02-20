import { StateCreator } from "zustand"
import { FavoriteSliceType } from "./favoritesSlice"

type Notification = {
    text: string
    error: boolean
    show: boolean
}


export type NotificationsSliceType = {
    notification: Notification,
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void

    closeNotification: () => void

}

export const createNotificationsSlice: StateCreator<NotificationsSliceType
                                                    & FavoriteSliceType,
                                                    [], [],NotificationsSliceType> = (set, get) => ({
    notification: {
        text: '',
        error: false,
        show: true
        
    },
    showNotification: (payload) => {
        set({
            notification: {

                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        setTimeout(() => {
            get().closeNotification()
        }, 3000)
    },
    closeNotification: () => {
        set({
            notification: {
                text: '',
                error: false,
                show: false
            }
        })
    }
})
