import { Inject } from 'typescript-ioc';

import '@core/test/testRunner';

import { INotificationCrudService } from '@notification/domain/INotificationCrudService';

import { createNotificationForRetreat } from '../CreateNotificationForRetreatCommand';
import { ConfigName, NotificationConfig } from '@core/config/types';
import { Config } from '@core/config/Config';

@Describe()
export class CreateNotificationsSpec1 {
    @Inject private crudService!: INotificationCrudService;
    private notificationConfig: NotificationConfig = Config.getConfig<NotificationConfig>(ConfigName.Notification);

    @Test('Create notification')
    public async createNotificationsForRetreat(): Promise<void> {
        const { id: retreatId, chatId, startDate } = { id: '123qwe', chatId: 123, startDate: new Date() };
        await createNotificationForRetreat({
            retreatId,
            chatId,
            startDate,
        });
        const notifications = await this.crudService.find({ retreatId });

        expect(notifications.length).toBe(this.notificationConfig.retreatMessages.length);
    }
}
