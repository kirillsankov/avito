import ListCard from "../components/organisms/listCard/listCard";
import Pagination from "../components/organisms/pagination/pagination";
import Filters from "../components/organisms/filters/filters";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setCurrentPage } from "../features/page/pageSlice";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

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
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const prevFiltersRef = useRef(filters);

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const filtersChanged =
      JSON.stringify(prevFilters.status) !== JSON.stringify(filters.status) ||
      prevFilters.categoryId !== filters.categoryId ||
      prevFilters.minPrice !== filters.minPrice ||
      prevFilters.maxPrice !== filters.maxPrice ||
      prevFilters.search !== filters.search;

    if (filtersChanged) {
      dispatch(setCurrentPage(1));
      prevFiltersRef.current = filters;
    }
  }, [filters, dispatch]);

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
        <ListCard />
        <Pagination />
      </div>
    </motion.section>
  );
}

export default List;