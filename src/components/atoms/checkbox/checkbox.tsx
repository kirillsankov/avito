import styles from './checkbox.module.scss';

interface CheckboxProps {
    id?: string;
    checked: boolean;
    onChange: () => void;
    label: string;
    className?: string;
}

function Checkbox({ id, checked, onChange, label, className = '' }: CheckboxProps) {
    return (
        <label className={`${styles.checkboxLabel} ${className}`}>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className={styles.checkbox}
            />
            <span>{label}</span>
        </label>
    );
}

export default Checkbox;

