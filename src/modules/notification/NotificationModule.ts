import { Module } from '@nestjs/common';

import { NotificationEventListener } from './application/NotificationEventListener';
import { NotificationScheduler } from '@notification/cron/NotificationScheduler';

@Module({
    providers: [NotificationEventListener, NotificationScheduler],
})
export class NotificationModule {}
