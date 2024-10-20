#!/usr/bin/env node
import '../../bootstrap';

import { DbConnector } from '@core/db-connector/DbConnector';

async function runMigrations() {
    const connector = DbConnector.getInstance();
    await connector.initialize();
    await connector.orm
        .getMigrator()
        .up({ transaction: connector.manager.getTransactionContext() })
        .catch(e => {
            connector.closeConnection();
            throw e;
        })
        .finally(async () => {
            await connector.closeConnection();
        });
}

runMigrations().catch(err => console.error(err));
