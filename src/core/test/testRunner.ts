import '../../bootstrap';
import { before, after } from 'node:test';

import { DbConnector } from '@core/db-connector/DbConnector';
import '@core/di/testIoC';

const dbConnector = DbConnector.getInstance();

before(async () => {
    await dbConnector.initialize();
});

after(async () => {
    await dbConnector.closeConnection();
});
