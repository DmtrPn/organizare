#!/usr/bin/env node
import '../../bootstrap';

import { DbConnector } from '@core/db-connector/DbConnector';

async function migrationsCreate() {
    const connector = DbConnector.getInstance();
    await connector.initialize();
    const orm = connector.orm;
    const migrator = orm.getMigrator();

    const isInitial = process.argv[2] === 'initial'; // Получаем имя миграции из аргументов командной строки

    const migration = await migrator.createMigration('src/migrations', false, isInitial);
    console.log(`Migration ${migration.fileName} created successfully.`);
    await connector.closeConnection();
}

migrationsCreate().catch(err => {
    console.error(err);
    process.exit(1);
});
