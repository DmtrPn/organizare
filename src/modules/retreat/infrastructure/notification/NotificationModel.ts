import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { BaseModel } from '@common/infrastructure/BaseModel';
import { NotificationStatus } from '@retreat/domain/notification/types';

@Entity({ tableName: 'notification' })
export class NotificationModel extends BaseModel<NotificationModel> {
    @PrimaryKey({ name: 'notification_id' })
    public id!: string;

    @Property()
    public retreatId!: string;

    @Property()
    public chatId!: number;

    @Property()
    public message!: string;

    @Property()
    public status!: NotificationStatus;

    @Property()
    public executeAt!: Date;
}
