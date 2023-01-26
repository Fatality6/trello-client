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
  const isAuth = useSelector(checkIsAuth)

  useEffect(() => {
    if (!isAuth) navigate('/login')
  }, [isAuth, navigate])

  useEffect(() => {
    dispatch(getAllBoards())
  }, [dispatch])


  return (
    <div className='min-h-screen bg-blue-400'>
      <Header />
      <div className='flex'>
        <div className='basis-1/4 bg-blue-300' >nav</div>
        <div className='basis-3/4 bg-blue-400'><MyBoards /></div>
      </div>
    </div>
  )
}
