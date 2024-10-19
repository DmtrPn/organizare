import { FindOptionsWhere } from 'typeorm';

import { CrudService } from '@common/infrastructure/CrudService';
import { Optional } from '@project-types/common';

export abstract class IdentityCrudService<
    M extends object & { id: string },
    CreationParams extends Partial<M>,
    UpdateParams extends Partial<M>,
    FO extends object = {},
> extends CrudService<M, CreationParams, UpdateParams, FO> {
    public async getById(id: string): Promise<Optional<M>> {
        const model = await this.manager.findOneBy<M>(this.modelClass, { id } as FindOptionsWhere<M>);
        return model ?? undefined;
    }

    public async remove(id: string): Promise<void> {
        await this.manager.delete(this.modelClass, { id });
    }
}
