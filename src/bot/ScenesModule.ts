import { Module } from '@nestjs/common';

import { StartScene } from './scenes/StartScene';
import { CreateRetreatScene } from './scenes/CreateRetreatScene';
import { MainScene } from './scenes/MainScene';

@Module({
    providers: [StartScene, MainScene, CreateRetreatScene],
})
export class ScenesModule {}
