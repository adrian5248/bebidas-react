import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])
    const [searchFilters, setSearchFilters] = useState ({
        ingredient: '',
        category: ''
    })

    const categories = useAppStore((state) => state.categories)
    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const searchRecipes = useAppStore(state => state.searchRecipes)


    useEffect(() => {
        fetchCategories()
    }, [])


    function handleChance(
        e: ChangeEvent<HTMLInputElement> |
        ChangeEvent<HTMLSelectElement>){
        setSearchFilters({
            ...searchFilters, [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(Object.values(searchFilters).includes('')){
            console.log('No dejar campos en blanco')
            return
        }
        searchRecipes(searchFilters)
    }


return (
    <header className={ isHome? 'bg-header bg-cover bg-center' : 'bg-slate-800'}>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-32" src="/logo.svg" alt="logotipo" />
                </div>

                <nav className="flex gap-4">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ?
                            "text-gray-50 uppercase font-bold":
                            "text-white uppercase font-bold"}
                        to='/'>Home</NavLink>
                    <NavLink 
                        className={({ isActive }) =>
                            isActive ?
                            "text-white uppercase font-bold":
                            "text-white uppercase font-bold"}
                        to='/favoritos'>Favoritos</NavLink>
                </nav>
            </div>
            { isHome && (
                <form
                onSubmit={handleSubmit}
                className="md:w-1/2 2xl:w-1/3 bg-gray-800 my-32 p-10 rounded-lg shadow space-y-6">
                <div className="space-y-4">
                <label
                    htmlFor="ingredient"
                    className="block text-white uppercase font-extrabold text-lg">
                    Nombre o Ingredientes
                    </label>
                    <input
                    id='ingredient'
                    type="text"
                    onChange={handleChance}
                    name="ingredient"
                    className="p-3 w-full rounded-lg focus:outline-none"
                    placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila Café"
                    />
                </div>
                <div className="space-y-4">
                <label
                    htmlFor="category"
                    className="block text-white uppercase font-extrabold text-lg">
                    Categoría
                    </label>
                    <select
                    id='category'
                    name="category"
                    onChange={handleChance}
                    className="p-3 w-full rounded-lg focus:outline-none"
                    >
                        <option value="">-- Seleccione --</option>
                        {
                            categories.drinks.map(category => (
                                <option
                                key={category.strCategory}
                                value={category.strCategory}>{category.strCategory}</option>
                            ))//aqui se hace funcional la lista de las categorias, ara que pueda ir haciendo la seleccion de las 
                            //categorias
                        }
                    </select>
                </div>

                <input
                type="submit"
                className="cursor-pointer bg-slate-600 hover:bg-slate-600 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                value="Buscar Recetas" />
            </form>
            )}
        </div>
    </header>
    )
}
