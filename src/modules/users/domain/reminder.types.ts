import { BaseFindOptions } from '@common/domain/types';
import { Optional } from '@project-types/common';

export interface ReminderFindOptions extends BaseFindOptions {
    chatId?: string;
}

export interface ReminderData {
    id: string;
    title: string;
    description: Optional<string>;
    date: Date;
    createdAt: Date;
    chatId: string;
}

export interface ReminderCreateData {
    id: string;
    title: string;
    description: Optional<string>;
    date: Date;
    chatId: string;
}

export interface ReminderUpdateData {
    title?: string;
    description?: string;
    date?: Date;
}
