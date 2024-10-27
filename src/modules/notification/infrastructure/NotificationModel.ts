import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { BaseModel } from '@common/infrastructure/BaseModel';
import { NotificationData, NotificationEntityType, NotificationStatus } from '../domain/types';

@Entity({ tableName: 'notification' })
export class NotificationModel extends BaseModel<NotificationModel> implements NotificationData {
    @PrimaryKey({ name: 'notification_id' })
    public id!: string;

    @Property()
    public chatId!: string;

    @Property()
    public entityId!: string;

    @Property()
    public entityType!: NotificationEntityType;

    @Property()
    public message!: string;

    @Property()
    public status!: NotificationStatus;

    @Property()
    public executeAt!: Date;
}
