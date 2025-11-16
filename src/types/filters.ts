export type StatusFilter = 'pending' | 'approved' | 'rejected' | 'draft';

export type SortBy = 'createdAt' | 'price' | 'priority' | null;
export type SortOrder = 'asc' | 'desc';

export interface SortState {
    sortBy: SortBy;
    sortOrder: SortOrder;
}

export interface FiltersState {
    status: StatusFilter[];
    categoryId: number | null;
    minPrice: number | null;
    maxPrice: number | null;
    search: string;
    sortBy: SortBy;
    sortOrder: SortOrder;
}

