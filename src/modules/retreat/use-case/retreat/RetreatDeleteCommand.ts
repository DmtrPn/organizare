import { NotFoundError } from '@components/common/domain/errors/NotFoundError';

import { RetreatCommand } from './RetreatCommand';

interface Params {
    id: string;
}

export class RetreatDeleteCommand extends RetreatCommand<Params> {
    public async execute(): Promise<void> {
        const retreat = await this.crudService.getById(this.params.id);

        if (!retreat) {
            throw new NotFoundError({ entityName: 'Retreat', id: this.params.id });
        }
        await this.crudService.remove(this.params.id);
    }
}

export const deleteRetreat = (params: Params) => new RetreatDeleteCommand(params).execute();
