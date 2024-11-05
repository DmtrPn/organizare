import castArray from 'lodash/castArray';
import type { EntityData } from '@mikro-orm/core';

import { Class } from '@project-types/common';

import { TransactionManager } from '@common/infrastructure/TransactionManager';
import { FindCommand } from '@common/infrastructure/FindCommand';
import { BaseModel } from '@common/infrastructure/BaseModel';

export abstract class CrudService<
    M extends object,
    CreationParams extends Partial<M>,
    UpdateParams = Omit<EntityData<M>, 'id'>,
    FO extends object = {},
    DbModel extends BaseModel<M> = BaseModel<M>,
> extends TransactionManager {
    protected abstract modelClass: Class<DbModel>;
    protected abstract findCommand: Class<FindCommand<M, FO, DbModel>>;

    public async find(options: FO): Promise<M[]> {
        const models = await this.findModels(options);

        return models.map(model => this.toDataFromModel(model));
    }

    public async create(params: CreationParams | CreationParams[]): Promise<void> {
        const theParams = castArray(params).map(createParams => this.enrichCreationParams(createParams));

        await this.executeInTransaction(entityManager => entityManager.insertMany(this.modelClass, theParams));
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

    protected abstract enrichCreationParams(params: CreationParams): DbModel;

    protected async findModels(options: FO): Promise<DbModel[]> {
        const command = new this.findCommand(options);
        return command.execute();
    }

    private toDataFromModel(model: DbModel): M {
        return model.toJSON();
    }
}
