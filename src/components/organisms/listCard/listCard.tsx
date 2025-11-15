import { useGetAdsQuery } from '../../../features/api/apiSlice';
import Card from '../../molecules/card/card';
import Spinner from '../../atoms/spinner/spinner';
import type { Ad } from '../../../types/apiType';
import styles from './listCard.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setTotalPages, setTotalItems } from '../../../features/page/pageSlice';
import { setAds } from '../../../features/ads/adsSlice';
import { useEffect } from 'react';

function ListCard() {
    const page = useAppSelector((state) => state.page.currentPage)
    const filters = useAppSelector((state) => state.filters)
    const dispatch = useAppDispatch();
    
    const { data, isLoading, error } = useGetAdsQuery({
        page,
        status: filters.status.length > 0 ? filters.status : undefined,
        categoryId: filters.categoryId,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        search: filters.search.trim() || undefined,
    });
    
    useEffect(() => {
        if(data?.pagination) {
            dispatch(setTotalPages(data.pagination.totalPages))
            dispatch(setTotalItems(data.pagination.totalItems))
        }
        if(data?.ads) {
            dispatch(setAds(data.ads))
        }
    }, [data, dispatch])
    
    if (isLoading) return <Spinner size="large" />;
    if (error) return <div>Error: {JSON.stringify(error)}</div>;

    return <ul className={styles.listCard}>
        {data?.ads?.map((ad: Ad) => (
            <li key={ad.id}>
                <Card ad={ad} />
            </li>
        ))}
    </ul>;
}

export default ListCard;