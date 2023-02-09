import { Dialog } from '@headlessui/react'
import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { removeCard, updateCard } from '../../../redux/column/columnSlice'


export const ItemCard = ({id, title}) => {
    //состояние модального окна
    const [isOpen, setIsOpen] = useState(false)
    //состояние режима редактирования
    const [editMode,setEditMode] = useState(false)
    //состояние заголовка
    const [task,setTask] = useState(title)
    const dispatch = useDispatch()

    //функция для удаления карточки
    const deleteCard = () => {
        try {
            dispatch(removeCard(id))
            toast('Карточка была удалена')

        } catch (error) {
            console.log(error)
        }
    }

    const update = () => {
        try {
            setEditMode(false)
            const updatedCard = { id: id, title: task }
            dispatch(updateCard(updatedCard))
            toast('Карточка была изменена')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div
                className='flex justify-between items-center bg-sky-100 px-2 border-sky-300 border-2 text-sm '
                onClick={()=>setIsOpen(true)}>
                {task}
                <div 
                    className='opacity-75'
                    onClick={deleteCard}>
                        <FaTrashAlt size={12} color='gray' />
                </div>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/30">
                <Dialog.Panel className="flex flex-col justify-center items-center gap-2 bg-sky-100 p-4 rounded-lg">
                    <Dialog.Title className='text-sky-800'>
                        {!editMode && <span onClick={()=>setEditMode(true)}>{task}</span>}
                        {editMode && 
                            <input 
                                autoFocus = {true}
                                onBlur = {update}
                                value={task}
                                onChange={(e)=>setTask(e.currentTarget.value)}
                                >
                            </input>}
                    </Dialog.Title>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className='flex justify-center mt-4'>
                            <button
                                //onClick={handlerSubmit}
                                className="bg-sky-600 text-white py-1 px-2 rounded-md hover:bg-sky-500 duration-300">
                                Создать
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
        </div>
    )
}
