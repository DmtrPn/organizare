import { BaseFindOptions } from '@common/domain/types';

export enum NotificationStatus {
    Active = 'active',
    Canceled = 'canceled',
    Executed = 'executed',
}

export interface NotificationFindOptions extends BaseFindOptions {
    retreatId?: string;
    status?: NotificationStatus | NotificationStatus[];
    executeBefore?: Date;
}

export interface NotificationCreateData {
    id: string;
    chatId: number;
    retreatId: string;
    message: string;
    executeAt: Date;
}

export interface NotificationUpdateData {
    executeAt?: Date;
    status: NotificationStatus;
}
