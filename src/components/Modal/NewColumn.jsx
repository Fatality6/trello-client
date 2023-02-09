import React from 'react'
import { Dialog } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { createColumn } from '../../redux/column/columnSlice'
import { toast } from 'react-toastify'

export const NewColumn = ({isOpen,setIsOpen,boardId,columnName,setColumnName}) => {
    const dispatch = useDispatch()

    //функция для создания новой колонки
    const handlerSubmit = () => {
        try {
            dispatch(createColumn({ boardId, columnName }))
            setIsOpen(false)
            setColumnName('')
            toast('Колонка создана')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/30">
                <Dialog.Panel className="flex flex-col justify-center items-center gap-2 bg-sky-100 p-4 rounded-lg">
                    <Dialog.Title className='text-sky-800'>Создание новой колонки</Dialog.Title>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            value={columnName}
                            onChange={(e) => setColumnName(e.target.value)}
                            placeholder='Название колонки'
                            className='px-2 rounded-md border-2 border-sky-200'></input>
                        <div className='flex justify-center mt-4'>
                            <button
                                onClick={handlerSubmit}
                                className="bg-sky-600 text-white py-1 px-2 rounded-md hover:bg-sky-500 duration-300">
                                Создать
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
