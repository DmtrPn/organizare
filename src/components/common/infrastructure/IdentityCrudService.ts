import type { FilterQuery } from '@mikro-orm/core/typings';

import { CrudService } from '@common/infrastructure/CrudService';
import { Nullable, Optional } from '@project-types/common';
import { ICrudService } from '@common/infrastructure/ICrudService';
import { BaseModel } from '@common/infrastructure/BaseModel';
import { NotFoundError } from '@common/domain/errors/NotFoundError';

export abstract class IdentityCrudService<
        M extends object & { id: string },
        CreationParams extends Partial<M>,
        UpdateParams extends Partial<M>,
        FO extends object = {},
        DbModel extends BaseModel<M> = BaseModel<M>,
    >
    extends CrudService<M, CreationParams, UpdateParams, FO, DbModel>
    implements ICrudService<M, CreationParams, UpdateParams, FO>
{
    public async getById(id: string): Promise<Optional<M>> {
        const model = await this.getModelById(id);
        return model?.toJSON() ?? undefined;
    }

    public async getByIdOrFail(id: string): Promise<M> {
        const model = await this.getModelByIdOrFail(id);
        return model.toJSON();
    }

    public async remove(id: string): Promise<void> {
        await this.manager.nativeDelete(this.modelClass, { id });
    }

    protected async getModelById(id: string): Promise<Nullable<DbModel>> {
        return this.manager.findOne<DbModel>(this.modelClass, { id } as FilterQuery<DbModel>);
    }

    protected async getModelByIdOrFail(id: string): Promise<DbModel> {
        const model = await this.getModelById(id);

        if (!model) {
            throw new NotFoundError({ entityName: this.modelClass.name });
        }

        return model!;
    }
}
