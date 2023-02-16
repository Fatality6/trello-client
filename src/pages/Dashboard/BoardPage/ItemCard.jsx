import { Dialog } from '@headlessui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { removeCard, updateCard } from '../../../redux/column/columnSlice'
import { FaPencilAlt } from 'react-icons/fa'


export const ItemCard = ({ id, title, columnsArr }) => {
    //состояние модального окна
    const [isOpen, setIsOpen] = useState(false)
    //состояние режима редактирования
    const [editMode, setEditMode] = useState(false)
    //состояние заголовка
    const [task, setTask] = useState(title)
    //состояние селекта
    const [selectedColumn, setSelectedColumn] = useState('')
    const dispatch = useDispatch()

    //изменение состояния селекта
    const handleColumnChange = (e) => {
        setSelectedColumn(e.target.value)
    }

    //функция для удаления карточки
    const deleteCard = () => {
        try {
            dispatch(removeCard(id))
            toast('Карточка была удалена')
            setIsOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    //функция по редактированию карточки
    const update = () => {
        try {
            setEditMode(false)
            const updatedCard = { id: id, title: task }
            dispatch(updateCard(updatedCard))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div
                className='flex justify-between items-center bg-sky-100 px-2 border-sky-300 border-2 text-sm '
                onClick={() => setIsOpen(true)}>
                {task}
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/30">
                    <Dialog.Panel className="flex flex-col justify-center items-center gap-2 bg-sky-100 p-4 rounded-lg">
                        <Dialog.Title className='text-sky-800 border-sky-300'>
                            {!editMode &&
                                <div
                                    className='flex items-center gap-1'>
                                    <span onClick={() => setEditMode(true)}> {task} </span>
                                    <FaPencilAlt size={12} color='gray' />
                                </div>
                            }
                            {editMode &&
                                <input
                                    className='px-2'
                                    autoFocus={true}
                                    onBlur={update}
                                    value={task}
                                    onChange={(e) => setTask(e.currentTarget.value)}
                                >
                                </input>}
                        </Dialog.Title>

                        <div className='flex justify-center mt-4'>
                            <select
                                className='bg-white border border-gray-400 p-2 rounded-md mr-2'
                                value={selectedColumn}
                                onChange={handleColumnChange}
                            >
                                <option value=''>Выберите колонку</option>
                                {columnsArr.map((column) => (
                                    <option key={column._id} value={column._id}>
                                        {column.title}
                                    </option>
                                ))}
                            </select>
                            <button
                                disabled={selectedColumn === ''}
                                onClick={() => console.log('нажал')}
                                className={`py-1 px-2 rounded-md hover:bg-sky-500 duration-300 mx-1 ${selectedColumn === '' ? 'bg-gray-400' : 'bg-sky-600 text-white'}`}
                            >
                                Перенести
                            </button>
                        </div>
                        <button
                            onClick={deleteCard}
                            className="bg-red-400 text-white py-1 px-2 rounded-md hover:bg-red-300 duration-300">
                            Удалить
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    )
}
