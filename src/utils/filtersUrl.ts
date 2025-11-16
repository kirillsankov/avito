import type { FiltersState, SortBy, SortOrder } from '../types/filters';
import type { StatusFilter } from '../types/filters';

export function filtersToUrlParams(filters: FiltersState): URLSearchParams {
    const params = new URLSearchParams();
    
    if (filters.status.length > 0) {
        filters.status.forEach(status => {
            params.append('status', status);
        });
    }
    
    if (filters.categoryId !== null) {
        params.set('categoryId', filters.categoryId.toString());
    }
    
    if (filters.minPrice !== null) {
        params.set('minPrice', filters.minPrice.toString());
    }
    
    if (filters.maxPrice !== null) {
        params.set('maxPrice', filters.maxPrice.toString());
    }
    
    if (filters.search.trim()) {
        params.set('search', filters.search.trim());
    }
    
    if (filters.sortBy) {
        params.set('sortBy', filters.sortBy);
    }
    
    if (filters.sortOrder && filters.sortOrder !== 'desc') {
        params.set('sortOrder', filters.sortOrder);
    }
    
    return params;
}

export function urlParamsToFilters(searchParams: URLSearchParams): Partial<FiltersState> {
    const filters: Partial<FiltersState> = {};
    
    const statusParams = searchParams.getAll('status');
    if (statusParams.length > 0) {
        filters.status = statusParams.filter((s): s is StatusFilter => 
            ['pending', 'approved', 'rejected', 'draft'].includes(s)
        ) as StatusFilter[];
    }
    
    const categoryId = searchParams.get('categoryId');
    if (categoryId) {
        const id = Number(categoryId);
        if (!isNaN(id)) {
            filters.categoryId = id;
        }
    }
    
    const minPrice = searchParams.get('minPrice');
    if (minPrice) {
        const price = Number(minPrice);
        if (!isNaN(price) && price >= 0) {
            filters.minPrice = price;
        }
    }
    
    const maxPrice = searchParams.get('maxPrice');
    if (maxPrice) {
        const price = Number(maxPrice);
        if (!isNaN(price) && price >= 0) {
            filters.maxPrice = price;
        }
    }
    
    const search = searchParams.get('search');
    if (search) {
        filters.search = search;
    }
    
    const sortBy = searchParams.get('sortBy');
    if (sortBy && ['createdAt', 'price', 'priority'].includes(sortBy)) {
        filters.sortBy = sortBy as SortBy;
    }
    
    const sortOrder = searchParams.get('sortOrder');
    if (sortOrder && ['asc', 'desc'].includes(sortOrder)) {
        filters.sortOrder = sortOrder as SortOrder;
    }
    
    return filters;
}

