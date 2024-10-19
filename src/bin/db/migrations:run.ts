#!/usr/bin/env node
import '../../bootstrap';

import { DataSource } from 'typeorm';

import { Config } from '@core/config/Config';
import { ConfigName, DbConfig } from '@core/config/types';

async function migrations(): Promise<void> {
    const { entities, ...dbConfig } = <DbConfig>Config.getConfig(ConfigName.Db);
    const dataSource = new DataSource(dbConfig);
    await dataSource.initialize();
    await dataSource.runMigrations();
    await dataSource.destroy();
}

migrations();
