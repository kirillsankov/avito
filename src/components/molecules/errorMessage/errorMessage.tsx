import Panel from '../../atoms/panel/panel';
import { XIcon } from '../../atoms/icons/icons';
import Button from '../../atoms/button/button';
import styles from './errorMessage.module.scss';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
    error: unknown;
    onRetry?: () => void;
    title?: string;
}

function ErrorMessage({ error, onRetry, title = 'Произошла ошибка' }: ErrorMessageProps) {
    const getErrorMessage = (error: unknown): string => {
        if (typeof error === 'string') {
            return error;
        }
        if (error && typeof error === 'object') {
            if ('data' in error && error.data && typeof error.data === 'object') {
                if ('message' in error.data) {
                    return String(error.data.message);
                }
                if ('error' in error.data) {
                    return String(error.data.error);
                }
            }
            
            if ('message' in error) {
                return String(error.message);
            }
            if ('status' in error) {
                const status = error.status;
                if (status === 'FETCH_ERROR') {
                    return 'Ошибка сети. Проверьте подключение к интернету';
                }
                if (status === 'PARSING_ERROR') {
                    return 'Ошибка обработки ответа сервера';
                }
                if (typeof status === 'number') {
                    if (status === 404) {
                        return 'Ресурс не найден';
                    }
                    if (status === 403) {
                        return 'Доступ запрещен';
                    }
                    if (status === 401) {
                        return 'Требуется авторизация';
                    }
                    if (status === 500) {
                        return 'Ошибка сервера';
                    }
                    if (status >= 500) {
                        return 'Ошибка сервера';
                    }
                    if (status >= 400) {
                        return 'Ошибка запроса';
                    }
                    return `Ошибка ${status}`;
                }
            }
            
            if ('originalStatus' in error && typeof error.originalStatus === 'number') {
                const status = error.originalStatus;
                if (status === 404) {
                    return 'Ресурс не найден';
                }
                if (status === 403) {
                    return 'Доступ запрещен';
                }
                if (status === 401) {
                    return 'Требуется авторизация';
                }
                if (status >= 500) {
                    return 'Ошибка сервера';
                }
                if (status >= 400) {
                    return 'Ошибка запроса';
                }
            }
        }
        return 'Произошла неизвестная ошибка';
    };

    const errorMessage = getErrorMessage(error);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <Panel>
                <div className={styles.errorMessage}>
                    <div className={styles.icon}>
                        <XIcon size={32} />
                    </div>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.message}>{errorMessage}</p>
                    {onRetry && (
                        <Button onClick={onRetry} variant="primary">
                            Попробовать снова
                        </Button>
                    )}
                </div>
            </Panel>
        </motion.div>
    );
}

export default ErrorMessage;

