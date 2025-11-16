import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Panel from '../../atoms/panel/panel';
import type { CategoryStats } from '../../../types/moderator';
import styles from './categoryChart.module.scss';

interface CategoryChartProps {
    data: CategoryStats;
}

function CategoryChart({ data }: CategoryChartProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 480);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const chartData = Object.entries(data).map(([categoryName, count]) => ({
        categoryName,
        count,
    }));

    const formatCategoryName = (name: string, maxLength: number) => {
        if (name.length <= maxLength) return name;
        return name.substring(0, maxLength - 3) + '...';
    };

    const yAxisWidth = isMobile ? 120 : 180;
    const maxNameLength = isMobile ? 15 : 25;

    return (
        <Panel>
            <div className={styles.chartContainer}>
                <h3 className={styles.title}>Проверенные объявления по категориям</h3>
                <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
                    <BarChart data={chartData} layout="vertical" margin={{ left: -20, right: 20, top: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis 
                            dataKey="categoryName" 
                            type="category" 
                            width={yAxisWidth}
                            tickFormatter={(value) => formatCategoryName(value, maxNameLength)}
                            tick={{ fontSize: isMobile ? 11 : 12 }}
                        />
                        <Tooltip 
                            formatter={(value: number) => value}
                            labelFormatter={(label: string) => label}
                        />
                        <Bar dataKey="count" fill="var(--primary-color)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Panel>
    );
}

export default CategoryChart;

