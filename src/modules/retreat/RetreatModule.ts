import { Module } from '@nestjs/common';

import { RetreatScheduler } from './application/scheduller/RetreatScheduler';

@Module({
    providers: [RetreatScheduler],
})
export class RetreatModule {}
