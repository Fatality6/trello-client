import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { removeCard } from '../../../redux/column/columnSlice'


export const ItemCard = ({id, title}) => {
    const dispatch = useDispatch()

    //функция для удаления карточки
    const deleteCard = () => {
        try {
            dispatch(removeCard(id))
            toast('Карточка была удалена')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div
                className='flex justify-between items-center bg-sky-100 px-2 border-sky-300 border-2 text-sm'>
                {title}
                <div 
                    className='opacity-75'
                    onClick={deleteCard}>
                        <FaTrashAlt size={12} color='gray' />
                </div>
            </div>
        </div>
    )
}
