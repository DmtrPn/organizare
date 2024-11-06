import castArray from 'lodash/castArray';

import { List } from '@core/test/abstract/List';
import { ICrudService } from '@common/infrastructure/ICrudService';

export abstract class MockCrudService<M, CD, UP, FO> implements ICrudService<M, CD, UP, FO> {
    protected abstract list: List<M, CD, FO>;

    public create(params: CD | CD[]): void {
        this.list.add(castArray(params));
    }

    public find(options: FO): Promise<M[]> {
        return Promise.resolve(this.list.getFilteredValues(options));
    }

    public getById(id: string): Promise<M> {
        return Promise.resolve(this.list.get(id)!);
    }

    public getByIdOrFail(id: string): Promise<M> {
        return Promise.resolve(this.list.get(id)!);
    }

    public remove(id: string): void {
        this.list.remove(id);
    }

    public update(id: string, params: UP): void {
        const current = this.list.get(id);
        // @ts-expect-error
        this.list.update(id, { ...current, ...params });
    }
}
