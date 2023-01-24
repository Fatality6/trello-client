import React, { useState } from 'react'
import headerLogo from '../../../img/headerlogo.gif'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../../../redux/auth/authSlice'
import { Dialog } from '@headlessui/react'
import { createBoard } from '../../../redux/board/boardSlice'


export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [boardName, setBoardName] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Вы вышли из системы')
        navigate('/login')
    }

    const handlerSubmit = () => {
        try {
            dispatch(createBoard(boardName))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className='flex justify-between items-center flex-row h-11 bg-blue-600 px-4'>
            <div>
                <img src={headerLogo} alt='menu' className='w-[75px] cursor-pointer' />
            </div>
            <button
                onClick={() => setIsOpen(true)}
                className='transition ease-in-out delay-150 bg-blue-400 text-white rounded-md py-1 px-4 hover:bg-gray-400 duration-300'>
                    Создать
            </button>
            <div>
                <button
                    onClick={logoutHandler}
                    className='transition ease-in-out delay-150 bg-blue-400 text-white rounded-md py-1 px-4 hover:bg-gray-400 duration-300 '>
                        Выйти
                </button>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-start justify-center bg-black/30">
                    <Dialog.Panel className="flex flex-col justify-center items-center gap-2 bg-sky-100 p-4 rounded-lg mt-12">
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

        </header>
    )
}
