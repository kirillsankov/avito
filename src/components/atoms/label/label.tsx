import styles from './label.module.scss';

interface LabelProps {
    htmlFor?: string;
    children: React.ReactNode;
    className?: string;
}

function Label({ htmlFor, children, className = '' }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className={`${styles.label} ${className}`}>
            {children}
        </label>
    );
}

export default Label;

