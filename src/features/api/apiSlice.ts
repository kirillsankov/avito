import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AdsResponse } from '../../types/apiTpype'

export const adsApi = createApi({
    reducerPath: 'adsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api/v1` }),
    endpoints: (builder) => (
        {
        getAds: builder.query<AdsResponse[], void>({
            query: () => `/ads`,
        }),
        }
    ),
})

export const { useGetAdsQuery } = adsApi