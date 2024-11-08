import { Inject } from 'typescript-ioc';

import { INotificationCrudService } from '@notification/domain/INotificationCrudService';
import { UnitTest } from '@core/test/UnitTest';
import { Describe, Test, expect } from 'node-test-decorators';

import { NotificationEventListener } from '../../notification.EventListener';
import { DateHelper } from '@utils/DateHelper';

@Describe()
export class NotificationEventListenerUnit extends UnitTest {
    @Inject private crudService!: INotificationCrudService;
    private notificationEventListener = new NotificationEventListener();

    @Test('Create notification on create retreat event')
    public async createNotificationsForRetreat(): Promise<any> {
        const body = { id: '123qwe', chatId: '123qwe', date: DateHelper.addDays(new Date(), 2), title: 'title' };
        await this.notificationEventListener.onCreateReminder({ body });

        const notifications = await this.crudService.find({ entityId: body.id });

        expect(notifications.length).toBe(1);
        expect(notifications[0].executeAt.toISOString()).toBe(DateHelper.subMinutes(body.date, 5).toISOString());
    }
}
