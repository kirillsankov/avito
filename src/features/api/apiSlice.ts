import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AdsResponse, Ad } from '../../types/apiType'
import type { GetAdsParams } from '../../types/api'
import type { Moderator, ChartParams, ActivityData, DecisionsData, CategoryStats } from '../../types/moderator'
import type { RejectAdRequest, RequestChangesRequest, ModerationResponse } from '../../types/moderation'

export const adsApi = createApi({
    reducerPath: 'adsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api/v1` }),
    endpoints: (builder) => (
        {
        getAds: builder.query<AdsResponse, GetAdsParams>({
            query: (params) => {
                const { page = 1, status, categoryId, minPrice, maxPrice, search, sortBy, sortOrder } = params
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
                
                if (sortBy) {
                    queryParams.append('sortBy', sortBy)
                }
                
                if (sortOrder) {
                    queryParams.append('sortOrder', sortOrder)
                }
                
                return `/ads?${queryParams.toString()}`
            },
        }),
        getAdById: builder.query<Ad, number>({
            query: (id) => `/ads/${id}`,
        }),
        getModeratorStats: builder.query<Moderator, void>({
            query: () => '/moderators/me',
        }),
        getActivityChart: builder.query<ActivityData[], ChartParams>({
            query: (params) => {
                const { period, startDate, endDate } = params;
                const queryParams = new URLSearchParams();
                
                if (period) {
                    queryParams.append('period', period);
                }
                if (startDate) {
                    queryParams.append('startDate', startDate);
                }
                if (endDate) {
                    queryParams.append('endDate', endDate);
                }
                
                const queryString = queryParams.toString();
                return `/stats/chart/activity${queryString ? `?${queryString}` : ''}`;
            },
        }),
        getDecisionsChart: builder.query<DecisionsData, ChartParams>({
            query: (params) => {
                const { period, startDate, endDate } = params;
                const queryParams = new URLSearchParams();
                
                if (period) {
                    queryParams.append('period', period);
                }
                if (startDate) {
                    queryParams.append('startDate', startDate);
                }
                if (endDate) {
                    queryParams.append('endDate', endDate);
                }
                
                const queryString = queryParams.toString();
                return `/stats/chart/decisions${queryString ? `?${queryString}` : ''}`;
            },
        }),
        getCategoriesChart: builder.query<CategoryStats, ChartParams>({
            query: (params) => {
                const { period, startDate, endDate } = params;
                const queryParams = new URLSearchParams();
                
                if (period) {
                    queryParams.append('period', period);
                }
                if (startDate) {
                    queryParams.append('startDate', startDate);
                }
                if (endDate) {
                    queryParams.append('endDate', endDate);
                }
                
                const queryString = queryParams.toString();
                return `/stats/chart/categories${queryString ? `?${queryString}` : ''}`;
            },
        }),
        approveAd: builder.mutation<ModerationResponse, number>({
            query: (id) => ({
                url: `/ads/${id}/approve`,
                method: 'POST',
            }),
        }),
        rejectAd: builder.mutation<ModerationResponse, { id: number; body: RejectAdRequest }>({
            query: ({ id, body }) => ({
                url: `/ads/${id}/reject`,
                method: 'POST',
                body,
            }),
        }),
        requestChanges: builder.mutation<ModerationResponse, { id: number; body: RequestChangesRequest }>({
            query: ({ id, body }) => ({
                url: `/ads/${id}/request-changes`,
                method: 'POST',
                body,
            }),
        }),
        }
    ),
})

export const { 
    useGetAdsQuery, 
    useGetAdByIdQuery, 
    useGetModeratorStatsQuery,
    useGetActivityChartQuery,
    useGetDecisionsChartQuery,
    useGetCategoriesChartQuery,
    useApproveAdMutation,
    useRejectAdMutation,
    useRequestChangesMutation,
} = adsApi