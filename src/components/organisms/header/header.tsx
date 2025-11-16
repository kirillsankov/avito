import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleTheme } from '../../../features/theme/themeSlice';
import { MoonIcon, SunIcon, MenuIcon, XIcon } from '../../atoms/icons/icons';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './header.module.scss';

function Header() {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.theme);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
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
                <div className={styles.rightSection}>
                    <button 
                        className={styles.themeButton} 
                        onClick={handleThemeToggle} 
                        aria-label="Переключить тему"
                    >
                        {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
                    </button>
                    <button 
                        className={styles.menuButton} 
                        onClick={handleMenuToggle} 
                        aria-label="Меню"
                    >
                        {isMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        className={styles.mobileNav}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path || 
                                (item.path === '/list' && location.pathname.startsWith('/item'));
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                                    onClick={handleLinkClick}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;

