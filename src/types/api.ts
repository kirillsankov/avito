import type { StatusFilter } from './filters';

export interface GetAdsParams {
    page?: number;
    status?: StatusFilter[];
    categoryId?: number | null;
    minPrice?: number | null;
    maxPrice?: number | null;
    search?: string;
}

