import React from 'react'
import { Header } from './Header/Header'

export const Dashboard = () => {
  return (
    <div className='min-h-screen bg-blue-400'>
      <Header/>
      <div className='grid  grid-cols-[260px_minmax(900px,_1fr)] bg-white'>
        <div>nav</div>
        <div className='flex bg-blue-400 '>board</div>
      </div>
    </div>
  )
}
