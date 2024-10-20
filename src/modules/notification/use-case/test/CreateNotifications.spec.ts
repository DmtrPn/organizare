import { Inject } from 'typescript-ioc';

import '@core/test/testRunner';

import { INotificationCrudService } from '../../domain/INotificationCrudService';

import { createFakeUser } from '../../../users/use-case/test/utils/createFakeUser';
import { createFakeRetreat } from '@retreat/use-case/retreat/test/utils/createFakeRetreat';
import { createNotificationForRetreat } from '../CreateNotificationForRetreatCommand';
import { RetreatCreateData } from '@retreat/domain/types';
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
