import { TelegrafModule } from 'nestjs-telegraf';
import { Module } from '@nestjs/common';
import RedisSession from 'telegraf-session-redis';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

import { BotModule } from '@retreat/BotModule';
import { Config } from '@core/config/Config';
import { ConfigName, RedisConfig } from '@core/config/types';

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
            include: [BotModule],
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
        BotModule,
    ],
    providers: [],
})
export class BotAppModule {}
