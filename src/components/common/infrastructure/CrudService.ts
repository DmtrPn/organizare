import castArray from 'lodash/castArray';
import type { EntityData } from '@mikro-orm/core';

import { Class } from '@project-types/common';

import { TransactionManager } from '@common/infrastructure/TransactionManager';
import { FindCommand } from '@common/infrastructure/FindCommand';

export abstract class CrudService<
    M extends object,
    CreationParams extends Partial<M>,
    UpdateParams = Omit<EntityData<M>, 'id'>,
    FO extends object = {},
> extends TransactionManager {
    protected abstract modelClass: Class<M>;
    protected abstract findCommand: Class<FindCommand<M, FO>>;

    public find(options: FO): Promise<M[]> {
        const command = new this.findCommand(options);
        return command.execute();
    }

    public async create(params: CreationParams | CreationParams[]): Promise<void> {
        const theParams = castArray(params).map(createParams => this.enrichCreationParams(createParams));

        await this.executeInTransaction(entityManager =>
            entityManager.createQueryBuilder(this.modelClass).insert(theParams).execute(),
        );
    }

    public async update(id: string, params: UpdateParams): Promise<void> {
        await this.executeInTransaction(entityManager =>
            entityManager
                .createQueryBuilder(this.modelClass)
                .update(params as EntityData<M>)
                .where({ id })
                .execute(),
        );
    }

    protected abstract enrichCreationParams(params: CreationParams): M;
}
