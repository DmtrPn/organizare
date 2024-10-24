import { BaseFindOptions } from '@common/domain/types';
import { Optional } from '@project-types/common';

export interface ReminderFindOptions extends BaseFindOptions {
    chatId?: number;
}

export interface ReminderData {
    id: string;
    title: string;
    description: Optional<string>;
    date: Date;
    createdAt: Date;
    chatId: number;
}

export interface ReminderCreateData {
    id: string;
    title: string;
    description: Optional<string>;
    date: Date;
    chatId: number;
}

export interface ReminderUpdateData {
    title?: string;
    description?: string;
    date?: Date;
}
