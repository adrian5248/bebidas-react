import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createNotificationsSlice, NotificationsSliceType } from "./notificationsSlice"

export type FavoriteSliceType = {
    favorites: Recipe[]
    addFavorites: (recipe: Recipe) => void
    favoriteExist: (id: Recipe['idDrink']) => boolean
    loadFavorites: () => void
}

export const createFavoritesSlice: StateCreator<FavoriteSliceType
                                    & NotificationsSliceType, [], [], FavoriteSliceType> = (set, get, api) => ({
    favorites: [],
    addFavorites: (recipe) => {
        if(get().favorites.some(d => d.idDrink === recipe.idDrink)){
            set({
                favorites: [...get().favorites.filter(d => d.idDrink !== recipe.idDrink)]
            })
            //aqui es para mostrar las notificaciones
            createNotificationsSlice(set, get, api)
            .showNotification({
                text: 'Se eliminó de Favoritos',
                error: true
            })
        } else {
            set({
                favorites: [...get().favorites, recipe]
            })
            createNotificationsSlice(set, get, api)
            .showNotification({
                text: 'Se agrego a Favoritos',
                error:false
            })
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },

    favoriteExist: (id) => {
        return !get().favorites.some(d => d.idDrink === id)
    },

    loadFavorites: () => {
        const dataStorage = localStorage.getItem('favorites')
        set({
            favorites: dataStorage? JSON.parse(dataStorage): []
        })
    }
})

