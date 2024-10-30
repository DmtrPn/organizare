import { Inject } from 'typescript-ioc';

import { INotificationCrudService } from '@notification/domain/INotificationCrudService';
import { UnitTest } from '@core/test/UnitTest';

import { NotificationEventListener } from '../../NotificationEventListener';

@Describe()
export class NotificationEventListenerTest extends UnitTest {
    @Inject private crudService!: INotificationCrudService;
    private notificationEventListener = new NotificationEventListener();

    @Test('Create notification on create retreat event')
    public async createNotificationsForRetreat(): Promise<any> {
        const body = { id: '123qwe', chatId: '123qwe', date: new Date(), title: 'title' };
        await this.notificationEventListener.onCreateReminder({ body });

        const notifications = await this.crudService.find({ entityId: body.id });

        expect(notifications.length).toBe(1);
    }
}
