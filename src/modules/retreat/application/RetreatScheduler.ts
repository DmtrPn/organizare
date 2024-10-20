import { Cron, CronExpression } from '@nestjs/schedule';

import { sendNotifications } from '@notification/use-case/SendNotificationsCommand';

export class RetreatScheduler {
    @Cron(CronExpression.EVERY_MINUTE)
    public async handleCron(): Promise<void> {
        await sendNotifications();
    }
}
