import ListCard from "../components/organisms/listCard/listCard";
import Pagination from "../components/organisms/pagination/pagination";
import Filters from "../components/organisms/filters/filters";
import BulkActions from "../components/organisms/bulkActions/bulkActions";
import SortSelect from "../components/molecules/sortSelect/sortSelect";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setCurrentPage } from "../features/page/pageSlice";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { filtersToUrlParams, urlParamsToFilters } from "../utils/filtersUrl";
import { setStatus, setCategoryId, setMinPrice, setMaxPrice, setSearch, setSortBy, setSortOrder } from "../features/filters/filtersSlice";
import { useMetaTags } from "../hooks/useMetaTags";
import styles from './list.module.scss';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -20,
    },
};

const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.4,
};

function List() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const prevFiltersRef = useRef(filters);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isInitializedRef = useRef(false);
  const [refetchFn, setRefetchFn] = useState<(() => void) | null>(null);

  useMetaTags({
    title: 'Список объявлений - Avito Модерация',
    description: 'Просмотр и модерация объявлений. Фильтрация по категориям, статусу, цене и поиск по названию.'
  });

  useEffect(() => {
    if (isInitializedRef.current) return;
    
    const urlFilters = urlParamsToFilters(searchParams);
    if (Object.keys(urlFilters).length > 0) {
      if (urlFilters.status) {
        dispatch(setStatus(urlFilters.status));
      }
      if (urlFilters.categoryId !== undefined) {
        dispatch(setCategoryId(urlFilters.categoryId));
      }
      if (urlFilters.minPrice !== undefined) {
        dispatch(setMinPrice(urlFilters.minPrice));
      }
      if (urlFilters.maxPrice !== undefined) {
        dispatch(setMaxPrice(urlFilters.maxPrice));
      }
      if (urlFilters.search !== undefined) {
        dispatch(setSearch(urlFilters.search));
      }
      if (urlFilters.sortBy) {
        dispatch(setSortBy(urlFilters.sortBy));
      }
      if (urlFilters.sortOrder) {
        dispatch(setSortOrder(urlFilters.sortOrder));
      }
    }
    isInitializedRef.current = true;
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (!isInitializedRef.current) return;
    
    const prevFilters = prevFiltersRef.current;
    const filtersChanged =
      JSON.stringify(prevFilters.status) !== JSON.stringify(filters.status) ||
      prevFilters.categoryId !== filters.categoryId ||
      prevFilters.minPrice !== filters.minPrice ||
      prevFilters.maxPrice !== filters.maxPrice ||
      prevFilters.search !== filters.search ||
      prevFilters.sortBy !== filters.sortBy ||
      prevFilters.sortOrder !== filters.sortOrder;

    if (filtersChanged) {
      dispatch(setCurrentPage(1));
      prevFiltersRef.current = filters;
      
      const params = filtersToUrlParams(filters);
      navigate(`/list?${params.toString()}`, { replace: true });
    }
  }, [filters, dispatch, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      
      if (e.code === 'Slash') {
        e.preventDefault();
        const searchInput = document.getElementById('search') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <motion.section
      key={location.pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="container">
        <Filters />
        <div className={styles.sortSection}>
          <SortSelect />
        </div>
        <BulkActions onRefetch={refetchFn || undefined} />
        <ListCard 
          onErrorChange={setHasError}
          onLoadingChange={setIsLoading}
          onRefetchReady={(refetch) => {
            setRefetchFn(() => refetch);
          }}
        />
        {!hasError && !isLoading && <Pagination />}
      </div>
    </motion.section>
  );
}

export default List;