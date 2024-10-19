import { Inject } from 'typescript-ioc';

import '@core/test/testRunner';

import { INotificationCrudService } from '@retreat/domain/notification/INotificationCrudService';

import { createFakeUser } from '../../user/test/utils/createFakeUser';
import { createFakeRetreat } from '../../retreat/test/utils/createFakeRetreat';
import { createNotificationForRetreat } from '../CreateNotificationForRetreatCommand';
import { RetreatCreateData } from '../../../domain/retreat/types';
import { ConfigName, NotificationConfig } from '@core/config/types';
import { Config } from '@core/config/Config';

@Describe()
export class CreateNotificationsSpec {
    @Inject private crudService!: INotificationCrudService;
    private notificationConfig: NotificationConfig = Config.getConfig<NotificationConfig>(ConfigName.Notification);

    @Test('Create notification')
    public async createNotificationsForRetreat(): Promise<void> {
        const { id: retreatId, chatId, startDate } = await this.getFakeRetreatParams();
        await createNotificationForRetreat({
            retreatId,
            chatId,
            startDate,
        });
        const notifications = await this.crudService.find({ retreatId });

        expect(notifications.length).toBe(this.notificationConfig.retreatMessages.length);
    }

    private async getFakeRetreatParams(): Promise<RetreatCreateData> {
        const { chatId } = await createFakeUser();
        return createFakeRetreat({ chatId });
    }
}
