import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Panel from '../../atoms/panel/panel';
import type { CategoryStats } from '../../../types/moderator';
import styles from './categoryChart.module.scss';

interface CategoryChartProps {
    data: CategoryStats;
}

function CategoryChart({ data }: CategoryChartProps) {
    const chartData = Object.entries(data).map(([categoryName, count]) => ({
        categoryName,
        count,
    }));

    return (
        <Panel>
            <div className={styles.chartContainer}>
                <h3 className={styles.title}>Проверенные объявления по категориям</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="categoryName" type="category" width={150} />
                        <Tooltip />
                        <Bar dataKey="count" fill="var(--primary-color)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Panel>
    );
}

export default CategoryChart;

