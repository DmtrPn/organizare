import { Module } from '@nestjs/common';

import { RetreatScheduler } from './application/RetreatScheduler';

@Module({
    providers: [RetreatScheduler],
})
export class RetreatModule {}
