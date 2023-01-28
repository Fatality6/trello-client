import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios.js'

//создаём стартовый state
const initialState = {
    columns: [],
    isLoading: false,
    status: null,
}

//create column
export const createColumn = createAsyncThunk('column/createColumn', async({ boardId, columnName }) => {
    try {
        const { data } = await axios.post('/columns', { boardId, columnName })
        return data
    } catch (error) {
        console.log(error)
    }
})

//get all columns
export const getAllColumns = createAsyncThunk('column/getAllColumns', async(boardId) => {
    try {
        const { data } = await axios.get('/columns',{params: {boardId}})
        return data
    } catch (error) {
        console.log(error)
    }
})

//delete column
export const removeColumn = createAsyncThunk('column/removeColumn', async(id) => {
    try {
        const { data } = await axios.delete(`/columns/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const columnSlice = createSlice({
    name: 'column',
    initialState,
    reducers: {},
    extraReducers: {
        //create column
        [createColumn.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [createColumn.fulfilled]: (state, action) => {
            state.isLoading = false
            state.columns.push(action.payload.newColumn)
            state.status = action.payload.message
        },
        [createColumn.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        //get all columns
        [getAllColumns.pending]: (state) => {
            state.isLoading = true
        },
        [getAllColumns.fulfilled]: (state, action) => {
            state.isLoading = false
            state.columns = action.payload.columns
        },
        [getAllColumns.rejected]: (state) => {
            state.isLoading = false
        },
        //delete column
        [removeColumn.pending]: (state) => {
            state.isLoading = true
        },
        [removeColumn.fulfilled]: (state, action) => {
            state.isLoading = false
            //перезаписываем state без поста с полученным id
            state.columns = state.columns.filter((column) => column._id !== action.payload.id)
        },
        [removeColumn.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export const columns = (state) => state.column.columns

export default columnSlice.reducer