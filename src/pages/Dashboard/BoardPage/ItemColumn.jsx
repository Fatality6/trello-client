import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createCard, removeColumn } from '../../../redux/column/columnSlice'
import { ItemCard } from './ItemCard'


export const ItemColumn = ({ title, id, cardsArr}) => {
  //стейт для хранения состояния иконки удаления
  const [showIcon, setShowIcon] = useState(false)
  //стейт для хранения состояния отображения textarea
  const [showTextArea, setShowTextArea] = useState(false)
  //стейт для имени новой карточки
  const [cardName, setCardName] = useState('')
  const dispatch = useDispatch()

  //функция создания карточки
  const addCard = async() => {
    try {
      dispatch(createCard({ id, cardName }))
      setShowTextArea(false)
      setCardName('')
    } catch (error) {
      console.log(error)
    }
  }

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

   //прелоадер
   if (!cardsArr) {
    return <div className="text-xl text-center text-white py-10">...</div>
}

  return (
    <div
      className='relative flex h-min w-[200px] bg-sky-200 rounded-md text-gray-700 cursor-pointer'
      /* появление иконки при наведении мыши */
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
    >
      {/* исчезновение textarea при потере фокуса */}
      <div className='flex flex-col p-2 w-full gap-3' onBlur={() => !cardName && setShowTextArea(false)} >

        <div className='w-full text-sm'>{title}</div>

        {cardsArr.map((card) => <ItemCard key={card._id} id={card._id} title={card.title}/> )}

        {!showTextArea &&
          <div className='p-2'>
            <button
              onClick={() => setShowTextArea(true)}
              className='bg-sky-300/50 hover:bg-sky-400 text-gray-600 border-2 border-sky-300 py-1 px-2 rounded-md duration-300'>Добавить карточку</button>
          </div>}

        {showTextArea &&
          <div>
            <textarea
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className='rounded-xs p-2 text-xs h-8 w-full'
              placeholder='Заголовок карточки'
              autoFocus={showTextArea}></textarea>
            <div className='text-left'>
              <button
                onClick={addCard}
                className='bg-sky-300/50 hover:bg-sky-400 text-gray-600  py-1 px-2 rounded-md duration-300'>Добавить</button>
            </div>
          </div>}

      </div>

      {showIcon && (
        <div className='absolute top-2 right-2 opacity-50' onClick={handleDelete}>
          <FaTrashAlt size={12} color='gray' />
        </div>
      )}

    </div>
  )
}
