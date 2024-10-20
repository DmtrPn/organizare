import { v4 as uuid } from 'uuid';

import { Config } from '@core/config/Config';
import { ConfigName, NotificationConfig } from '@core/config/types';

import { NotificationCommand } from './NotificationCommand';
import { DateHelper } from '@utils/DateHelper';

interface Params {
    retreatId: string;
    chatId: number;
    startDate: Date;
}

export class CreateNotificationForRetreatCommand extends NotificationCommand<Params> {
    private notificationConfig: NotificationConfig = Config.getConfig<NotificationConfig>(ConfigName.Notification);

    public async execute(): Promise<void> {
        const { retreatId, chatId, startDate } = this.params;

        const notifications = this.notificationConfig.retreatMessages.map(
            ({ message, hour, minutes, isPreviousDay }) => ({
                retreatId,
                chatId,
                message,
                executeAt: isPreviousDay
                    ? DateHelper.setDate(DateHelper.subDays(startDate, 1), { hour, minutes })
                    : DateHelper.setDate(startDate, { hour, minutes }),
                id: uuid(),
            }),
        );

        await this.crudService.create(notifications);
    }
}

export const createNotificationForRetreat = (params: Params) =>
    new CreateNotificationForRetreatCommand(params).execute();
