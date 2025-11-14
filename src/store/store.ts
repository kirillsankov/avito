import { configureStore } from '@reduxjs/toolkit'
import { adsApi } from '../features/api/apiSlice'
import pageReducer from '../features/page/pageSlice'
import filtersReducer from '../features/filters/filtersSlice'
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    [adsApi.reducerPath]: adsApi.reducer,
    page: pageReducer,
    filters: filtersReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adsApi.middleware),
})

export type { RootState, AppDispatch } from '../types/store' 