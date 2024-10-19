const path = require('path');
const {
    FRONT_SERVER_HOST,
    FRONT_SERVER_PORT,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_USER_NAME,
    REDIS_PASSWORD,
    BACKEND_HOST,
    BACKEND_PORT,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
} = process.env;

const { servicesDir } = require('./dirs.js');

module.exports = {
    server: {
        env: 'dev',
        host: FRONT_SERVER_HOST || '0.0.0.0',
        port: Number(FRONT_SERVER_PORT || 3000),
        cookieSecret: 'cookieSecret',
    },
    services: {
        backend: `http://${BACKEND_HOST || '127.0.0.1'}:${BACKEND_PORT || 3003}`,
    },
    redis: {
        host: REDIS_HOST || '127.0.0.1',
        port: Number(REDIS_PORT || 6379),
        username: REDIS_USER_NAME,
        password: REDIS_PASSWORD,
        keyPrefix: 'hmf_bot',
    },
    db: {
        type: 'postgres',
        host: DB_HOST || '127.0.0.1',
        port: DB_PORT || 5432,
        logging: ['warn', 'error'],
        database: DB_NAME || 'hmf',
        username: DB_USERNAME || 'gorod',
        password: DB_PASSWORD || '123qwe',
        migrationsRun: false,
        migrations: [path.resolve(servicesDir, './**/infrastructure/migrations/*.js')],
        entities: [path.resolve(servicesDir, './**/infrastructure/**/*Model.js')],
        maxQueryExecutionTime: Number(150),
        extra: { max: Number(200) },
    },
    log: {
        main: {
            type: 'console',
            level: 'info',
        },
        access: {
            type: 'console',
            level: 'info',
        },
    },
    notification: {
        retreatMessages: [
            {
                message: `Завтра ретрит
06:00 Подъем
06:30 Медитация
08:00 Зарядка
09:00 Медитация
10:00 Завтрак
11:00 Лекция
12:00 Медитация
12:30 Лекция
13:00 Обед
14:00 Лекция
15:00 Медитация
15:30 Лекция
17:00 Медитация
18:00 Ужин
19:00 Медитация
`,
                hour: 20,
                minutes: 0,
                isPreviousDay: true,
            },
            {
                message: 'Утренняя медитация в 6:30',
                hour: 6,
                minutes: 30,
            },
            {
                message: 'Зарядка',
                hour: 8,
                minutes: 0,
            },
            {
                message: 'Медитация в 09:00',
                hour: 9,
                minutes: 0,
            },
            {
                message: 'Завтрак',
                hour: 10,
                minutes: 0,
            },
            {
                message: 'Лекция https://www.youtube.com/watch?v=pMB7u6JfNPg',
                hour: 11,
                minutes: 0,
            },
            {
                message: 'Медитация в 12:00',
                hour: 12,
                minutes: 0,
            },
            {
                message: 'Лекция https://www.youtube.com/watch?v=h7K5JK2lWtc',
                hour: 12,
                minutes: 30,
            },
            {
                message: 'Обед',
                hour: 13,
                minutes: 0,
            },
            {
                message: 'Лекция https://www.youtube.com/watch?v=qxvhFXqspkU',
                hour: 14,
                minutes: 0,
            },
            {
                message: 'Медитация в 15:00',
                hour: 15,
                minutes: 0,
            },
            {
                message: 'Лекция https://www.youtube.com/watch?v=UR2OjhOsuPQ',
                hour: 15,
                minutes: 30,
            },
            {
                message: 'Медитация в 17:00',
                hour: 17,
                minutes: 0,
            },

            {
                message: 'Ужин',
                hour: 18,
                minutes: 0,
            },
            {
                message: 'Медитация в 19:00',
                hour: 19,
                minutes: 0,
            },
        ],
    },
};
