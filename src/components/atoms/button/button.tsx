import styles from './button.module.scss';

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'success' | 'danger' | 'warning';
    icon?: React.ReactNode;
    disabled?: boolean;
}

function Button({ children, onClick, variant = 'primary', icon, disabled = false }: ButtonProps) {
    return (
        <button 
            className={`${styles.button} ${styles[variant]}`} 
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {children}
        </button>
    );
}

export default Button;