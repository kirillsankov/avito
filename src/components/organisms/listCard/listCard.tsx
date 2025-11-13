import { useGetAdsQuery } from '../../../features/api/apiSlice';
import Card from '../../molecules/card/card';
import type { Ad } from '../../../types/apiTpype';
import styles from './listCard.module.scss';

function ListCard() {

    const { data, isLoading, error } = useGetAdsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {JSON.stringify(error)}</div>;
    const ads = data?.ads;

    return <ul className={styles.listCard}>
        {ads.map((ad: Ad) => (
            <li key={ad.id}>
                <Card ad={ad} />
            </li>
        ))}
    </ul>;
}

export default ListCard;