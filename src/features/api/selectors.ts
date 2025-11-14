import type { Ad } from '../../types/apiType';

// Функция для извлечения уникальных категорий из данных объявлений
export const extractUniqueCategories = (ads: Ad[]): { id: number; name: string }[] => {
    const categoriesMap = new Map<number, { id: number; name: string }>();

    ads.forEach((ad) => {
        if (!categoriesMap.has(ad.categoryId)) {
            categoriesMap.set(ad.categoryId, {
                id: ad.categoryId,
                name: ad.category,
            });
        }
    });

    return Array.from(categoriesMap.values()).sort((a, b) => a.id - b.id);
};

