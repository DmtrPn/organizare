import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

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

export interface DbConfig extends PostgresConnectionOptions {
    type: 'postgres';
    host: string;
    database: string;
    username: string;
    password: string;
}

export type ConfigType = DbConfig | RedisConfig | NotificationConfig;
