import Panel from '../../atoms/panel/panel';
import styles from './metricCard.module.scss';

interface MetricCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    variant?: 'primary' | 'success' | 'danger' | 'info' | 'warning';
}

function MetricCard({ title, value, icon, variant = 'primary' }: MetricCardProps) {
    return (
        <Panel>
            <div className={`${styles.metricCard} ${styles[variant]}`}>
                {icon && <div className={styles.icon}>{icon}</div>}
                <div className={styles.content}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.value}>{value}</div>
                </div>
            </div>
        </Panel>
    );
}

export default MetricCard;

