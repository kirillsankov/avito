import { useState } from 'react';
import Button from '../../atoms/button/button';
import Panel from '../../atoms/panel/panel';
import type { RejectionReason } from '../../../types/moderation';
import styles from './moderationModal.module.scss';

interface ModerationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (reason: RejectionReason, comment?: string) => void;
    title: string;
    submitLabel: string;
    submitVariant: 'danger' | 'warning';
}

const REJECTION_REASONS: RejectionReason[] = [
    'Запрещенный товар',
    'Неверная категория',
    'Некорректное описание',
    'Проблемы с фото',
    'Подозрение на мошенничество',
    'Другое',
];

function ModerationModal({
    isOpen,
    onClose,
    onSubmit,
    title,
    submitLabel,
    submitVariant,
}: ModerationModalProps) {
    const [selectedReason, setSelectedReason] = useState<RejectionReason | ''>('');
    const [comment, setComment] = useState('');
    const [showCommentField, setShowCommentField] = useState(false);

    if (!isOpen) return null;

    const handleReasonChange = (reason: RejectionReason) => {
        setSelectedReason(reason);
        setShowCommentField(reason === 'Другое');
        if (reason !== 'Другое') {
            setComment('');
        }
    };

    const handleSubmit = () => {
        if (!selectedReason) return;
        onSubmit(selectedReason, comment.trim() || undefined);
        handleClose();
    };

    const handleClose = () => {
        setSelectedReason('');
        setComment('');
        setShowCommentField(false);
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <Panel className={styles.panelHeightAuto}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>{title}</h2>
                        <button className={styles.closeButton} onClick={handleClose} aria-label="Закрыть">
                            ×
                        </button>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.reasonSection}>
                            <label className={styles.label}>
                                Причина <span className={styles.required}>*</span>
                            </label>
                            <div className={styles.reasonsList}>
                                {REJECTION_REASONS.map((reason) => (
                                    <label key={reason} className={styles.reasonOption}>
                                        <input
                                            type="radio"
                                            name="reason"
                                            value={reason}
                                            checked={selectedReason === reason}
                                            onChange={() => handleReasonChange(reason)}
                                        />
                                        <span>{reason}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.commentSection}>
                            <label className={styles.label}>
                                {showCommentField ? 'Дополнительный комментарий' : 'Комментарий (необязательно)'}
                                {showCommentField && <span className={styles.required}>*</span>}
                            </label>
                            <textarea
                                className={styles.commentInput}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder={showCommentField ? 'Укажите причину...' : 'Введите комментарий...'}
                                rows={4}
                                required={showCommentField}
                            />
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <Button onClick={handleClose} variant="primary">
                            Отмена
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant={submitVariant}
                            disabled={!selectedReason || (showCommentField && !comment.trim())}
                        >
                            {submitLabel}
                        </Button>
                    </div>
                </div>
            </Panel>
        </div>
    );
}

export default ModerationModal;

