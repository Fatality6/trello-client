import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../../../components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createColumn, getAllColumns } from '../../../redux/column/columnSlice'
import { ItemColumn } from './ItemColumn'
import { Dialog } from '@headlessui/react'


export const BoardPage = () => {
  //стейт для хранения имени новой колонки
  const [columnName, setColumnName] = useState('')
  //стейт для хранения состояния модального окна
  const [isOpen, setIsOpen] = useState(false)
  //получаем массив из redux
  const { columns } = useSelector((state) => state.column)
  const dispatch = useDispatch()
  const params = useParams()
  //переменная хранит в себе id из адресной строки
  const boardId = params.id

  //обновление данных о всех колонках
  useEffect(() => {
    dispatch(getAllColumns(boardId))
  },[dispatch,boardId])

  //функция для создания новой колонки
  const handlerSubmit = () => {
    try {
      dispatch(createColumn({ boardId, columnName }))
      setIsOpen(false)
      setColumnName('')
      toast('Колонка создана')
    } catch (error) {
      console.log(error)
    }
  }

  //прелоадер
  if (!columns) {
    return <div className="text-xl text-center text-white py-10">...</div>
}

  return (
    <div className='min-h-screen bg-blue-400'>
      <Header />
      <div className='flex'>
        <div className='basis-1/4 bg-blue-300' >nav</div>
        <div className='basis-3/4 bg-blue-400'>
          <div className='flex flex-wrap justify-start items-center bg-blue-400 p-4 gap-4'>
            {columns[0] && columns.map((el) => <ItemColumn key={el._id} title={el.title} id={el._id}/>)}
            <div>
              <button
                onClick={() => setIsOpen(true)}
                className='border-2 border-dotted text-white text-md p-2'>
                Добавить новую колонку
              </button>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/30">
                <Dialog.Panel className="flex flex-col justify-center items-center gap-2 bg-sky-100 p-4 rounded-lg">
                  <Dialog.Title className='text-sky-800'>Создание новой колонки</Dialog.Title>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input
                      value={columnName}
                      onChange={(e) => setColumnName(e.target.value)}
                      placeholder='Название колонки'
                      className='px-2 rounded-md border-2 border-sky-200'></input>
                    <div className='flex justify-center mt-4'>
                      <button
                        onClick={handlerSubmit}
                        className="bg-sky-600 text-white py-1 px-2 rounded-md hover:bg-sky-500 duration-300">
                        Создать
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}
