import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios.js'

//создаём стартовый state
const initialState = {
    cards: [],
    isLoading: false,
    status: null,
}

//create  card
export const createCard = createAsyncThunk('card/createCard', async({ id, cardName }) => {
    try {
        const { data } = await axios.post('/cards', { id, cardName })
        return data
    } catch (error) {
        console.log(error)
    }
})

//get all cards
export const getAllCards = createAsyncThunk('card/getAllCards', async(id) => {
    try {
        const { data } = await axios.get('/cards',{params: {id}})
        return data
    } catch (error) {
        console.log(error)
    }
})

//delete card
export const removeCard = createAsyncThunk('card/removeCard', async(id) => {
    try {
        const { data } = await axios.delete(`/cards/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {},
    extraReducers: {
        //create card
        [createCard.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [createCard.fulfilled]: (state, action) => {
            state.isLoading = false
            state.cards.push(action.payload.newCard)
            state.status = action.payload.message
        },
        [createCard.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        //get all card
        [getAllCards.pending]: (state) => {
            state.isLoading = true
        },
        [getAllCards.fulfilled]: (state, action) => {
            state.isLoading = false
            state.cards = action.payload.cards
        },
        [getAllCards.rejected]: (state) => {
            state.isLoading = false
        },
        //delete card
        [removeCard.pending]: (state) => {
            state.isLoading = true
        },
        [removeCard.fulfilled]: (state, action) => {
            state.isLoading = false
            //перезаписываем state без поста с полученным id
            state.cards = state.cards.filter((card) => card._id !== action.payload.id)
        },
        [removeCard.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export const cards = (state) => state.card.cards

export default cardSlice.reducer