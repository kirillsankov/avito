import { useGetAdsQuery } from '../../../features/api/apiSlice';
import Card from '../../molecules/card/card';
import Spinner from '../../atoms/spinner/spinner';
import ErrorMessage from '../../molecules/errorMessage/errorMessage';
import type { Ad } from '../../../types/apiType';
import styles from './listCard.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setTotalPages, setTotalItems } from '../../../features/page/pageSlice';
import { setAds } from '../../../features/ads/adsSlice';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95,
    },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: index * 0.05,
            duration: 0.3,
            ease: "easeOut" as const,
        },
    }),
};

interface ListCardProps {
    onErrorChange?: (hasError: boolean) => void;
    onLoadingChange?: (isLoading: boolean) => void;
    onRefetchReady?: (refetch: () => void) => void;
}

function ListCard({ onErrorChange, onLoadingChange, onRefetchReady }: ListCardProps = {}) {
    const page = useAppSelector((state) => state.page.currentPage)
    const filters = useAppSelector((state) => state.filters)
    const dispatch = useAppDispatch();
    
    const { data, isLoading, error, refetch } = useGetAdsQuery({
        page,
        status: filters.status.length > 0 ? filters.status : undefined,
        categoryId: filters.categoryId,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        search: filters.search.trim() || undefined,
        sortBy: filters.sortBy || undefined,
        sortOrder: filters.sortOrder,
    }, {
        pollingInterval: 30000,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });
    
    useEffect(() => {
        if (onErrorChange) {
            onErrorChange(!!error);
        }
    }, [error, onErrorChange]);
    
    useEffect(() => {
        if (onLoadingChange) {
            onLoadingChange(isLoading);
        }
    }, [isLoading, onLoadingChange]);
    
    useEffect(() => {
        if(data?.pagination) {
            dispatch(setTotalPages(data.pagination.totalPages))
            dispatch(setTotalItems(data.pagination.totalItems))
        }
        if(data?.ads) {
            dispatch(setAds(data.ads))
        }
    }, [data, dispatch])
    
    useEffect(() => {
        if (onRefetchReady) {
            onRefetchReady(refetch);
        }
    }, [refetch, onRefetchReady])
    
    if (isLoading) return <Spinner size="large" />;
    if (error) {
        return (
            <ErrorMessage 
                error={error} 
                title="Ошибка загрузки объявлений"
                onRetry={() => refetch()}
            />
        );
    }

    return <ul className={styles.listCard}>
        {data?.ads?.map((ad: Ad, index: number) => (
            <motion.li
                key={ad.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
            >
                <Card ad={ad} />
            </motion.li>
        ))}
    </ul>;
}

export default ListCard;