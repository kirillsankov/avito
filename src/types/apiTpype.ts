interface Seller {
    id: number;
    name: string;
    rating: string; // Можно использовать `number`, если рейтинг всегда численный
    totalAds: number;
    registeredAt: string; // Можно использовать `Date` при необходимости
}

interface Characteristics {
    Состояние: string;
    Гарантия: string;
    Производитель: string;
    Модель: string;
    Цвет: string;
}

interface ModerationAction {
    id: number;
    moderatorId: number;
    moderatorName: string;
    action: string; // Можно ограничить конкретными значениями через enum или union
    reason: string | null;
    comment: string;
    timestamp: string; // Можно использовать `Date` при необходимости
}

export interface Ad {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    categoryId: number;
    status: string; // Можно ограничить конкретными значениями через enum или union
    priority: string; // Можно ограничить конкретными значениями через enum или union
    createdAt: string; // Можно использовать `Date` при необходимости
    updatedAt: string; // Можно использовать `Date` при необходимости
    images: string[];
    seller: Seller;
    characteristics: Characteristics;
    moderationHistory: ModerationAction[];
}

export interface AdsResponse {
    ads: Ad[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}