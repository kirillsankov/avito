interface Seller {
    id: number;
    name: string;
    rating: string;
    totalAds: number;
    registeredAt: string;
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
    action: string;
    reason: string | null;
    comment: string;
    timestamp: string;
}

export interface Ad {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    categoryId: number;
    status: string;
    priority: string;
    createdAt: string;
    updatedAt: string;
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

