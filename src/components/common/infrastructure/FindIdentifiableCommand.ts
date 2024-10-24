import { FindCommand } from '@common/infrastructure/FindCommand';
import { BaseFindOptions } from '@common/domain';

export abstract class FindIdentifiableCommand<M extends { id: string }, FO> extends FindCommand<M, FO> {
    private id?: BaseFindOptions['id'];

    protected override addCommonFilters(): this {
        return this.filterBy('id', this.id);
    }
}
