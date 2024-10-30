import '../../bootstrap';

import { DbConnector } from '@core/db-connector/DbConnector';
import '@core/di/testIoC';

const dbConnector = DbConnector.getInstance();

beforeAll(async () => {
    await dbConnector.initialize();
});

afterAll(async () => {
    await dbConnector.closeConnection();
});
