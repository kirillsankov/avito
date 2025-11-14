import { useEffect } from 'react';
import { useAppSelector } from './hooks/redux';
import AppRoutes from './routes/routes';
import Header from './components/organisms/header/header';
import Footer from './components/organisms/footer/footer';
import styles from './App.module.scss';

function App() {
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
