import { Inject } from 'typescript-ioc';
import { v4 as uuid } from 'uuid';

import { IEventEmitter } from '@events/EventEmitter';
import { createNotification, CreateNotificationCommandParams } from '../use-case/CreateNotificationCommand';
import { CreateReminderEvent, CreateReminderEventBody, CreateReminderEventParams } from '@events/CreateReminderEvent';
import { DateHelper } from '@utils/DateHelper';
import { NotificationEntityType } from '@notification/domain/types';

export class NotificationEventListener {
    @Inject protected eventEmitter!: IEventEmitter;

    constructor() {
        this.eventEmitter.addListener(CreateReminderEvent.Name, this.onCreateReminder);
    }

    public async onCreateReminder({ body }: CreateReminderEventParams): Promise<void> {
        await createNotification(this.toCreateParamsFormReminderParams(body));
    }

    private toCreateParamsFormReminderParams({
        id: entityId,
        chatId,
        date,
        title: message,
    }: CreateReminderEventBody): CreateNotificationCommandParams {
        return {
            entityId,
            chatId,
            message,
            id: uuid(),
            entityType: NotificationEntityType.Reminder,
            executeAt: DateHelper.subMinutes(date, 5),
        };
    }
}
