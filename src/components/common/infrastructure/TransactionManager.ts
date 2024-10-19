import { EntityManager } from '@mikro-orm/postgresql';

import { DbConnector } from '@core/db-connector/DbConnector';

export abstract class TransactionManager {
    protected readonly dbConnector = DbConnector.getInstance();

    protected get manager(): EntityManager {
        return this.dbConnector.manager;
    }

    protected async executeInTransaction(
        runInTransaction: (entityManager: EntityManager) => Promise<unknown>,
    ): Promise<void> {
        await this.manager.transactional(runInTransaction);
    }
}
