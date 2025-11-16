import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Panel from '../../atoms/panel/panel';
import type { ActivityData } from '../../../types/moderator';
import { formatDateShort } from '../../../utils/format';
import styles from './activityChart.module.scss';

interface ActivityChartProps {
    data: ActivityData[];
}

function ActivityChart({ data }: ActivityChartProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 480);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const formattedData = data.map((item) => ({
        ...item,
        dateLabel: formatDateShort(item.date),
        total: item.approved + item.rejected + item.requestChanges,
    }));

    return (
        <Panel>
            <div className={styles.chartContainer}>
                <h3 className={styles.title}>Активность по дням</h3>
                <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
                    <BarChart data={formattedData} margin={{ left: -20, right: 20, top: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dateLabel" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="approved" stackId="a" fill="var(--success-color)" name="Одобрено" />
                        <Bar dataKey="rejected" stackId="a" fill="var(--danger-color)" name="Отклонено" />
                        <Bar dataKey="requestChanges" stackId="a" fill="var(--warning-color)" name="На доработку" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Panel>
    );
}

export default ActivityChart;

