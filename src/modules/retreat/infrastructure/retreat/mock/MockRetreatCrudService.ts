import { Singleton } from 'typescript-ioc';
import castArray from 'lodash/castArray';

import type { IRetreatCrudService } from '@retreat/domain/retreat/IRetreatCrudService';
import { RetreatCreateData, RetreatFindOptions, RetreatUpdateData } from '@retreat/domain/retreat/types';

import { RetreatModel } from '../RetreatModel';
import { RetreatList } from './RetreatList';
import { MockCrudService } from '@core/test/abstract/MockCrudService';

@Singleton
export class MockRetreatCrudService extends MockCrudService implements IRetreatCrudService {
    private list = new RetreatList();

    public create(params: RetreatCreateData | RetreatCreateData[]): void {
        this.list.add(castArray(params));
    }

    public find(options: RetreatFindOptions): Promise<RetreatModel[]> {
        return Promise.resolve(this.list.getFilteredValues(options));
    }

    public getById(id: string): Promise<RetreatModel> {
        return Promise.resolve(this.list.get(id)!);
    }

    public remove(id: string): void {
        this.list.remove(id);
    }

    public update(id: string, params: RetreatUpdateData): void {
        const current = this.list.get(id);
        this.list.update(id, { ...current, ...params });
    }
}
