import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setSelectionMode, selectAllAds, toggleAdSelection } from '../../../features/ads/adsSlice';
import { 
    useApproveAdMutation, 
    useRejectAdMutation, 
    useRequestChangesMutation,
} from '../../../features/api/apiSlice';
import Button from '../../atoms/button/button';
import { CheckIcon, XIcon, EditIcon } from '../../atoms/icons/icons';
import { useState } from 'react';
import ModerationModal from '../moderationModal/moderationModal';
import type { RejectionReason } from '../../../types/moderation';
import styles from './bulkActions.module.scss';

interface BulkActionsProps {
    onRefetch?: () => void;
}

function BulkActions({ onRefetch }: BulkActionsProps = {}) {
    const dispatch = useAppDispatch();
    const selectionMode = useAppSelector((state) => state.ads.selectionMode);
    const selectedAdIds = useAppSelector((state) => state.ads.selectedAdIds);
    const ads = useAppSelector((state) => state.ads.ads);
    
    const [approveAds] = useApproveAdMutation();
    const [rejectAds] = useRejectAdMutation();
    const [requestChanges] = useRequestChangesMutation();
    
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isRequestChangesModalOpen, setIsRequestChangesModalOpen] = useState(false);
    
    const selectedCount = selectedAdIds.length;
    const currentPageAdIds = ads.map(ad => ad.id);
    const allPageSelected = currentPageAdIds.length > 0 && 
        currentPageAdIds.every(id => selectedAdIds.includes(id));
    
    const handleToggleSelectionMode = () => {
        dispatch(setSelectionMode(!selectionMode));
    };
    
    const handleSelectAll = () => {
        if (allPageSelected) {
            const currentPageAdIds = ads.map(ad => ad.id);
            currentPageAdIds.forEach(id => {
                const index = selectedAdIds.indexOf(id);
                if (index !== -1) {
                    dispatch(toggleAdSelection(id));
                }
            });
        } else {
            dispatch(selectAllAds());
        }
    };
    
    const handleBulkApprove = async () => {
        try {
            await Promise.all(selectedAdIds.map(id => approveAds(id).unwrap()));
            dispatch(setSelectionMode(false));
            if (onRefetch) {
                onRefetch();
            }
        } catch (error) {
            console.error('Ошибка при массовом одобрении:', error);
        }
    };
    
    const handleBulkReject = async (reason: RejectionReason, comment?: string) => {
        try {
            await Promise.all(selectedAdIds.map(id => 
                rejectAds({ id, body: { reason, comment } }).unwrap()
            ));
            dispatch(setSelectionMode(false));
            setIsRejectModalOpen(false);
            if (onRefetch) {
                onRefetch();
            }
        } catch (error) {
            console.error('Ошибка при массовом отклонении:', error);
        }
    };
    
    const handleBulkRequestChanges = async (reason: RejectionReason, comment?: string) => {
        try {
            await Promise.all(selectedAdIds.map(id => 
                requestChanges({ id, body: { reason, comment } }).unwrap()
            ));
            dispatch(setSelectionMode(false));
            setIsRequestChangesModalOpen(false);
            if (onRefetch) {
                onRefetch();
            }
        } catch (error) {
            console.error('Ошибка при массовой доработке:', error);
        }
    };
    
    if (!selectionMode && selectedCount === 0) {
        return (
            <div className={styles.bulkActions}>
                <Button 
                    variant="primary" 
                    onClick={handleToggleSelectionMode}
                    icon={<CheckIcon size={16} />}
                >
                    Выбрать
                </Button>
            </div>
        );
    }
    
    return (
        <div className={styles.bulkActions}>
            <div className={styles.selectionInfo}>
                <span className={styles.counter}>
                    Выбрано: {selectedCount}
                </span>
                <Button 
                    variant="primary" 
                    onClick={handleSelectAll}
                >
                    {allPageSelected ? 'Отменить все' : 'Выбрать все'}
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleToggleSelectionMode}
                >
                    Отменить выбор
                </Button>
            </div>
            
            {selectedCount > 0 && (
                <div className={styles.actions}>
                    <Button 
                        variant="success" 
                        onClick={handleBulkApprove}
                        icon={<CheckIcon size={16} />}
                        disabled={selectedCount === 0}
                    >
                        Одобрить ({selectedCount})
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={() => setIsRejectModalOpen(true)}
                        icon={<XIcon size={16} />}
                        disabled={selectedCount === 0}
                    >
                        Отклонить ({selectedCount})
                    </Button>
                    <Button 
                        variant="warning" 
                        onClick={() => setIsRequestChangesModalOpen(true)}
                        icon={<EditIcon size={16} />}
                        disabled={selectedCount === 0}
                    >
                        Доработка ({selectedCount})
                    </Button>
                </div>
            )}
            
            <ModerationModal
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                onSubmit={handleBulkReject}
                title="Отклонить объявления"
                submitLabel={`Отклонить ${selectedCount} объявлений`}
                submitVariant="danger"
            />
            
            <ModerationModal
                isOpen={isRequestChangesModalOpen}
                onClose={() => setIsRequestChangesModalOpen(false)}
                onSubmit={handleBulkRequestChanges}
                title="Запросить доработку"
                submitLabel={`Отправить на доработку ${selectedCount} объявлений`}
                submitVariant="warning"
            />
        </div>
    );
}

export default BulkActions;

