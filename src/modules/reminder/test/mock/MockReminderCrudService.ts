import { Singleton } from 'typescript-ioc';
import castArray from 'lodash/castArray';

import { ReminderList } from './ReminderList';
import { IReminderCrudService } from '@reminder/domain/IReminderCrudService';
import { ReminderCreateData, ReminderFindOptions, ReminderUpdateData } from '@reminder/domain/types';
import { ReminderModel } from '@reminder/infrastructure/ReminderModel';

@Singleton
export class MockReminderCrudService implements IReminderCrudService {
    private list = new ReminderList();

    public create(params: ReminderCreateData | ReminderCreateData[]): void {
        this.list.add(castArray(params));
    }

    public find(options: ReminderFindOptions): Promise<ReminderModel[]> {
        return Promise.resolve(this.list.getFilteredValues(options));
    }

    public getById(id: string): Promise<ReminderModel> {
        return Promise.resolve(this.list.get(id)!);
    }

    public remove(id: string): void {
        this.list.remove(id);
    }

    public update(id: string, params: ReminderUpdateData): void {
        const current = this.list.get(id);
        this.list.update(id, { ...current, ...params });
    }
}
