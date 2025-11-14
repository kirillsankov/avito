export type StatusFilter = 'pending' | 'approved' | 'rejected' | 'draft';

export interface FiltersState {
    status: StatusFilter[];
    categoryId: number | null;
    minPrice: number | null;
    maxPrice: number | null;
    search: string;
}

