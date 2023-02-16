import React from 'react'
import headerLogo from '../../img/headerlogo.gif'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../../redux/auth/authSlice'


export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    //функция выхода из аккаунта
    const logoutHandler = () => {
        //чистим redux
        dispatch(logout())
        //удаляем токен из localStorage
        window.localStorage.removeItem('token')
        toast('Вы вышли из системы')
        navigate('/login')
    }

    return (
        <header className='flex justify-between items-center flex-row h-11 bg-blue-600 px-4'>
  <div className="flex items-center">
    <div>
      <img src={headerLogo} alt='logo' className='w-[75px] mx-2' />
    </div>

    {location.pathname !== '/' && <Link to={'/'}>
      <div>
        <button
          className='transition ease-in-out text-white py-1 px-4 hover:bg-blue-400'
        >
          Назад
        </button>
      </div>
    </Link>}
  </div>
  <div>
    <button
      onClick={logoutHandler}
      className='transition ease-in-out bg-blue-400 text-white py-1 px-4 hover:bg-gray-400'>
        Выйти
    </button>
  </div>
</header>
    )
}
