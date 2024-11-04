import { Singleton } from 'typescript-ioc';

import type { INotificationCrudService } from '../../domain/INotificationCrudService';
import { NotificationCreateData, NotificationFindOptions, NotificationUpdateData } from '../../domain/types';

import { NotificationModel } from '../../infrastructure/NotificationModel';
import { NotificationList } from './NotificationList';
import { MockCrudService } from '@core/test/abstract/MockCrudService';

@Singleton
export class MockNotificationCrudService
    extends MockCrudService<NotificationModel, NotificationCreateData, NotificationUpdateData, NotificationFindOptions>
    implements INotificationCrudService
{
    protected list = new NotificationList();
}
