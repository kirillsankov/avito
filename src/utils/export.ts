import type { ActivityData, DecisionsData, CategoryStats, ChartPeriod } from '../types/moderator';
import type { Moderator } from '../types/moderator';
import { callAddFont as addMontserratSemiBold } from '../assets/fonts/Montserrat-SemiBold-normal';
import { formatPercentage } from './format';

export function exportToCSV(
    moderator: Moderator,
    activityData: ActivityData[] | undefined,
    decisionsData: DecisionsData | undefined,
    categoriesData: CategoryStats | undefined,
    selectedPeriod: ChartPeriod
) {
    const periodTitle = getPeriodTitle(selectedPeriod);
    const date = new Date().toLocaleDateString('ru-RU');
    const moderatorNameSafe = moderator.name.replace(/[^a-zA-Zа-яА-Я0-9]/g, '_');
    const filename = `statistics_${moderatorNameSafe}_${periodTitle}_${date.replace(/\./g, '_')}.csv`;

    const headers = [
        'Период',
        'Модератор',
        'Роль',
        'Всего проверено',
        'Одобрено',
        'Отклонено',
        'На доработку',
        'Процент одобренных',
        'Процент отклоненных',
    ];

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
    const approvalRate = totalReviewed > 0 ? Math.round((totalApproved / totalReviewed) * 10000) / 100 : 0;
    const rejectionRate = totalReviewed > 0 ? Math.round((totalRejected / totalReviewed) * 10000) / 100 : 0;

    const mainRow = [
        periodTitle,
        moderator.name,
        moderator.role,
        totalReviewed.toString(),
        totalApproved.toString(),
        totalRejected.toString(),
        totalRequestChanges.toString(),
        `${formatPercentage(approvalRate)}%`,
        `${formatPercentage(rejectionRate)}%`,
    ];

    const activityRows: string[] = [];
    if (activityData && activityData.length > 0) {
        activityRows.push('');
        activityRows.push('Детализация по дням');
        activityRows.push('Дата,Одобрено,Отклонено,На доработку,Всего');
        activityData.forEach(day => {
            const approved = day.approved ?? 0;
            const rejected = day.rejected ?? 0;
            const requestChanges = day.requestChanges ?? 0;
            const total = approved + rejected + requestChanges;
            activityRows.push(`${day.date},${approved},${rejected},${requestChanges},${total}`);
        });
    }

    const decisionsRows: string[] = [];
    if (decisionsData) {
        decisionsRows.push('');
        decisionsRows.push('Распределение решений');
        decisionsRows.push('Тип,Количество');
        decisionsRows.push(`Одобрено,${Number(decisionsData.approved.toFixed(2))}`);
        decisionsRows.push(`Отклонено,${Number(decisionsData.rejected.toFixed(2))}`);
        decisionsRows.push(`На доработку,${Number(decisionsData.requestChanges.toFixed(2))}`);
    }

    const categoriesRows: string[] = [];
    if (categoriesData && Object.keys(categoriesData).length > 0) {
        categoriesRows.push('');
        categoriesRows.push('Статистика по категориям');
        categoriesRows.push('Категория,Количество');
        Object.entries(categoriesData).forEach(([category, count]) => {
            categoriesRows.push(`${category},${count ?? 0}`);
        });
    }

    const csvContent = [
        headers.join(','),
        mainRow.join(','),
        ...activityRows,
        ...decisionsRows,
        ...categoriesRows,
    ].join('\n');

    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

export async function exportToPDF(
    moderator: Moderator,
    activityData: ActivityData[] | undefined,
    decisionsData: DecisionsData | undefined,
    categoriesData: CategoryStats | undefined,
    selectedPeriod: ChartPeriod
) {
    const { default: jsPDF } = await import('jspdf');
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    try {
        addMontserratSemiBold.call(doc);
        doc.setFont('Montserrat-SemiBold', 'normal');
    } catch (error) {
        console.warn('Failed to load custom font, using default:', error);
    }
    
    const hasFonts = true; 

    const periodTitle = getPeriodTitle(selectedPeriod);
    const date = new Date().toLocaleDateString('ru-RU');
    const moderatorNameSafe = moderator.name.replace(/[^a-zA-Zа-яА-Я0-9]/g, '_');
    const filename = `statistics_${moderatorNameSafe}_${periodTitle}_${date.replace(/\./g, '_')}.pdf`;

    let yPos = 20;
    const lineHeight = 7;
    const margin = 20;
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFontSize(18);
    if (hasFonts) {
        doc.setFont('Montserrat-SemiBold', 'normal');
    } else {
        doc.setFont('helvetica', 'bold');
    }
    doc.text('Статистика модератора', margin, yPos);
    yPos += lineHeight * 2;

    doc.setFontSize(12);
    if (hasFonts) {
        doc.setFont('Montserrat-SemiBold', 'normal');
    } else {
        doc.setFont('helvetica', 'normal');
    }
    doc.text(`Модератор: ${moderator.name}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`Роль: ${moderator.role}`, margin, yPos);
    yPos += lineHeight;
    const periodTitleText = periodTitle === 'Сегодня' ? 'Сегодня' : 
                           periodTitle === 'Последние_7_дней' ? 'Последние 7 дней' :
                           periodTitle === 'Последние_30_дней' ? 'Последние 30 дней' : 'За период';
    doc.text(`Период: ${periodTitleText}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`Дата отчёта: ${date}`, margin, yPos);
    yPos += lineHeight * 2;

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

    doc.setFontSize(14);
    if (hasFonts) {
        doc.setFont('Montserrat-SemiBold', 'normal');
    } else {
        doc.setFont('helvetica', 'bold');
    }
    doc.text('Основные метрики', margin, yPos);
    yPos += lineHeight * 1.5;

    doc.setFontSize(11);
    if (hasFonts) {
        doc.setFont('Montserrat-SemiBold', 'normal');
    } else {
        doc.setFont('helvetica', 'normal');
    }
    doc.text(`Всего проверено: ${totalReviewed}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`Одобрено: ${totalApproved}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`Отклонено: ${totalRejected}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`На доработку: ${totalRequestChanges}`, margin, yPos);
    yPos += lineHeight * 2;

    if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
    }

    if (activityData && activityData.length > 0) {
        doc.setFontSize(14);
        if (hasFonts) {
            doc.setFont('Montserrat-SemiBold', 'normal');
        } else {
            doc.setFont('helvetica', 'bold');
        }
        doc.text('Детализация по дням', margin, yPos);
        yPos += lineHeight * 1.5;

        doc.setFontSize(10);
        if (hasFonts) {
            doc.setFont('Montserrat-SemiBold', 'normal');
        } else {
            doc.setFont('helvetica', 'normal');
        }
        doc.text('Дата', margin, yPos);
        doc.text('Одобрено', margin + 50, yPos);
        doc.text('Отклонено', margin + 80, yPos);
        doc.text('На доработку', margin + 120, yPos);
        doc.text('Всего', margin + 160, yPos);
        yPos += lineHeight;

        activityData.forEach(day => {
            if (yPos > pageHeight - 20) {
                doc.addPage();
                yPos = 20;
            }
            const total = (day.approved ?? 0) + (day.rejected ?? 0) + (day.requestChanges ?? 0);
            doc.text(day.date, margin, yPos);
            doc.text((day.approved ?? 0).toString(), margin + 50, yPos);
            doc.text((day.rejected ?? 0).toString(), margin + 80, yPos);
            doc.text((day.requestChanges ?? 0).toString(), margin + 120, yPos);
            doc.text(total.toString(), margin + 160, yPos);
            yPos += lineHeight;
        });
        yPos += lineHeight;
    }

    if (decisionsData) {
        if (yPos > pageHeight - 40) {
            doc.addPage();
            yPos = 20;
        }
        doc.setFontSize(14);
        if (hasFonts) {
            doc.setFont('Montserrat-SemiBold', 'normal');
        } else {
            doc.setFont('helvetica', 'bold');
        }
        doc.text('Распределение решений', margin, yPos);
        yPos += lineHeight * 1.5;

        doc.setFontSize(11);
        if (hasFonts) {
            doc.setFont('Montserrat-SemiBold', 'normal');
        } else {
            doc.setFont('helvetica', 'normal');
        }
        doc.text(`Одобрено: ${decisionsData.approved.toFixed(2) ?? 0}`, margin, yPos);
        yPos += lineHeight;
        doc.text(`Отклонено: ${decisionsData.rejected.toFixed(2) ?? 0}`, margin, yPos);
        yPos += lineHeight;
        doc.text(`На доработку: ${decisionsData.requestChanges.toFixed(2) ?? 0}`, margin, yPos);
        yPos += lineHeight * 2;
    }

    if (categoriesData && Object.keys(categoriesData).length > 0) {
        if (yPos > pageHeight - 40) {
            doc.addPage();
            yPos = 20;
        }
        doc.setFontSize(14);
        if (hasFonts) {
            doc.setFont('Montserrat-SemiBold', 'normal');
        } else {
            doc.setFont('helvetica', 'bold');
        }
        doc.text('Статистика по категориям', margin, yPos);
        yPos += lineHeight * 1.5;

        doc.setFontSize(11);
        if (hasFonts) {
            doc.setFont('Montserrat-SemiBold', 'normal');
        } else {
            doc.setFont('helvetica', 'normal');
        }
        Object.entries(categoriesData).forEach(([category, count]) => {
            if (yPos > pageHeight - 20) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(`${category}: ${count ?? 0}`, margin, yPos);
            yPos += lineHeight;
        });
    }

    doc.save(filename);
}

function getPeriodTitle(period: ChartPeriod): string {
    switch (period) {
        case 'today':
            return 'Сегодня';
        case 'week':
            return 'Последние_7_дней';
        case 'month':
            return 'Последние_30_дней';
        default:
            return 'За_период';
    }
}

