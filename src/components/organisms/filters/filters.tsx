import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
    toggleStatus,
    setCategoryId,
    setMinPrice,
    setMaxPrice,
    setSearch,
    resetFilters,
} from '../../../features/filters/filtersSlice';
import type { StatusFilter } from '../../../types/filters';
import { extractUniqueCategories } from '../../../features/api/selectors';
import Button from '../../atoms/button/button';
import SearchInput from '../../molecules/searchInput/searchInput';
import StatusFilterGroup from '../../molecules/statusFilter/statusFilter';
import CategoryFilter from '../../molecules/categoryFilter/categoryFilter';
import PriceRangeFilter from '../../molecules/priceRangeFilter/priceRangeFilter';
import styles from './filters.module.scss';

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
    { value: 'pending', label: 'Ожидает' },
    { value: 'approved', label: 'Одобрено' },
    { value: 'rejected', label: 'Отклонено' },
    { value: 'draft', label: 'На доработке' },
];

function Filters() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => state.filters);
    const ads = useAppSelector((state) => state.ads.ads);
    
    const categories = ads.length > 0 ? extractUniqueCategories(ads) : [];
    const categoryOptions = categories.map((cat) => ({
        value: cat.id,
        label: cat.name,
    }));

    const handleStatusToggle = (status: StatusFilter) => {
        dispatch(toggleStatus(status));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        dispatch(setCategoryId(value ? Number(value) : null));
    };

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setMinPrice(value ? Number(value) : null));
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setMaxPrice(value ? Number(value) : null));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value));
    };

    const handleReset = () => {
        dispatch(resetFilters());
    };

    const hasActiveFilters =
        filters.status.length > 0 ||
        filters.categoryId !== null ||
        filters.minPrice !== null ||
        filters.maxPrice !== null ||
        filters.search.trim() !== '';

    return (
        <div className={styles.filters}>
            <h2 className={styles.title}>Фильтры и поиск</h2>

            <div className={styles.filterGroup}>
                <SearchInput value={filters.search} onChange={handleSearchChange} />
            </div>

            <div className={styles.filterGroup}>
                <StatusFilterGroup
                    statuses={filters.status}
                    options={STATUS_OPTIONS}
                    onToggle={handleStatusToggle}
                />
            </div>

            <div className={styles.filterGroup}>
                <CategoryFilter
                    categoryId={filters.categoryId}
                    options={categoryOptions}
                    onChange={handleCategoryChange}
                />
            </div>

            <div className={styles.filterGroup}>
                <PriceRangeFilter
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                    onMinPriceChange={handleMinPriceChange}
                    onMaxPriceChange={handleMaxPriceChange}
                />
            </div>

            {hasActiveFilters && (
                <div className={styles.resetButton}>
                    <Button onClick={handleReset}>Сбросить все фильтры</Button>
                </div>
            )}
        </div>
    );
}

export default Filters;

