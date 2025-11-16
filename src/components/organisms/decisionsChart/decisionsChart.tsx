import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Panel from '../../atoms/panel/panel';
import styles from './decisionsChart.module.scss';
import type { DecisionsData } from '../../../types/moderator';
import { formatPercentage } from '../../../utils/format';

interface DecisionsChartProps {
    data: DecisionsData;
}

function DecisionsChart({ data }: DecisionsChartProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 480);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const chartData = [
        { name: 'Одобрено', value: data.approved, color: 'var(--success-color)' },
        { name: 'Отклонено', value: data.rejected, color: 'var(--danger-color)' },
        { name: 'На доработку', value: data.requestChanges, color: 'var(--warning-color)' },
    ].filter((item) => item.value > 0);

    return (
        <Panel>
            <div className={styles.chartContainer}>
                <h3 className={styles.title}>Распределение решений</h3>
                <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={isMobile ? 80 : 100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip 
                            formatter={(value: number, name: string) => {
                                return [formatPercentage(value), name];
                            }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Panel>
    );
}

export default DecisionsChart;

