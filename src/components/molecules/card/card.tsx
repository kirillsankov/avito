import type { Ad } from '../../../types/apiType';
import styles from './card.module.scss';
import Button from '../../atoms/button/button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setActiveAdId, toggleAdSelection } from '../../../features/ads/adsSlice';
import { formatPrice, formatDate } from '../../../utils/format';
import { motion } from 'framer-motion';

interface CardProps {
    ad: Ad;
}

function Card({ ad }: CardProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const selectionMode = useAppSelector((state) => state.ads.selectionMode);
    const selectedAdIds = useAppSelector((state) => state.ads.selectedAdIds);
    const isSelected = selectedAdIds.includes(ad.id);

    const handleOpen = () => {
        if (selectionMode) {
            dispatch(toggleAdSelection(ad.id));
        } else {
            dispatch(setActiveAdId(ad.id));
            navigate(`/item/${ad.id}`);
        }
    };
    
    const handleCardClick = () => {
        if (selectionMode) {
            dispatch(toggleAdSelection(ad.id));
        }
    };
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        dispatch(toggleAdSelection(ad.id));
    };

    return (
        <motion.div 
            className={`${styles.card} ${selectionMode ? styles.selectionMode : ''} ${isSelected ? styles.selected : ''}`}
            onClick={selectionMode ? handleCardClick : undefined}
        >
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
                    <div className={styles.subtitle}>
                        <span className={`${styles.status} ${styles[ad.status]}`}>
                            {ad.status === 'pending' ? 'На модерации' :
                            ad.status === 'approved' ? 'Одобрено' :
                            ad.status === 'rejected' ? 'Отклонено' :
                            'На доработке'}
                        </span>
                        {ad.priority === 'urgent' && (
                            <span className={styles.priority}>
                                Срочный
                            </span>
                        )}
                    </div>
                    <div className={styles.price}>{formatPrice(ad.price)}</div>
                    <div className={styles.meta}>
                        <span className={styles.category}>{ad.category}</span>
                        <span className={styles.date}>{formatDate(ad.createdAt)}</span>
                    </div>
                </div>
            </div>
            {selectionMode ? (
                <div className={styles.checkboxWrapper}>
                    <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isSelected}
                        onChange={handleCheckboxChange}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            ) : (
                <Button onClick={handleOpen}>
                    Открыть
                </Button>
            )}
        </motion.div>
    );
}

export default Card;