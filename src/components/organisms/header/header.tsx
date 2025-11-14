import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleTheme } from '../../../features/theme/themeSlice';
import styles from './header.module.scss';

function Header() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.theme);

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>Avito</div>
                <button 
                    className={styles.themeButton} 
                    onClick={handleThemeToggle} 
                    aria-label="Переключить тему"
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </header>
    );
}

export default Header;

