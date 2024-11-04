import { Module } from '@nestjs/common';

import { NotificationEventListener } from './application/notification.EventListener';
import { NotificationScheduler } from '@notification/cron/notification.Scheduler';

@Module({
    providers: [NotificationEventListener, NotificationScheduler],
})
export class NotificationModule {}
