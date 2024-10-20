import { TelegrafModule } from 'nestjs-telegraf';
import { Module } from '@nestjs/common';
import RedisSession from 'telegraf-session-redis';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

import { RetreatModule } from '@retreat/RetreatModule';
import { Config } from '@core/config/Config';
import { ConfigName, RedisConfig } from '@core/config/types';
import { ScenesModule } from '@scenes/ScenesModule';
import { NotificationModule } from '@modules/notification/NotificationModule';

const redisConfig = <RedisConfig>Config.getConfig(ConfigName.Redis);

const session = new RedisSession({
    store: {
        host: redisConfig.host,
        port: redisConfig.port,
    },
});

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        ScheduleModule.forRoot(),
        TelegrafModule.forRoot({
            token: process.env.TB_TOKEN!,
            middlewares: [session],
            include: [RetreatModule, NotificationModule, ScenesModule],
            launchOptions:
                process.env.DOBRO_ENV !== 'dev'
                    ? {
                          webhook: {
                              domain: `${process.env.TB_WEBHOOK_URL}`,
                              hookPath: `/${process.env.TB_WEBHOOK_SECRET}`,
                          },
                      }
                    : undefined,
        }),
        RetreatModule,
        NotificationModule,
        ScenesModule,
    ],
    providers: [],
})
export class BotAppModule {}
