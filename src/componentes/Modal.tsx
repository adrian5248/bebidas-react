import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

export default function Modal() {
    const modal = useAppStore(state => state.modal)
    const closeModal = useAppStore(state => state.closeModal)
    const selectedRecipe = useAppStore(state => state.selectedRecipe)
    const addFavorites = useAppStore(state => state.addFavorites)
    const favoriteExist = useAppStore(state => state.favoriteExist)



    const renderIngredientes = () => {
      const ingredients : JSX.Element[] = []
      for(let i = 1; i <= 6; i++){
        const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]
        const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe]
        if(ingredient && measure){
            ingredients.push(
            <li key={i} className='text-lg font-normal'>
              {ingredient} - {measure}

            </li>
          )
        }


      }
      return ingredients
    }


  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                      {selectedRecipe.strDrink}
                  </Dialog.Title>
                    <img
                    src={ selectedRecipe.strDrinkThumb }
                    alt={'Imagen de ' + selectedRecipe.strDrink}
                    className='mx-auto w-96'
                    />
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Ingredientes y Cantidades
                  </Dialog.Title>
                  {renderIngredientes()}
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Insrucciones
                  </Dialog.Title>
                    <p className='text-lg'>{ selectedRecipe.strInstructions }</p>
                    <div className='flex justify-between gap-4'>
                      <button
                      onClick={closeModal}
                      className='bg-gray-400 hover:bg-gray-500 w-full p-3 text-white uppercase'
                      type="button">Cerrar Modal</button>
                      <button
                      onClick={() => {
                        addFavorites(selectedRecipe)
                        closeModal()
                      }}
                      className='bg-slate-950 hover:bg-slate-950 rounded w-full p-3 text-white uppercase'
                      type="button">{favoriteExist(selectedRecipe.idDrink)?
                        'Agregar a ':
                        'Eliminar de '
                      }Favoritos</button>
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}