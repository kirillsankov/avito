import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleTheme } from '../../../features/theme/themeSlice';
import { MoonIcon, SunIcon } from '../../atoms/icons/icons';
import styles from './header.module.scss';

function Header() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.theme);
    const location = useLocation();

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    const navItems = [
        { path: '/list', label: 'Список объявлений' },
        { path: '/stats', label: 'Статистика' },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/list" className={styles.logo}>
                    Avito
                </Link>
                <nav className={styles.nav}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path || 
                            (item.path === '/list' && location.pathname.startsWith('/item'));
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <button 
                    className={styles.themeButton} 
                    onClick={handleThemeToggle} 
                    aria-label="Переключить тему"
                >
                    {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
                </button>
            </div>
        </header>
    );
}

export default Header;

