import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios.js'

//создаём стартовый state
const initialState = {
    columns: [],
    isLoading: false,
    status: null,
}

//create column
export const createColumn = createAsyncThunk('column/createColumn', async ({ boardId, columnName }) => {
    try {
        const { data } = await axios.post('/columns', { boardId, columnName })
        return data
    } catch (error) {
        console.log(error)
    }
})

//create  card
export const createCard = createAsyncThunk('card/createCard', async ({ id, cardName }) => {
    try {
        const { data } = await axios.post('/cards', { id, cardName })
        return data
    } catch (error) {
        console.log(error)
    }
})

//update and relocation card
export const updateCard = createAsyncThunk('card/updateCard', async (updatedCard) => {
    try {
        const { data } = await axios.put(`/cards/${updatedCard.id}`, updatedCard)
        return data
    } catch (error) {
        console.log(error)
    }
})

//get all columns
export const getAllColumns = createAsyncThunk('column/getAllColumns', async (boardId) => {
    try {
        const { data } = await axios.get('/columns', { params: { boardId } })
        return data
    } catch (error) {
        console.log(error)
    }
})

//delete column
export const removeColumn = createAsyncThunk('column/removeColumn', async (id) => {
    try {
        const { data } = await axios.delete(`/columns/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

//delete card
export const removeCard = createAsyncThunk('card/removeCard', async (id) => {
    try {
        const { data } = await axios.delete(`/cards/${id}`)
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
        //create card
        [createCard.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [createCard.fulfilled]: (state, action) => {
            state.isLoading = false
            state.columns.find(column => column._id === action.payload.id).cards.push(action.payload.newCard)
            state.status = action.payload.message
        },
        [createCard.rejected]: (state, action) => {
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
        //update card
        [updateCard.pending]: (state) => {
            state.isLoading = true
        },
        [updateCard.fulfilled]: (state, action) => {
            state.isLoading = false;
            //изменение названия карточки
            if(!action.payload.oldCard){
            //находим колонку и карту и изменяем title
            state.columns.find(column => column._id === action.payload.columnId).cards.find(card => card._id === action.payload._id).title = action.payload.title
            }
            
            //перенос карточки
            if(action.payload.oldCard){
                state.columns.find(column => column._id === action.payload.id).cards.push(action.payload.newCard)
            //находим индекс удалённой карточки в массиве
            const index = state.columns.find(column => column._id === action.payload.oldCard.columnId).cards.findIndex((card) => card._id === action.payload.oldCard._id)
            //удаляем из массива карточку
            state.columns.find(column => column._id === action.payload.oldCard.columnId).cards.splice(index, 1)
            }
        },
        [updateCard.rejected]: (state) => {
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
        },
        //delete card
        [removeCard.pending]: (state) => {
            state.isLoading = true
        },
        [removeCard.fulfilled]: (state, action) => {
            state.isLoading = false
            //находим индекс удалённой карточки в массиве
            const index = state.columns.find(column => column._id === action.payload.columnId).cards.findIndex((card) => card._id === action.payload.cardId)
            //удаляем из массива карточку
            state.columns.find(column => column._id === action.payload.columnId).cards.splice(index, 1)
        },
        [removeCard.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export const columns = (state) => state.column.columns

export default columnSlice.reducer