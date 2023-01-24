import React from 'react'
import headerLogo from '../../../img/headerlogo.gif'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../../../redux/auth/authSlice'
// import { Dialog } from '@headlessui/react'

export const Header = () => {
    // const [isOpen, setIsOpen] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Вы вышли из системы')
        navigate('/login')
    }

    return (
        <header className='flex justify-between items-center flex-row h-11 bg-blue-600 px-4'>
            <div>
                <img src={headerLogo} alt='menu' className='w-[75px] cursor-pointer' />
            </div>
            <button className='transition ease-in-out delay-150 bg-blue-400 text-white rounded-md py-1 px-4 hover:bg-gray-400 duration-300'>
                Создать
            </button>
            <div>
                <button
                    onClick={logoutHandler}
                    className='transition ease-in-out delay-150 bg-blue-400 text-white rounded-md py-1 px-4 hover:bg-gray-400 duration-300 '>
                    Выйти
                </button>
            </div>
        
        
        </header>
    )
}
