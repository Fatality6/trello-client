import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import boardSlice from './board/boardSlice'
import cardSlice from './card/cardSlice'
import columnSlice from './column/columnSlice'


export const store = configureStore({
    reducer: {
        auth: authSlice,
        board: boardSlice,
        column: columnSlice,
        card: cardSlice
    }
})