import styles from './input.module.scss';

interface InputProps {
    id?: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    min?: string | number;
    className?: string;
}

function Input({ 
    id, 
    type = 'text', 
    value, 
    onChange, 
    placeholder, 
    min,
    className = '' 
}: InputProps) {
    return (
        <input
            id={id}
            type={type}
            className={`${styles.input} ${className}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            min={min}
        />
    );
}

export default Input;

