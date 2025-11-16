import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSortBy, setSortOrder } from '../../../features/filters/filtersSlice';
import type { SortBy } from '../../../types/filters';
import { ClockIcon, ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon, StarIcon } from '../../atoms/icons/icons';
import styles from './sortSelect.module.scss';

const SORT_OPTIONS: { value: SortBy; label: string; baseIcon: React.ReactNode }[] = [
    { value: 'createdAt', label: 'По дате создания', baseIcon: <ClockIcon size={18} /> },
    { value: 'price', label: 'По цене', baseIcon: <ArrowUpDownIcon size={18} /> },
    { value: 'priority', label: 'По приоритету', baseIcon: <StarIcon size={18} /> },
];

function SortSelect() {
    const dispatch = useAppDispatch();
    const sortBy = useAppSelector((state) => state.filters.sortBy);
    const sortOrder = useAppSelector((state) => state.filters.sortOrder);

    const handleSortClick = (field: SortBy) => {
        if (sortBy === field) {
            if (sortOrder === 'desc') {
                dispatch(setSortOrder('asc'));
            } else {
                dispatch(setSortBy(null));
                dispatch(setSortOrder('desc'));
            }
        } else {
            dispatch(setSortBy(field));
            dispatch(setSortOrder('desc'));
        }
    };

    const getSortIcon = (field: SortBy) => {
        if (sortBy !== field) {
            const option = SORT_OPTIONS.find(opt => opt.value === field);
            return option?.baseIcon || <ArrowUpDownIcon size={18} />;
        }
        if (sortOrder === 'desc') {
            return <ArrowDownIcon size={18} />;
        }
        return <ArrowUpIcon size={18} />;
    };

    return (
        <div className={styles.sortSelect}>
            <label className={styles.label}>Сортировка:</label>
            <div className={styles.controls}>
                {SORT_OPTIONS.map((option) => {
                    const isActive = sortBy === option.value;
                    return (
                        <button
                            key={option.value}
                            type="button"
                            className={`${styles.sortButton} ${isActive ? styles.active : ''}`}
                            onClick={() => handleSortClick(option.value)}
                            title={option.label}
                        >
                            <span className={styles.icon}>{getSortIcon(option.value)}</span>
                            <span className={styles.buttonLabel}>{option.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default SortSelect;

