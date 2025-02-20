import { create } from "zustand"
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice"
import { devtools } from "zustand/middleware"
import { createFavoritesSlice, FavoriteSliceType} from "./favoritesSlice"
import { createNotificationsSlice, NotificationsSliceType } from "./notificationsSlice"


export const useAppStore  = create<RecipeSliceType & FavoriteSliceType & NotificationsSliceType>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationsSlice(...a)
})))
