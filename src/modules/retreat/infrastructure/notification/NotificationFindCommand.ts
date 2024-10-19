import { FindCommand } from '@common/infrastructure/FindCommand';
import { NotificationFindOptions } from '@retreat/domain/notification/types';

import { NotificationModel } from './NotificationModel';

export class NotificationFindCommand extends FindCommand<NotificationModel, NotificationFindOptions> {
    private id?: NotificationFindOptions['id'];
    private status?: NotificationFindOptions['status'];
    private retreatId?: NotificationFindOptions['retreatId'];
    private executeBefore?: NotificationFindOptions['executeBefore'];

    constructor(options: NotificationFindOptions) {
        super(options, NotificationModel);
    }

    protected override addFilters(): this {
        return this.filterBy('id', this.id)
            .filterBy('status', this.status)
            .filterBy('retreatId', this.retreatId)
            .filterByExecuteBefore();
    }

    protected filterByExecuteBefore(): this {
        if (!!this.executeBefore) {
            this.qb.andWhere('execute_at <= :executeBefore', { executeBefore: this.executeBefore });
        }
        return this;
    }
}
