import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios.js'

//создаём стартовый state
const initialState = {
    boards: [],
    isLoading: false,
    status: null,
}

//create board
export const createBoard = createAsyncThunk('board/createBoard', async(boardName) => {
    try {
        const { data } = await axios.post('/boards', {boardName: boardName})
        return data
    } catch (error) {
        console.log(error)
    }
})

//get all boards
export const getAllBoards = createAsyncThunk('board/getAllBoards', async() => {
    try {
        const { data } = await axios.get('/boards')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {},
    extraReducers: {
        //create board
        [createBoard.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [createBoard.fulfilled]: (state, action) => {
            state.isLoading = false
            state.boards.push(action.payload.newBoard)
            state.status = action.payload.message
        },
        [createBoard.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        //get all boards
        [getAllBoards.pending]: (state) => {
            state.isLoading = true
        },
        [getAllBoards.fulfilled]: (state, action) => {
            state.isLoading = false
            state.boards = action.payload.boards
        },
        [getAllBoards.rejected]: (state) => {
            state.isLoading = false
        },
    }
})

export default boardSlice.reducer