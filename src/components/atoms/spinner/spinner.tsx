import styles from './spinner.module.scss';

interface SpinnerProps {
    size?: 'small' | 'medium' | 'large';
}

function Spinner({ size = 'medium' }: SpinnerProps) {
    return (
        <div className={`${styles.spinner} ${styles[size]}`}>
            <div className={styles.spinnerCircle}></div>
        </div>
    );
}

export default Spinner;

