import type { Ad } from '../../../types/apiTpype';
import styles from './card.module.scss';
import Button from '../../atoms/button/button';

function Card({ ad }: { ad: Ad }) {
    return <div className={styles.card}>
        <div>
            <div>
                <img src={ad.images[0]} alt={ad.title} />
            </div>
            <div>
                <h2>{ad.title}</h2>
                <p>{ad.price}</p>
                <p>{ad.category}</p>
                <p>{ad.createdAt}</p>
            </div>
        </div>
        <Button onClick={() => { console.log('view ' + ad.id); }}>
            <p>Открыть</p>
        </Button>
    </div>;
}

export default Card;