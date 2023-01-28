import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkIsAuth } from '../../redux/auth/authSlice'
import { Header } from '../../components/Header/Header'
import { MyBoards } from './MyBoards/MyBoards'
import { getAllBoards } from '../../redux/board/boardSlice'

export const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //получаем из redux информацию о авторизации
  const isAuth = useSelector(checkIsAuth)

  //если авторизация отсутствует,то переход на авторизацию
  useEffect(() => {
    if (!isAuth) navigate('/login')
  }, [isAuth, navigate])

  //обновление информации о досках
  useEffect(() => {
    dispatch(getAllBoards())
  }, [dispatch])


  return (
    <div className='min-h-screen bg-blue-400'>
      <Header />
      <div className='flex'>
        <div className='basis-1/4 bg-blue-300 text-center' >здесь будет навигация</div>
        <div className='basis-3/4 bg-blue-400'><MyBoards /></div>
      </div>
    </div>
  )
}
