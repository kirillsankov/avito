export interface Moderator {
    id: number;
    name: string;
    email: string;
    role: string;
    statistics: {
        totalReviewed: number;
        todayReviewed: number;
        thisWeekReviewed: number;
        thisMonthReviewed: number;
        averageReviewTime: number; // в секундах
        approvalRate: number;
    };
    permissions: string[];
}

export type ChartPeriod = 'today' | 'week' | 'month' | 'custom';

export interface ChartParams {
    period?: ChartPeriod;
    startDate?: string;
    endDate?: string;
}

export interface ActivityData {
    date: string;
    approved: number;
    rejected: number;
    requestChanges: number;
}

export interface DecisionsData {
    approved: number;
    rejected: number;
    revision: number;
}

export interface CategoryStats {
    [categoryName: string]: number;
}

