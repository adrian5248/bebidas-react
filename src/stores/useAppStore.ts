import { create } from "zustand"
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice"
import { devtools } from "zustand/middleware"
import { createFavoritesSlice, FavoriteSliceType} from "./favoritesSlice"


export const useAppStore  = create<RecipeSliceType & FavoriteSliceType >()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a)
})))
