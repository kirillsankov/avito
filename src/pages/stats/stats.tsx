import { useState, useEffect } from 'react';
import { useGetModeratorStatsQuery, useGetActivityChartQuery, useGetDecisionsChartQuery, useGetCategoriesChartQuery } from '../../features/api/apiSlice';
import MetricCard from '../../components/molecules/metricCard/metricCard';
import ActivityChart from '../../components/organisms/activityChart/activityChart';
import DecisionsChart from '../../components/organisms/decisionsChart/decisionsChart';
import CategoryChart from '../../components/organisms/categoryChart/categoryChart';
import Spinner from '../../components/atoms/spinner/spinner';
import ErrorMessage from '../../components/molecules/errorMessage/errorMessage';
import { ChartBarIcon, ClipboardIcon, CheckIcon, XIcon, ClockIcon, DownloadIcon, EditIcon } from '../../components/atoms/icons/icons';
import Button from '../../components/atoms/button/button';
import { exportToCSV, exportToPDF } from '../../utils/export';
import { formatPercentage } from '../../utils/format';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import type { ChartPeriod } from '../../types/moderator';
import { useMetaTags } from '../../hooks/useMetaTags';
import styles from './stats.module.scss';

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

const getButtonVariants = (isMobile: boolean) => ({
    inactive: {
        scale: 1,
    },
    active: {
        scale: isMobile ? 1 : 1.05,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 17,
        },
    },
    tap: {
        scale: 0.95,
    },
});

const cardVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.95,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 24,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.95,
        transition: {
            duration: 0.2,
        },
    },
};

const chartVariants = {
    initial: {
        opacity: 0,
        scale: 0.98,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut" as const,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        transition: {
            duration: 0.2,
        },
    },
};

function Stats() {
    const location = useLocation();
    const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>('week');
    const [isMobile, setIsMobile] = useState(false);
    const chartParams = { period: selectedPeriod };

    useMetaTags({
        title: 'Статистика модератора - Avito Модерация',
        description: 'Статистика работы модератора: количество проверенных объявлений, процент одобренных и отклоненных, активность по дням и категориям.'
    });

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 480);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const buttonVariants = getButtonVariants(isMobile);

    const { data: moderator, isLoading: isLoadingModerator, error: errorModerator, refetch: refetchModerator } = useGetModeratorStatsQuery();
    const { data: activityData, isLoading: isLoadingActivity, error: errorActivity, refetch: refetchActivity } = useGetActivityChartQuery(chartParams);
    const { data: decisionsData, isLoading: isLoadingDecisions, error: errorDecisions, refetch: refetchDecisions } = useGetDecisionsChartQuery(chartParams);
    const { data: categoriesData, isLoading: isLoadingCategories, error: errorCategories, refetch: refetchCategories } = useGetCategoriesChartQuery(chartParams);

    const isLoading = isLoadingModerator || isLoadingActivity || isLoadingDecisions || isLoadingCategories;
    const error = errorModerator || errorActivity || errorDecisions || errorCategories;

    if (isLoading) return <Spinner size="large" />;
    if (error) {
        return (
            <motion.section 
                className={styles.stats}
                key={location.pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
            >
                <div className="container">
                    <ErrorMessage 
                        error={error} 
                        title="Ошибка загрузки статистики"
                        onRetry={() => {
                            refetchModerator();
                            refetchActivity();
                            refetchDecisions();
                            refetchCategories();
                        }}
                    />
                </div>
            </motion.section>
        );
    }
    if (!moderator) return <div>Нет данных</div>;

    const stats = moderator.statistics;

    const formatAverageTime = (seconds: number): string => {
        if (seconds < 60) {
            return `${Math.round(seconds)} сек`;
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes} мин ${remainingSeconds} сек`;
    };

    const totalApproved = activityData 
        ? activityData.reduce((sum, day) => sum + day.approved, 0)
        : 0;

    const totalRejected = activityData 
        ? activityData.reduce((sum, day) => sum + day.rejected, 0)
        : 0;

    const totalRequestChanges = activityData 
        ? activityData.reduce((sum, day) => sum + day.requestChanges, 0)
        : 0;

    const totalReviewed = totalApproved + totalRejected + totalRequestChanges;

    const approvalRate = totalReviewed > 0
        ? (totalApproved / totalReviewed) * 100
        : 0;

    const rejectionRate = totalReviewed > 0
        ? (totalRejected / totalReviewed) * 100
        : 0;

    const requestChangesRate = totalReviewed > 0
        ? (totalRequestChanges / totalReviewed) * 100
        : 0;

    const getPeriodTitle = () => {
        switch (selectedPeriod) {
            case 'today':
                return 'Сегодня';
            case 'week':
                return 'Последние 7 дней';
            case 'month':
                return 'Последние 30 дней';
            default:
                return 'За период';
        }
    };

    const metricCards = [
        {
            title: `Всего проверено (${getPeriodTitle().toLowerCase()})`,
            value: totalReviewed,
            icon: <ChartBarIcon size={32} />,
            variant: 'primary' as const,
        },
        {
            title: 'Всего проверено (всего)',
            value: stats.totalReviewed,
            icon: <ClipboardIcon size={32} />,
            variant: 'info' as const,
        },
        {
            title: 'Процент одобренных',
            value: `${formatPercentage(approvalRate)}%`,
            icon: <CheckIcon size={32} />,
            variant: 'success' as const,
        },
        {
            title: 'Процент отклоненных',
            value: `${formatPercentage(rejectionRate)}%`,
            icon: <XIcon size={32} />,
            variant: 'danger' as const,
        },
        {
            title: 'Процент на доработку',
            value: `${formatPercentage(requestChangesRate)}%`,
            icon: <EditIcon size={32} />,
            variant: 'warning' as const,
        },
        {
            title: 'Среднее время на проверку',
            value: formatAverageTime(stats.averageReviewTime),
            icon: <ClockIcon size={32} />,
            variant: 'info' as const,
        },
    ];

    return (
        <motion.section 
            className={styles.stats}
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            <div className="container">
                <div className={styles.header}>
                    <h1 className={styles.title}>Статистика модератора</h1>
                    <div className={styles.moderatorInfo}>
                        <div className={styles.moderatorName}>{moderator.name}</div>
                        <div className={styles.moderatorRole}>{moderator.role}</div>
                    </div>
                </div>

                <div className={styles.periodFilter}>
                    <div className={styles.filterButtons}>
                        <motion.button
                            className={`${styles.periodButton} ${selectedPeriod === 'today' ? styles.active : ''}`}
                            onClick={() => setSelectedPeriod('today')}
                            variants={buttonVariants}
                            initial="inactive"
                            animate={selectedPeriod === 'today' ? 'active' : 'inactive'}
                            whileTap="tap"
                        >
                            Сегодня
                        </motion.button>
                        <motion.button
                            className={`${styles.periodButton} ${selectedPeriod === 'week' ? styles.active : ''}`}
                            onClick={() => setSelectedPeriod('week')}
                            variants={buttonVariants}
                            initial="inactive"
                            animate={selectedPeriod === 'week' ? 'active' : 'inactive'}
                            whileTap="tap"
                        >
                            Последние 7 дней
                        </motion.button>
                        <motion.button
                            className={`${styles.periodButton} ${selectedPeriod === 'month' ? styles.active : ''}`}
                            onClick={() => setSelectedPeriod('month')}
                            variants={buttonVariants}
                            initial="inactive"
                            animate={selectedPeriod === 'month' ? 'active' : 'inactive'}
                            whileTap="tap"
                        >
                            Последние 30 дней
                        </motion.button>    
                    </div>
                    <div className={styles.exportButtons}>
                        <Button
                            onClick={() => exportToCSV(moderator, activityData, decisionsData, categoriesData, selectedPeriod)}
                            variant="primary"
                            icon={<DownloadIcon size={18} />}
                        >
                            Экспорт CSV
                        </Button>
                        <Button
                            onClick={() => exportToPDF(moderator, activityData, decisionsData, categoriesData, selectedPeriod)}
                            variant="primary"
                            icon={<DownloadIcon size={18} />}
                        >
                            Экспорт PDF
                        </Button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div 
                        key={`metrics-${selectedPeriod}`}
                        className={styles.metricsGrid}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={{
                            initial: { opacity: 0 },
                            animate: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.05,
                                },
                            },
                            exit: { opacity: 0 },
                        }}
                    >
                        {metricCards.map((card) => (
                            <motion.div
                                key={`${card.title}-${selectedPeriod}`}
                                variants={cardVariants}
                            >
                                <MetricCard
                                    title={card.title}
                                    value={card.value}
                                    icon={card.icon}
                                    variant={card.variant}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.div 
                        key={`charts-${selectedPeriod}`}
                        className={styles.chartsGrid}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={{
                            initial: { opacity: 0 },
                            animate: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                            exit: { opacity: 0 },
                        }}
                    >
                        {activityData && (
                            <motion.div variants={chartVariants}>
                                <ActivityChart data={activityData} />
                            </motion.div>
                        )}
                        {decisionsData && (
                            <motion.div variants={chartVariants}>
                                <DecisionsChart data={decisionsData} />
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {categoriesData && (
                        <motion.div 
                            key={`category-${selectedPeriod}`}
                            className={styles.categoryChart}
                            variants={chartVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <CategoryChart data={categoriesData} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
    );
}

export default Stats;