import { Optional } from '@project-types/common';

export interface ReminderCreateData {
    id: string;
    chatId: string;
    date: Date;
    title: string;
    description: Optional<string>;
}

export abstract class IReminderHandlers {
    public abstract create(params: ReminderCreateData): Promise<void>;
}
