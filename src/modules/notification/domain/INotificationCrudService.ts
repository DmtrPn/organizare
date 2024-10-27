import { NotificationFindOptions, NotificationUpdateData, NotificationCreateData, NotificationData } from './types';
import { ICrudService } from '@common/infrastructure/ICrudService';

export abstract class INotificationCrudService extends ICrudService<
    NotificationData,
    NotificationCreateData,
    NotificationUpdateData,
    NotificationFindOptions
> {}
