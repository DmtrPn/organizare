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

    const migration = await migrator.createMigration('src/migrations', true, false, migrationName);
    console.log(`Migration ${migration.fileName} created successfully.`);
    await connector.closeConnection();
}

migrationsCreate().catch(err => {
    console.error(err);
    process.exit(1);
});
