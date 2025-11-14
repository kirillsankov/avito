import styles from './select.module.scss';

interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    id?: string;
    value: string | number | null;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    className?: string;
}

function Select({ id, value, onChange, options, className = '' }: SelectProps) {
    return (
        <select
            id={id}
            className={`${styles.select} ${className}`}
            value={value || ''}
            onChange={onChange}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default Select;

