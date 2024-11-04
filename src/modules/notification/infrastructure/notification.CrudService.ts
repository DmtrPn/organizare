import { Class } from '@project-types/common';

import { INotificationCrudService } from '../domain/INotificationCrudService';
import {
    NotificationCreateData,
    NotificationData,
    NotificationFindOptions,
    NotificationStatus,
    NotificationUpdateData,
} from '../domain/notification.types';
import { IdentityCrudService } from '@common/infrastructure/IdentityCrudService';
import { FindCommand } from '@common/infrastructure/FindCommand';

import { NotificationModel } from './notification.Model';
import { NotificationFindCommand } from './notification.FindCommand';

export class NotificationCrudService
    extends IdentityCrudService<
        NotificationData,
        NotificationCreateData,
        NotificationUpdateData,
        NotificationFindOptions
    >
    implements INotificationCrudService
{
    protected modelClass = NotificationModel;
    protected findCommand: Class<FindCommand<NotificationData, NotificationFindOptions>, any> = NotificationFindCommand;

    protected enrichCreationParams(params: NotificationCreateData): NotificationModel {
        return new NotificationModel({
            ...params,
            status: NotificationStatus.Active,
        });
    }
}
