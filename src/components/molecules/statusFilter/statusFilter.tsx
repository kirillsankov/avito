import Checkbox from '../../atoms/checkbox/checkbox';
import Label from '../../atoms/label/label';
import styles from './statusFilter.module.scss';
import type { StatusFilter } from '../../../types/filters';

interface StatusOption {
    value: StatusFilter;
    label: string;
}

interface StatusFilterProps {
    statuses: StatusFilter[];
    options: StatusOption[];
    onToggle: (status: StatusFilter) => void;
}

function StatusFilterGroup({ statuses, options, onToggle }: StatusFilterProps) {
    return (
        <div className={styles.statusFilter}>
            <Label>Статус</Label>
            <div className={styles.checkboxGroup}>
                {options.map((option) => (
                    <Checkbox
                        key={option.value}
                        checked={statuses.includes(option.value)}
                        onChange={() => onToggle(option.value)}
                        label={option.label}
                    />
                ))}
            </div>
        </div>
    );
}

export default StatusFilterGroup;

