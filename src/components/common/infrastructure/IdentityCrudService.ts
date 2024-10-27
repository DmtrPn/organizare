import type { FilterQuery } from '@mikro-orm/core/typings';

import { CrudService } from '@common/infrastructure/CrudService';
import { Optional } from '@project-types/common';
import { ICrudService } from '@common/infrastructure/ICrudService';

export abstract class IdentityCrudService<
        M extends object & { id: string },
        CreationParams extends Partial<M>,
        UpdateParams extends Partial<M>,
        FO extends object = {},
    >
    extends CrudService<M, CreationParams, UpdateParams, FO>
    implements ICrudService<M, CreationParams, UpdateParams, FO>
{
    public async getById(id: string): Promise<Optional<M>> {
        const model = await this.manager.findOne<M>(this.modelClass, { id } as FilterQuery<M>);
        return model ?? undefined;
    }

    public async remove(id: string): Promise<void> {
        await this.manager.nativeDelete(this.modelClass, { id });
    }
}
