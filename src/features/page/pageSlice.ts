import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { PageState } from '../../types/page'

const initialState: PageState = {
    currentPage: 1,
    totalPages: 10,
    totalItems: 0,
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        nextPage: (state) => {
            state.currentPage += 1
        },
        prevPage: (state) => {
            state.currentPage -= 1
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload
        },
        setTotalItems: (state, action: PayloadAction<number>) => {
            state.totalItems = action.payload
        },
    },
})

export const { nextPage, prevPage, setCurrentPage, setTotalPages, setTotalItems } = pageSlice.actions

export default pageSlice.reducer