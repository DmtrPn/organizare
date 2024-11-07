import '../../bootstrap';
import { before, after } from 'node:test';

import { DbConnector } from '@core/db-connector/DbConnector';
import '@core/di/testIoC';
import { TestCommonData } from '@core/test/TestCommonData';

const dbConnector = DbConnector.getInstance();

before(async () => {
    await dbConnector.initialize();
    const testCommonData = TestCommonData.getInstance();
    await testCommonData.init();
});

after(async () => {
    await dbConnector.closeConnection();
});
