import { NotificationModel } from '../../infrastructure/notification/NotificationModel';
import { NotificationFindOptions, NotificationUpdateData, NotificationCreateData } from './types';
import { ICrudService } from '@common/infrastructure/ICrudService';

export abstract class INotificationCrudService extends ICrudService<
    NotificationModel,
    NotificationCreateData,
    NotificationUpdateData,
    NotificationFindOptions
> {}
