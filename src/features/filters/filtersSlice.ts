import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { StatusFilter, FiltersState, SortBy, SortOrder } from '../../types/filters'

const initialState: FiltersState = {
    status: [],
    categoryId: null,
    minPrice: null,
    maxPrice: null,
    search: '',
    sortBy: null,
    sortOrder: 'desc',
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<StatusFilter[]>) => {
            state.status = action.payload
        },
        toggleStatus: (state, action: PayloadAction<StatusFilter>) => {
            const index = state.status.indexOf(action.payload)
            if (index === -1) {
                state.status.push(action.payload)
            } else {
                state.status.splice(index, 1)
            }
        },
        setCategoryId: (state, action: PayloadAction<number | null>) => {
            state.categoryId = action.payload
        },
        setMinPrice: (state, action: PayloadAction<number | null>) => {
            state.minPrice = action.payload
        },
        setMaxPrice: (state, action: PayloadAction<number | null>) => {
            state.maxPrice = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setSortBy: (state, action: PayloadAction<SortBy>) => {
            state.sortBy = action.payload
        },
        setSortOrder: (state, action: PayloadAction<SortOrder>) => {
            state.sortOrder = action.payload
        },
        resetFilters: (state) => {
            state.status = []
            state.categoryId = null
            state.minPrice = null
            state.maxPrice = null
            state.search = ''
            state.sortBy = null
            state.sortOrder = 'desc'
        },
    },
})

export const {
    setStatus,
    toggleStatus,
    setCategoryId,
    setMinPrice,
    setMaxPrice,
    setSearch,
    setSortBy,
    setSortOrder,
    resetFilters,
} = filtersSlice.actions

export default filtersSlice.reducer

