#!/usr/bin/env node
import '../bootstrap';

import { DataSource } from 'typeorm';

import { Config } from '@core/config/Config';
import { ConfigName, DbConfig } from '@core/config/types';

async function clearDb(): Promise<void> {
    const { entities, ...dbConfig } = <DbConfig>Config.getConfig(ConfigName.Db);
    const dataSource = new DataSource(dbConfig);
    await dataSource.initialize();

    await dataSource.manager.query(`
        DROP SCHEMA public CASCADE;
        CREATE SCHEMA public;
        GRANT ALL ON SCHEMA public TO ${dbConfig.username};
        GRANT ALL ON SCHEMA public TO public;
    `);

    await dataSource.destroy();
}

clearDb();
