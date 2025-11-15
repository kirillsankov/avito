import { motion } from 'framer-motion';
import styles from './button.module.scss';

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'success' | 'danger' | 'warning';
    icon?: React.ReactNode;
    disabled?: boolean;
    disableIconAnimation?: boolean;
}

const buttonVariants = {
    hover: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const iconVariants = {
    hover: {
        scale: 1.15,
        rotate: 5,
        transition: {
            duration: 0.2
        }
    }
};

function Button({ children, onClick, variant = 'primary', icon, disabled = false, disableIconAnimation = false }: ButtonProps) {
    return (
        <motion.button 
            className={`${styles.button} ${styles[variant]}`} 
            onClick={onClick}
            disabled={disabled}
            variants={buttonVariants}
            whileHover={!disabled ? "hover" : undefined}
        >
            {icon && (
                disableIconAnimation ? (
                    <span className={styles.icon}>
                        {icon}
                    </span>
                ) : (
                    <motion.span 
                        className={styles.icon}
                        variants={iconVariants}
                    >
                        {icon}
                    </motion.span>
                )
            )}
            {children}
        </motion.button>
    );
}

export default Button;