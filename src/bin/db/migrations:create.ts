#!/usr/bin/env node
import '../../bootstrap';

import { DbConnector } from '@core/db-connector/DbConnector';

async function migrationsCreate() {
    const connector = DbConnector.getInstance();
    await connector.initialize();
    const orm = connector.orm;
    const migrator = orm.getMigrator();

    const migrationName = process.argv[2]; // Получаем имя миграции из аргументов командной строки
    if (!migrationName) {
        console.error('Please provide a migration name.');
        process.exit(1);
    }

    const a = await migrator.createMigration(migrationName);
    console.log('a', a);
    console.log(`Migration ${migrationName} created successfully.`);
    await connector.closeConnection();
}

migrationsCreate().catch(err => {
    console.error(err);
    process.exit(1);
});
