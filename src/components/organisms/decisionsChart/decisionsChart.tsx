import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Panel from '../../atoms/panel/panel';
import styles from './decisionsChart.module.scss';

interface DecisionsChartProps {
    data: {
        approved: number;
        rejected: number;
        revision: number;
    };
}

function DecisionsChart({ data }: DecisionsChartProps) {
    const chartData = [
        { name: 'Одобрено', value: data.approved, color: 'var(--success-color)' },
        { name: 'Отклонено', value: data.rejected, color: 'var(--danger-color)' },
        { name: 'На доработку', value: data.revision, color: 'var(--warning-color)' },
    ].filter((item) => item.value > 0);

    return (
        <Panel>
            <div className={styles.chartContainer}>
                <h3 className={styles.title}>Распределение решений</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Panel>
    );
}

export default DecisionsChart;

