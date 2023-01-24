import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkIsAuth } from '../../redux/auth/authSlice'
import { Header } from './Header/Header'
import { MyBoards } from './MyBoards/MyBoards'

export const Dashboard = () => {
  const navigate = useNavigate()
  const isAuth = useSelector(checkIsAuth)

  useEffect(() => {
    if (!isAuth) navigate('/login')
},[isAuth, navigate])


  return (
    <div className='min-h-screen bg-blue-400'>
      <Header />
      <div className='grid  grid-cols-[260px_minmax(900px,_1fr)] bg-white'>
        <div>nav</div>
        <MyBoards/>
      </div>
    </div>
  )
}
