import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"

export default function HomePage(){

    const recipes = useAppStore(state => state.recipes)
    const hasRecipes = useMemo(() => recipes.drinks.length > 0, [recipes])

    return (
        <>
        <h1>Home Page</h1>
        {
            
        hasRecipes? (
            <>
            <p>Si hay recetas</p>
            {
                recipes.drinks.map(drink => (
                    <li key={drink.idDrink}>{drink.strDrink}</li>
                ))
            }
</>
            ):(
                <p>No hay recetas todavia, busca en el formulario</p>
            )
        }
        
        </>
    )
}
