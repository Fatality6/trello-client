import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export const Registration = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={e => e.preventDefault()}
      className='w-1/4 h-60 mx-auto mt-40'>

      <h1 className='text-lg text-white text-center'>Регистрация</h1>

      <label className='text-xs text-gray-400'>
        username:
        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700">
        </input>
      </label>

      <label className='text-xs text-gray-400'>
        password:
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 text-black w-full rounded-sm bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700">
        </input>
      </label>

      <div className='flex gap-8 justify-center mt-4'>
        <button
          onClick={handleSubmit}
          className='flex justify-center items-center text-xs text-white bg-gray-600 rounded-sm py-2 px-4'>
          Войти
        </button>
        <Link
          to={'/login'}
          className="flex justify-center items-center text-xs text-white">
          Уже зарегистрированы?
        </Link>
      </div>

    </form>
  )
}
