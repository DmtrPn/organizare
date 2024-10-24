import { Inject } from 'typescript-ioc';

import { INotificationCrudService } from '@notification/domain/INotificationCrudService';
import { ConfigName, NotificationConfig } from '@core/config/types';
import { Config } from '@core/config/Config';
import { UnitTest } from '@core/test/UnitTest';
// import { getFakeRetreatCreationParams } from '@retreat/use-case/retreat/test/utils/retreatFakeData';

import { NotificationEventListener } from '../../NotificationEventListener';

@Describe()
export class NotificationEventListenerTest1 extends UnitTest {
    @Inject private crudService!: INotificationCrudService;
    private notificationConfig: NotificationConfig = Config.getConfig<NotificationConfig>(ConfigName.Notification);
    private notificationEventListener = new NotificationEventListener();

    @Test('Create notification on create retreat event')
    public async createNotificationsForRetreat(): Promise<any> {
        const body = { id: '123qwe' };
        await this.notificationEventListener.onCreateRetreat({ body });

        const notifications = await this.crudService.find({ retreatId: body.id });

        expect(notifications.length).toBe(this.notificationConfig.retreatMessages.length);
    }
}
