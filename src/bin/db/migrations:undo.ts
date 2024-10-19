#!/usr/bin/env node
import '../../bootstrap';

import { DbConnector } from '@core/db-connector/DbConnector';

async function undoMigrations() {
    const connector = DbConnector.getInstance();
    await connector.initialize();
    await connector.orm
        .getMigrator()
        .down()
        .catch(e => {
            connector.closeConnection();
            throw e;
        })
        .finally(async () => {
            await connector.closeConnection();
        });
}

undoMigrations().catch(err => console.error(err));
