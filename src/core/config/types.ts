import { PostgreSqlOptions } from '@mikro-orm/postgresql/PostgreSqlMikroORM';

export enum ConfigName {
    Log = 'log',
    Db = 'db',
    Redis = 'redis',
    Notification = 'notification',
}

export interface NotificationConfig {
    retreatMessages: {
        message: string;
        hour: number;
        minutes: number;
        isPreviousDay?: boolean;
    }[];
}

export interface RedisConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    keyPrefix: string;
}

export interface DbConfig extends PostgreSqlOptions {
    type: 'postgres';
    host: string;
    database: string;
    user: string;
    password: string;
}

export type ConfigType = DbConfig | RedisConfig | NotificationConfig;
