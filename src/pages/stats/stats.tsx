import { useGetModeratorStatsQuery, useGetActivityChartQuery, useGetDecisionsChartQuery, useGetCategoriesChartQuery } from '../../features/api/apiSlice';
import MetricCard from '../../components/molecules/metricCard/metricCard';
import ActivityChart from '../../components/organisms/activityChart/activityChart';
import DecisionsChart from '../../components/organisms/decisionsChart/decisionsChart';
import CategoryChart from '../../components/organisms/categoryChart/categoryChart';
import Spinner from '../../components/atoms/spinner/spinner';
import { ChartBarIcon, ChartLineIcon, ChartAreaIcon, ClipboardIcon, CheckIcon, XIcon, ClockIcon } from '../../components/atoms/icons/icons';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
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

function Stats() {
    const location = useLocation();
    const chartParams = { period: 'week' as const };

    const { data: moderator, isLoading: isLoadingModerator, error: errorModerator } = useGetModeratorStatsQuery();
    const { data: activityData, isLoading: isLoadingActivity } = useGetActivityChartQuery(chartParams);
    const { data: decisionsData, isLoading: isLoadingDecisions } = useGetDecisionsChartQuery(chartParams);
    const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesChartQuery(chartParams);

    const isLoading = isLoadingModerator || isLoadingActivity || isLoadingDecisions || isLoadingCategories;
    const error = errorModerator;

    if (isLoading) return <Spinner size="large" />;
    if (error) return <div>Error: {JSON.stringify(error)}</div>;
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

    const rejectionRate = 100 - stats.approvalRate;

    const metricCards = [
        {
            title: 'Всего проверено за сегодня',
            value: stats.todayReviewed,
            icon: <ChartBarIcon size={32} />,
            variant: 'primary' as const,
        },
        {
            title: 'Всего проверено за неделю',
            value: stats.thisWeekReviewed,
            icon: <ChartLineIcon size={32} />,
            variant: 'info' as const,
        },
        {
            title: 'Всего проверено за месяц',
            value: stats.thisMonthReviewed,
            icon: <ChartAreaIcon size={32} />,
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
            value: `${stats.approvalRate.toFixed(1)}%`,
            icon: <CheckIcon size={32} />,
            variant: 'success' as const,
        },
        {
            title: 'Процент отклоненных',
            value: `${rejectionRate.toFixed(1)}%`,
            icon: <XIcon size={32} />,
            variant: 'danger' as const,
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

                <div className={styles.metricsGrid}>
                    {metricCards.map((card, index) => (
                        <MetricCard
                            key={index}
                            title={card.title}
                            value={card.value}
                            icon={card.icon}
                            variant={card.variant}
                        />
                    ))}
                </div>

                <div className={styles.chartsGrid}>
                    {activityData && <ActivityChart data={activityData} />}
                    {decisionsData && <DecisionsChart data={decisionsData} />}
                </div>

                <div className={styles.categoryChart}>
                    {categoriesData && <CategoryChart data={categoriesData} />}
                </div>
            </div>
        </motion.section>
    );
}

export default Stats;