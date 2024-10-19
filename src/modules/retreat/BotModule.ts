import { Module } from '@nestjs/common';

import { StartScene } from './application/StartScene';
import { CreateRetreatScene } from './application/scenes/CreateRetreatScene';
import { MainScene } from './application/scenes/MainScene';
import { RetreatScheduler } from './application/scheduller/RetreatScheduler';
import { NotificationEventListener } from './application/notification/NotificationEventListener';

@Module({
    providers: [StartScene, MainScene, CreateRetreatScene, RetreatScheduler, NotificationEventListener],
})
export class BotModule {}
