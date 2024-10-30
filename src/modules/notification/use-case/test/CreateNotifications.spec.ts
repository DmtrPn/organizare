import { Inject } from 'typescript-ioc';

import { IntegrationTest } from '@core/test/IntegrationTest';

import { INotificationCrudService } from '@notification/domain/INotificationCrudService';

import { createNotification } from '../CreateNotificationCommand';
import { getFakeNotificationCreationParams } from '@notification/test/utils/notificationFakeData';

@Describe()
export class CreateNotificationsSpec extends IntegrationTest {
    @Inject private crudService!: INotificationCrudService;

    @Test('Create notification')
    public async createNotificationsForRetreat(): Promise<void> {
        const params = getFakeNotificationCreationParams({ chatId: this.chatId });
        await createNotification(params);
        const notification = await this.crudService.getById(params.id);

        expect(notification).toBeDefined();
        expect(notification).toStrictEqual(notification);
    }
}
