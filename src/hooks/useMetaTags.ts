import { useEffect } from 'react';

interface MetaTagsProps {
    title: string;
    description: string;
}

export function useMetaTags({ title, description }: MetaTagsProps) {
    useEffect(() => {
        document.title = title;

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description);

        return () => {
            document.title = 'Avito Модерация';
            if (metaDescription) {
                metaDescription.setAttribute('content', 'Система модерации объявлений Avito');
            }
        };
    }, [title, description]);
}

