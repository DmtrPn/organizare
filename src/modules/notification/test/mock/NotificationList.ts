import { List } from '@core/test/abstract/List';
import { NotificationCreateData, NotificationFindOptions, NotificationStatus } from '../../domain/notification.types';

import { NotificationModel } from '../../infrastructure/notification.Model';

export class NotificationList extends List<NotificationModel, NotificationCreateData, NotificationFindOptions> {
    protected override create(params: NotificationCreateData): NotificationModel {
        return new NotificationModel({
            ...params,
            status: NotificationStatus.Active,
        });
    }

    protected override filterValue(
        value: NotificationModel,
        { id, status, executeBefore }: NotificationFindOptions,
    ): boolean {
        return (
            this.filterFieldValueByArray(value, id, 'id') &&
            this.filterFieldValue(value, status, 'status') &&
            this.filterFieldValueByBeforeDate(value, executeBefore, 'executeAt')
        );
    }
}
