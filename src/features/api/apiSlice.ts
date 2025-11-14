import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AdsResponse } from '../../types/apiType'
import type { GetAdsParams } from '../../types/api'

export const adsApi = createApi({
    reducerPath: 'adsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api/v1` }),
    endpoints: (builder) => (
        {
        getAds: builder.query<AdsResponse, GetAdsParams>({
            query: (params) => {
                const { page = 1, status, categoryId, minPrice, maxPrice, search } = params
                const queryParams = new URLSearchParams()
                
                queryParams.append('page', page.toString())
                
                if (status && status.length > 0) {
                    status.forEach((s) => queryParams.append('status', s))
                }
                
                if (categoryId !== null && categoryId !== undefined) {
                    queryParams.append('categoryId', categoryId.toString())
                }
                
                if (minPrice !== null && minPrice !== undefined) {
                    queryParams.append('minPrice', minPrice.toString())
                }
                
                if (maxPrice !== null && maxPrice !== undefined) {
                    queryParams.append('maxPrice', maxPrice.toString())
                }
                
                if (search && search.trim()) {
                    queryParams.append('search', search.trim())
                }
                
                return `/ads?${queryParams.toString()}`
            },
        }),
        }
    ),
})

export const { useGetAdsQuery } = adsApi