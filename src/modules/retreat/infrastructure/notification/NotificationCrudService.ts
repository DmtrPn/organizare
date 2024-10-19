import { Class } from '@project-types/common';

import { INotificationCrudService } from '@retreat/domain/notification/INotificationCrudService';
import {
    NotificationCreateData,
    NotificationFindOptions,
    NotificationStatus,
    NotificationUpdateData,
} from '@retreat/domain/notification/types';
import { IdentityCrudService } from '@common/infrastructure/IdentityCrudService';
import { FindCommand } from '@common/infrastructure/FindCommand';

import { NotificationModel } from './NotificationModel';
import { NotificationFindCommand } from './NotificationFindCommand';

export class NotificationCrudService
    extends IdentityCrudService<
        NotificationModel,
        NotificationCreateData,
        NotificationUpdateData,
        NotificationFindOptions
    >
    implements INotificationCrudService
{
    protected modelClass = NotificationModel;
    protected findCommand: Class<FindCommand<NotificationModel, NotificationFindOptions>, any> =
        NotificationFindCommand;

    protected enrichCreationParams(params: NotificationCreateData): NotificationModel {
        return new NotificationModel({
            ...params,
            status: NotificationStatus.Active,
        });
    }
}
