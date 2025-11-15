import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from './hooks/redux';
import AppRoutes from './routes/routes';
import Header from './components/organisms/header/header';
import Footer from './components/organisms/footer/footer';
import styles from './App.module.scss';

function App() {
  const theme = useAppSelector((state) => state.theme.theme);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <AnimatePresence mode="wait">
          <AppRoutes key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
