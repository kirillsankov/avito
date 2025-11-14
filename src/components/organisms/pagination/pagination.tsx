import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { nextPage, prevPage, setCurrentPage } from "../../../features/page/pageSlice";
import styles from './pagination.module.scss';

function Pagination() {
    const currentPage = useAppSelector((state) => state.page.currentPage);
    const totalPages = useAppSelector((state) => state.page.totalPages);
    const totalItems = useAppSelector((state) => state.page.totalItems);
    const dispatch = useAppDispatch();

    const getPageNumbers = (): number[] => {
        const maxVisible = 5;
        const halfVisible = Math.floor(maxVisible / 2);
        
        let start = Math.max(1, currentPage - halfVisible);
        const end = Math.min(totalPages, start + maxVisible - 1);
        
        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }
        
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const pageNumbers = getPageNumbers();

    const handlePageClick = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className={styles.pagination}>
            <div className={styles.controls}>
                <button
                    className={styles.arrowButton}
                    onClick={() => dispatch(prevPage())}
                    disabled={currentPage <= 1}
                    aria-label="Предыдущая страница"
                >
                    ←
                </button>

                <div className={styles.pageNumbers}>
                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                            onClick={() => handlePageClick(page)}
                            aria-label={`Страница ${page}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    className={styles.arrowButton}
                    onClick={() => dispatch(nextPage())}
                    disabled={currentPage >= totalPages}
                    aria-label="Следующая страница"
                >
                    →
                </button>
            </div>
            <div className={styles.info}>
                {totalItems > 0 && (
                    <span className={styles.totalItems}>
                        Всего объявлений: {totalItems}
                    </span>
                )}
            </div>
        </div>
    );
}

export default Pagination;