import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import boardSlice from './board/boardSlice'


export const store = configureStore({
    reducer: {
        auth: authSlice,
        board: boardSlice
    }
})