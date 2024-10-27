import { DomainEvent, DomainEventParams } from './abstract/DomainEvent';

export interface CreateReminderEventBody {
    id: string;
    chatId: string;
    date: Date;
    title: string;
}

export class CreateReminderEvent extends DomainEvent<CreateReminderEventBody> {
    public static Name = 'reminder.created';
}

export type CreateReminderEventParams = DomainEventParams<CreateReminderEventBody>;
