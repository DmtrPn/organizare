import { Inject } from 'typescript-ioc';

import '@core/test/testRunner';
import { Describe, Test, expect } from 'node-test-decorators';

import { INotificationCrudService } from '@notification/domain/INotificationCrudService';
import { NotificationCreateData, NotificationStatus } from '@notification/domain/notification.types';

import { sendNotifications } from '../notification.SendManyCommand';
import { DateHelper } from '@utils/DateHelper';
import { IntegrationTest } from '@core/test/IntegrationTest';
import { getFakeNotificationCreationParams } from '@notification/test/utils/notificationFakeData';

@Describe()
export class NotificationSendManySpec extends IntegrationTest {
    @Inject private crudService!: INotificationCrudService;

    @Test('Send notification')
    public async sendNotification(): Promise<void> {
        const { id } = await this.createFakeNotification({ executeAt: DateHelper.subMinutes(new Date(), 5) });
        await sendNotifications();
        const notification = await this.crudService.getById(id);

        expect(notification).toBeDefined();
        expect(notification!.status).toEqual(NotificationStatus.Executed);
    }

    @Test('Dont send future notification')
    public async sendFutureNotification(): Promise<void> {
        const { id } = await this.createFakeNotification({ executeAt: DateHelper.addDays(new Date(), 7) });
        await sendNotifications();
        const notification = await this.crudService.getById(id);

        expect(notification).toBeDefined();
        expect(notification!.status).toEqual(NotificationStatus.Active);
    }

    private async createFakeNotification(
        params: Partial<NotificationCreateData> = {},
    ): Promise<NotificationCreateData> {
        const notification = getFakeNotificationCreationParams({ chatId: this.chatId, ...params });

        await this.crudService.create(notification);

        return notification;
    }
}
