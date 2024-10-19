#!/usr/bin/env node
import '../bootstrap';

import { ConfigName, DbConfig } from '@core/config/types';
import { Config } from '@core/config/Config';
import { DbConnector } from '@core/db-connector/DbConnector';

async function clearDb(): Promise<void> {
    const config = <DbConfig>Config.getConfig(ConfigName.Db);
    const connector = DbConnector.getInstance();
    await connector.initialize();

    await connector.orm.em
        .getConnection()
        .execute(
            `
        DROP SCHEMA public CASCADE;
        CREATE SCHEMA public;
        GRANT ALL ON SCHEMA public TO ${config.user};
        GRANT ALL ON SCHEMA public TO public;
    `,
        )
        .catch(e => {
            connector.closeConnection();
            throw e;
        })
        .finally(async () => {
            await connector.closeConnection();
        });
}

clearDb();
