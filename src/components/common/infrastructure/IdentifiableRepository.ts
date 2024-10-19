import type { FilterQuery } from '@mikro-orm/core/typings';

import { Class, Optional } from '@project-types/common';

import { ConflictError, NotFoundError } from '@core/http-error';
import { isDefined } from '@utils/isDefined';
import { Entity } from '@common/domain';

import { Repository } from './Repository';

/**
 * E - domain entity
 * M - ORM entity
 * FO - search options
 */
export abstract class IdentifiableRepository<E extends Entity, M extends object, FO> extends Repository<E, M, FO> {
    protected override ormEntity!: Class<M>;

    protected constructor(modelClass: Class<M>) {
        super(modelClass);
    }

    public async get(id: E['id']): Promise<Optional<E>> {
        const model = await this.getModel(id);

        return model ? this.create(model) : undefined;
    }

    public async has(id: E['id']): Promise<boolean> {
        const entity = await this.getModel(id);

        return isDefined(entity);
    }

    public async getOrFail(id: E['id']): Promise<E> {
        const entity = await this.get(id);

        if (!entity) {
            throw new NotFoundError(`${this.entityName} with id ${id} not found`);
        }

        return entity;
    }

    public async add(entity: E): Promise<void> {
        const id = entity.id;
        const isExists = await this.get(id);

        if (isExists) {
            throw new ConflictError(`${this.entityName} with id ${id} already exist`);
        }

        await this.save(entity);
    }

    protected async getModel(id: E['id']): Promise<M | null> {
        return this.manager.findOne<M>(this.ormEntity, { id } as FilterQuery<M>);
    }
}
