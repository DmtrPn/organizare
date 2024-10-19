import { Singleton } from 'typescript-ioc';
import castArray from 'lodash/castArray';

import type { INotificationCrudService } from '@retreat/domain/notification/INotificationCrudService';
import {
    NotificationCreateData,
    NotificationFindOptions,
    NotificationUpdateData,
} from '@retreat/domain/notification/types';

import { NotificationModel } from '../NotificationModel';
import { NotificationList } from './NotificationList';

@Singleton
export class MockNotificationCrudService implements INotificationCrudService {
    private list = new NotificationList();

    public create(params: NotificationCreateData | NotificationCreateData[]): void {
        this.list.add(castArray(params));
    }

    public find(options: NotificationFindOptions): Promise<NotificationModel[]> {
        return Promise.resolve(this.list.getFilteredValues(options));
    }

    public getById(id: string): Promise<NotificationModel> {
        return Promise.resolve(this.list.get(id)!);
    }

    public remove(id: string): void {
        this.list.remove(id);
    }

    public update(id: string, params: NotificationUpdateData): void {
        const current = this.list.get(id);
        this.list.update(id, { ...current, ...params });
    }
}
