import { BaseFindOptions } from '@common/domain/types';

export enum NotificationStatus {
    Active = 'active',
    Canceled = 'canceled',
    Executed = 'executed',
}

export enum NotificationEntityType {
    Reminder = 'reminder',
}

export interface NotificationFindOptions extends BaseFindOptions {
    entityId?: string;
    status?: NotificationStatus | NotificationStatus[];
    executeBefore?: Date;
}

export interface NotificationCreateData {
    id: string;
    chatId: string;
    entityId: string;
    entityType: NotificationEntityType;
    message: string;
    executeAt: Date;
}

export interface NotificationData {
    id: string;
    chatId: string;
    entityId: string;
    entityType: NotificationEntityType;
    status: NotificationStatus;
    message: string;
    executeAt: Date;
}

export interface NotificationUpdateData {
    executeAt?: Date;
    status: NotificationStatus;
}
