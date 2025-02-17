import { StateCreator } from "zustand"
import { Recipe } from "../types"

export type FavoriteSliceType = {
    favorites: Recipe[]
    addFavorites: (recipe: Recipe) => void
    favoriteExist: (id: Recipe['idDrink']) => boolean
}

export const createFavoritesSlice: StateCreator<FavoriteSliceType> = (set, get) => ({
    favorites: [],
    addFavorites: (recipe) => {
        if(get().favorites.some(d => d.idDrink === recipe.idDrink)){
            set({
                favorites: [...get().favorites.filter(d => d.idDrink !== recipe.idDrink)]
            })
        } else {
            favorites: [...get().favorites, recipe]
        }
    },
    favoriteExist: (id) => {
        return !get().favorites.some(d => d.idDrink === id)
    }
})

