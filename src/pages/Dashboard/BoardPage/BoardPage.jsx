import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../../../components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { columns, getAllColumns } from '../../../redux/column/columnSlice'
import { ItemColumn } from './ItemColumn'
import { NewColumn } from '../../../components/Modal/NewColumn'



export const BoardPage = () => {
  // состояние новой колонки
  const [columnName, setColumnName] = useState('')
  // состояние модального окна создания новой колонки
  const [isOpen, setIsOpen] = useState(false)
  // подписываемся на изменения колонок в Redux
  const columnsArr = useSelector(columns)
  const dispatch = useDispatch()
  const params = useParams()
  //переменная хранит в себе id из адресной строки
  const boardId = params.id

  //обновление данных о всех колонках
  useEffect(() => {
    dispatch(getAllColumns(boardId))
  }, [dispatch, boardId])

  return (
    <div className='min-h-screen bg-blue-400'>
      <Header />
      {/* прелоадер */}
      {!columnsArr.length && <div className="text-xl text-center text-white py-10">...</div>}
      {columnsArr.length && <div className='flex'>
        <div className='basis-1/4 bg-blue-300 text-center' >здесь будет навигация</div>
        <div className='basis-3/4 bg-blue-400'>
          <div className='flex flex-wrap justify-start bg-blue-400 p-4 gap-4'>
            {columnsArr?.map((el) => <ItemColumn key={el._id} title={el.title} id={el._id} cardsArr={el.cards} />)}
            <div>
              <button
                onClick={() => setIsOpen(true)}
                className='border-2 border-dotted text-white text-md p-2'>
                Добавить новую колонку
              </button>
            </div>
            {/* вызов модального окна */}
            <NewColumn
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              boardId={boardId}
              columnName={columnName}
              setColumnName={setColumnName} />
          </div>
        </div>
      </div>}
    </div>
  )
}
