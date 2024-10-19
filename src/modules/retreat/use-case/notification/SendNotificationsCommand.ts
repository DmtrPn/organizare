import { NotificationModel } from '@retreat/infrastructure/notification/NotificationModel';
import { NotificationStatus } from '@retreat/domain/notification/types';

import { sendNotification } from './SendNotificationCommand';
import { NotificationCommand } from './NotificationCommand';
import { LoggerFactory } from '@components/logging/LoggerFactory';

export class SendNotificationsCommand extends NotificationCommand<{}> {
    private logger = LoggerFactory.getLogger();
    public async execute(): Promise<void> {
        const actualNotifications = await this.getActualNotifications();
        if (actualNotifications.length > 0) {
            this.logger.info(`${new Date().toISOString()} Send ${actualNotifications.length} notifications`);
        }
        await Promise.all(actualNotifications.map(model => sendNotification(model)));
    }

    private async getActualNotifications(): Promise<NotificationModel[]> {
        return this.crudService.find({
            status: NotificationStatus.Active,
            executeBefore: new Date(),
        });
    }
}

export const sendNotifications = () => new SendNotificationsCommand({}).execute();
