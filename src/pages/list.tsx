import ListCard from "../components/organisms/listCard/listCard";
import Pagination from "../components/organisms/pagination/pagination";
import Filters from "../components/organisms/filters/filters";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setCurrentPage } from "../features/page/pageSlice";

function List() {
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

  return <section>
      <div className="container">
        <Filters />
        <ListCard />
        <Pagination />
      </div>
  </section>;
}

export default List;