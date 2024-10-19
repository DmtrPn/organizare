import { Module } from '@nestjs/common';

import { StartScene } from '@scenes/StartScene';
import { CreateRetreatScene } from '@scenes/CreateRetreatScene';
import { MainScene } from '@scenes/MainScene';
import { RetreatScheduler } from './application/scheduller/RetreatScheduler';
import { NotificationEventListener } from './application/notification/NotificationEventListener';

@Module({
    providers: [StartScene, MainScene, CreateRetreatScene, RetreatScheduler, NotificationEventListener],
})
export class BotModule {}
