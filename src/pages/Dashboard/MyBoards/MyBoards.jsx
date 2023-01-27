import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { boards, createBoard } from '../../../redux/board/boardSlice'
import { ItemBoard } from './ItemBoard'
import { Dialog } from '@headlessui/react'

export const MyBoards = () => {
    //получаем информацию о досках из Redux
    const myBoards = useSelector(boards)
    //состояние модального окна
    const [isOpen, setIsOpen] = useState(false)
    //стейт для имени новой доски
    const [boardName, setBoardName] = useState('')
    const dispatch = useDispatch()

    //функция создания новой доски
    const handlerSubmit = () => {
        try {
            dispatch(createBoard(boardName))
            setIsOpen(false)
            setBoardName('')
            toast('Доска создана')
        } catch (error) {
            console.log(error)
        }
    }

    return (
            <div className='flex flex-wrap justify-start items-center bg-blue-400 p-4 gap-4'>
                {myBoards?.map((el) => <ItemBoard key={el._id} title={el.title} id={el._id} />)}
                <div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className='border-2 border-dotted text-white p-2'>
                        Добавить доску
                    </button>
                </div>
                <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/30">
                        <Dialog.Panel className="flex flex-col justify-center items-center gap-2 bg-sky-100 p-4 rounded-lg">
                            <Dialog.Title className='text-sky-800'>Создание новой доски</Dialog.Title>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input
                                    value={boardName}
                                    onChange={(e) => setBoardName(e.target.value)}
                                    placeholder='Название доски'
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
            </div>
    )
}
