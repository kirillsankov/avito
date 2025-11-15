export type RejectionReason = 
    | 'Запрещенный товар'
    | 'Неверная категория'
    | 'Некорректное описание'
    | 'Проблемы с фото'
    | 'Подозрение на мошенничество'
    | 'Другое';

export interface RejectAdRequest {
    reason: RejectionReason;
    comment?: string;
}

export interface RequestChangesRequest {
    reason: RejectionReason;
    comment?: string;
}

export interface ModerationResponse {
    message: string;
    ad: {
        id: number;
        [key: string]: unknown;
    };
}

