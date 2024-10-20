import { Module } from '@nestjs/common';

import { NotificationEventListener } from './application/NotificationEventListener';

@Module({
    providers: [NotificationEventListener],
})
export class NotificationModule {}
