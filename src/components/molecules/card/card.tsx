import type { Ad } from '../../../types/apiType';
import styles from './card.module.scss';
import Button from '../../atoms/button/button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux';
import { setActiveAdId } from '../../../features/ads/adsSlice';
import { formatPrice, formatDate } from '../../../utils/format';

function Card({ ad }: { ad: Ad }) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleOpen = () => {
        dispatch(setActiveAdId(ad.id));
        navigate(`/item/${ad.id}`);
    };

    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <div className={styles.imageWrapper}>
                    <img 
                        src={ad.images[0]} 
                        alt={ad.title}
                        className={styles.image}
                    />
                </div>
                <div className={styles.info}>
                    <h3 className={styles.title}>{ad.title}</h3>
                    <div className={styles.price}>{formatPrice(ad.price)}</div>
                    <div className={styles.meta}>
                        <span className={styles.category}>{ad.category}</span>
                        <span className={styles.date}>{formatDate(ad.createdAt)}</span>
                    </div>
                </div>
            </div>
            <Button onClick={handleOpen}>
                Открыть
            </Button>
        </div>
    );
}

export default Card;