import { FindCommand } from '@common/infrastructure/FindCommand';
import { NotificationData, NotificationFindOptions } from '../domain/notification.types';

import { NotificationModel } from './notification.Model';

export class NotificationFindCommand extends FindCommand<NotificationData, NotificationFindOptions> {
    private id?: NotificationFindOptions['id'];
    private status?: NotificationFindOptions['status'];
    private entityId?: NotificationFindOptions['entityId'];
    private executeBefore?: NotificationFindOptions['executeBefore'];

    constructor(options: NotificationFindOptions) {
        super(options, NotificationModel);
    }

    protected override addFilters(): this {
        return this.filterBy('id', this.id)
            .filterBy('status', this.status)
            .filterBy('entityId', this.entityId)
            .filterByExecuteBefore();
    }

    protected filterByExecuteBefore(): this {
        if (!!this.executeBefore) {
            this.qb.andWhere('execute_at <= ?', [this.executeBefore]);
        }
        return this;
    }
}
