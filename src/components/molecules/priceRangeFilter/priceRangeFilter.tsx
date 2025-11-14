import Input from '../../atoms/input/input';
import Label from '../../atoms/label/label';
import styles from './priceRangeFilter.module.scss';

interface PriceRangeFilterProps {
    minPrice: number | null;
    maxPrice: number | null;
    onMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PriceRangeFilter({
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange,
}: PriceRangeFilterProps) {
    return (
        <div className={styles.priceRangeFilter}>
            <Label>Диапазон цен</Label>
            <div className={styles.priceRange}>
                <Input
                    type="number"
                    value={minPrice || ''}
                    onChange={onMinPriceChange}
                    placeholder="От"
                    min="0"
                />
                <span className={styles.priceSeparator}>—</span>
                <Input
                    type="number"
                    value={maxPrice || ''}
                    onChange={onMaxPriceChange}
                    placeholder="До"
                    min="0"
                />
            </div>
        </div>
    );
}

export default PriceRangeFilter;

