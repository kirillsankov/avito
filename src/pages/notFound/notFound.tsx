import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/atoms/button/button';
import Panel from '../../components/atoms/panel/panel';
import { HomeIcon } from '../../components/atoms/icons/icons';
import { useMetaTags } from '../../hooks/useMetaTags';
import styles from './notFound.module.scss';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -20,
    },
};

const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.4,
};

function NotFound() {
    const navigate = useNavigate();

    useMetaTags({
        title: '404 - Страница не найдена - Avito Модерация',
        description: 'Запрашиваемая страница не существует или была перемещена. Вернитесь на главную страницу.'
    });

    return (
        <motion.section 
            className={styles.notFound}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            <div className="container">
                <Panel>
                    <div className={styles.content}>
                        <div className={styles.number}>404</div>
                        <h1 className={styles.title}>Страница не найдена</h1>
                        <p className={styles.message}>
                            К сожалению, запрашиваемая страница не существует или была перемещена.
                        </p>
                        <Button 
                            onClick={() => navigate('/list')} 
                            variant="primary"
                            icon={<HomeIcon size={18} />}
                        >
                            Вернуться на главную
                        </Button>
                    </div>
                </Panel>
            </div>
        </motion.section>
    );
}

export default NotFound;

