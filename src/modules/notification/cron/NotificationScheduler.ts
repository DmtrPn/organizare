import { Cron, CronExpression } from '@nestjs/schedule';

import { sendNotifications } from '../use-case/SendNotificationsCommand';

export class NotificationScheduler {
    @Cron(CronExpression.EVERY_MINUTE)
    public async handleCron(): Promise<void> {
        await sendNotifications();
    }
}
