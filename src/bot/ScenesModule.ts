import { Module } from '@nestjs/common';

import { MainScene } from './scenes/MainScene';
// import { CreateRetreatScene } from './scenes/CreateRetreatScene';
// import { GetTimizoneScene } from './scenes/GetTimizoneScene';

@Module({
    providers: [MainScene],
})
export class ScenesModule {}
