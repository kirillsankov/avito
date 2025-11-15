import styles from './panel.module.scss';

interface PanelProps {
    children: React.ReactNode;
    mode?: 'light' | 'dark';
    className?: string;
}
function Panel({ children, mode = 'light', className }: PanelProps) {
    return (
        <div className={`${styles.panel} ${styles[mode]} ${className || ''}`}>
            {children}
        </div>
    );
}

export default Panel;