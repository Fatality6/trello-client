import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { removeColumn } from '../../../redux/column/columnSlice'

export const ItemColumn = ({ title, id }) => {
  //стейт для хранения состояния иконки удаления
  const [showIcon, setShowIcon] = useState(false)
  const dispatch = useDispatch()

  //функция для удаления колонки
  const handleDelete = () => {
    try {
      if (confirm(`Вы уверены что хотите удалить колонку "${title}"?`)) { // eslint-disable-line no-restricted-globals
        dispatch(removeColumn(id))
        toast('Доска была удалена')
      }

    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div
      className='relative flex justify-center items-center h-28 w-[200px] bg-sky-700 rounded-md text-white cursor-pointer hover:bg-sky-800 duration-300'
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
    >
      <Link to={`/${id}`} className='h-full w-full px-4 py-6'>{title}</Link>
      {showIcon && (
        <div className='absolute top-2 right-2 opacity-50' onClick={handleDelete}>
          <FaTrashAlt size={12} color='white' />
        </div>
      )}
    </div>
  )
}
