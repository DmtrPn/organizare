import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { BaseModel } from '@common/infrastructure/BaseModel';
import { NotificationData, NotificationEntityType, NotificationStatus } from '../domain/notification.types';

@Entity({ tableName: 'notification' })
export class NotificationModel extends BaseModel<NotificationData> implements NotificationData {
    @PrimaryKey({ name: 'notification_id', columnType: 'uuid' })
    public id!: string;

    @Property()
    public chatId!: string;

    @Property({ columnType: 'uuid' })
    public entityId!: string;

    @Property()
    public entityType!: NotificationEntityType;

    @Property({ columnType: 'text' })
    public message!: string;

    @Property()
    public status!: NotificationStatus;

    @Property()
    public executeAt!: Date;
}
