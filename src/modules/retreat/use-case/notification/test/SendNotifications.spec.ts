import { Inject } from 'typescript-ioc';

import '@core/test/testRunner';

import { INotificationCrudService } from '@retreat/domain/notification/INotificationCrudService';
import { NotificationCreateData, NotificationStatus } from '@retreat/domain/notification/types';

import { sendNotifications } from '../SendNotificationsCommand';
import { createFakeUser } from '../../user/test/utils/createFakeUser';
import { createFakeRetreat } from '../../retreat/test/utils/createFakeRetreat';
import { getFakeNotificationCreationParams } from './utils/notificationFakeData';
import { DateHelper } from '@utils/DateHelper';

@Describe()
export class SendNotificationsSpec {
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
        const { chatId } = await createFakeUser();
        const { id: retreatId } = await createFakeRetreat({ chatId });
        const notification = getFakeNotificationCreationParams({ retreatId, chatId, ...params });

        await this.crudService.create(notification);

        return notification;
    }
}
