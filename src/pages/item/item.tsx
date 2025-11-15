import { useState } from "react";
import Button from "../../components/atoms/button/button";
import Panel from "../../components/atoms/panel/panel";
import Gallery from "../../components/molecules/gallery/gallery";
import ItemNavigation from "../../components/organisms/itemNavigation/itemNavigation";
import ModerationModal from "../../components/organisms/moderationModal/moderationModal";
import Spinner from "../../components/atoms/spinner/spinner";
import { CheckIcon, XIcon, EditIcon, ClipboardIcon, FileTextIcon, StarIcon, CircleIcon } from "../../components/atoms/icons/icons";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { formatPrice, formatDateTime } from "../../utils/format";
import { setActiveAdId, setAds } from "../../features/ads/adsSlice";
import { 
    useGetAdByIdQuery, 
    useApproveAdMutation, 
    useRejectAdMutation, 
    useRequestChangesMutation 
} from "../../features/api/apiSlice";
import { useEffect } from "react";
import type { RejectionReason } from "../../types/moderation";
import styles from './item.module.scss';

function Item() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const adId = id ? Number(id) : null;
    
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isRequestChangesModalOpen, setIsRequestChangesModalOpen] = useState(false);
    
    const { data: ad, isLoading, isError, refetch } = useGetAdByIdQuery(adId!, { skip: !adId });
    
    const [approveAd, { isLoading: isApproving }] = useApproveAdMutation();
    const [rejectAd, { isLoading: isRejecting }] = useRejectAdMutation();
    const [requestChanges, { isLoading: isRequestingChanges }] = useRequestChangesMutation();
    
    useEffect(() => {
        if (ad) {
            dispatch(setAds([ad]));
            dispatch(setActiveAdId(ad.id));
        }
    }, [ad, dispatch]);
    
    if (isLoading) return <Spinner size="large" />;
    if (isError || !ad) return <div>Объявление не найдено</div>;

    const galleryItems = ad.images.map((image, index) => ({
        image,
        alt: `${ad.title} - изображение ${index + 1}`,
    }));

    const handleApprove = async () => {
        if (!adId) return;
        try {
            await approveAd(adId).unwrap();
            refetch();
        } catch (error) {
            console.error('Ошибка при одобрении объявления:', error);
        }
    };

    const handleReject = async (reason: RejectionReason, comment?: string) => {
        if (!adId) return;
        try {
            await rejectAd({ id: adId, body: { reason, comment } }).unwrap();
            refetch();
        } catch (error) {
            console.error('Ошибка при отклонении объявления:', error);
        }
    };

    const handleRequestChanges = async (reason: RejectionReason, comment?: string) => {
        if (!adId) return;
        try {
            await requestChanges({ id: adId, body: { reason, comment } }).unwrap();
            refetch();
        } catch (error) {
            console.error('Ошибка при запросе изменений:', error);
        }
    };

    const actionButtons = [
        {
            label: 'Одобрить',
            variant: 'success' as const,
            icon: <CheckIcon size={18} />,
            onClick: handleApprove,
            disabled: isApproving,
        },
        {
            label: 'Отклонить',
            variant: 'danger' as const,
            icon: <XIcon size={18} />,
            onClick: () => setIsRejectModalOpen(true),
            disabled: isRejecting,
        },
        {
            label: 'Доработка',
            variant: 'warning' as const,
            icon: <EditIcon size={18} />,
            onClick: () => setIsRequestChangesModalOpen(true),
            disabled: isRequestingChanges,
        },
    ];

    return (
        <section className={styles.item}>
            <div className="container">
                <div className={styles.header}>
                    <h1 className={styles.title}>{ad.title}</h1>
                    <div className={styles.price}>{formatPrice(ad.price)}</div>
                </div>

                <div className={styles.content}>
                    <div className={styles.galleryWrapper}>
                        <Gallery items={galleryItems} />
                    </div>

                    <div className={styles.rightColumn}>
                        <Panel>
                            <div className={styles.moderationHistory}>
                                <h2 className={styles.moderationHistoryTitle}>
                                    <span className={styles.moderationHistoryIcon}>
                                        <ClipboardIcon size={20} />
                                    </span>
                                    История модерации
                                </h2>
                                {ad.moderationHistory && ad.moderationHistory.length > 0 ? (
                                    <div className={styles.moderationHistoryList}>
                                        {ad.moderationHistory.map((action) => {
                                            const formattedDate = formatDateTime(action.timestamp);

                                            const getActionLabel = (actionType: string) => {
                                                const actionMap: Record<string, string> = {
                                                    approved: 'Одобрено',
                                                    rejected: 'Отклонено',
                                                    requestchanges: 'На доработку',
                                                    pending: 'Ожидает',
                                                    draft: 'Черновик',
                                                };
                                                return actionMap[actionType.toLowerCase()] || actionType;
                                            };

                                            const getActionIcon = (actionType: string) => {
                                                const type = actionType.toLowerCase();
                                                if (type === 'approved') return <CheckIcon size={14} />;
                                                if (type === 'rejected') return <XIcon size={14} />;
                                                if (type === 'requestchanges') return <EditIcon size={14} />;
                                                return <CircleIcon size={14} />;
                                            };

                                            return (
                                                <div key={action.id} className={styles.moderationHistoryItem}>
                                                    <div className={styles.moderationHistoryRow}>
                                                        <span className={styles.moderationHistoryLabel}>Модератор:</span>
                                                        <span className={styles.moderationHistoryValue}>{action.moderatorName}</span>
                                                    </div>
                                                    <div className={styles.moderationHistoryRow}>
                                                        <span className={styles.moderationHistoryDate}>{formattedDate}</span>
                                                    </div>
                                                    <div className={styles.moderationHistoryRow}>
                                                        <span className={`${styles.moderationHistoryStatus} ${styles[action.action.toLowerCase()]}`}>
                                                            <span className={styles.moderationHistoryStatusIcon}>
                                                                {getActionIcon(action.action)}
                                                            </span>
                                                            {getActionLabel(action.action)}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className={styles.moderationHistoryEmpty}>
                                        История модерации отсутствует
                                    </div>
                                )}
                            </div>
                        </Panel>
                    </div>
                </div>

                <Panel>
                    <div className={styles.details}>
                        <div className={styles.detailsSection}>
                            <div className={styles.detailsSectionTitle}>
                                <span className={styles.detailsIcon}>
                                    <FileTextIcon size={18} />
                                </span>
                                Полное описание
                            </div>
                            <p className={styles.descriptionText}>{ad.description}</p>
                        </div>

                        <div className={styles.detailsSection}>
                            <div className={styles.detailsSectionTitle}>
                                <span className={styles.detailsIcon}>
                                    <ClipboardIcon size={18} />
                                </span>
                                Характеристики (таблица)
                            </div>
                            <table className={styles.characteristicsTable}>
                                <tbody>
                                    {Object.entries(ad.characteristics).map(([key, value]) => (
                                        <tr key={key} className={styles.characteristicsTableRow}>
                                            <td className={styles.characteristicsTableLabel}>{key}:</td>
                                            <td className={styles.characteristicsTableValue}>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.detailsSection}>
                            <div className={styles.sellerInfo}>
                                <div className={styles.sellerName}>
                                    Продавец: {ad.seller.name}
                                </div>
                                <div className={styles.sellerRating}>
                                    <span className={styles.ratingIcon}>
                                        <StarIcon size={16} />
                                    </span>
                                    {ad.seller.rating}
                                </div>
                                <div className={styles.sellerActivity}>
                                    {ad.seller.totalAds} объявлений | На сайте: {(() => {
                                        const registeredDate = new Date(ad.seller.registeredAt);
                                        const now = new Date();
                                        const years = now.getFullYear() - registeredDate.getFullYear();
                                        const months = now.getMonth() - registeredDate.getMonth();
                                        let totalYears = years;
                                        if (months < 0) {
                                            totalYears = years - 1;
                                        }
                                        if (totalYears === 0) {
                                            const totalMonths = years * 12 + months;
                                            return `${totalMonths} ${totalMonths === 1 ? 'месяц' : totalMonths < 5 ? 'месяца' : 'месяцев'}`;
                                        }
                                        return `${totalYears} ${totalYears === 1 ? 'год' : totalYears < 5 ? 'года' : 'лет'}`;
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                </Panel>

                <div className={styles.actions}>
                    {actionButtons.map((button, index) => (
                        <Button
                            key={index}
                            onClick={button.onClick}
                            variant={button.variant}
                            icon={button.icon}
                            disabled={button.disabled}
                        >
                            {button.label}
                        </Button>
                    ))}
                </div>

                <ItemNavigation currentAdId={ad.id} />

                <ModerationModal
                    isOpen={isRejectModalOpen}
                    onClose={() => setIsRejectModalOpen(false)}
                    onSubmit={handleReject}
                    title="Отклонить объявление"
                    submitLabel="Отклонить"
                    submitVariant="danger"
                />

                <ModerationModal
                    isOpen={isRequestChangesModalOpen}
                    onClose={() => setIsRequestChangesModalOpen(false)}
                    onSubmit={handleRequestChanges}
                    title="Запросить доработку"
                    submitLabel="Отправить на доработку"
                    submitVariant="warning"
                />
            </div>
        </section>
    );
}

export default Item;