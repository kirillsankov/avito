export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
    }).format(price);
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
};

export const formatDateShort = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
    }).format(date);
};

export const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};

export const formatPercentage = (percent: number): string => 
    (Math.round(percent * 100) / 100).toFixed(2).replace(/\.00$/, '');

