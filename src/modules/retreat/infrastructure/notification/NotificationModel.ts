import { Entity, Column, PrimaryColumn } from 'typeorm';

import { BaseModel } from '@common/infrastructure/BaseModel';
import { NotificationStatus } from '@retreat/domain/notification/types';

@Entity('notification')
export class NotificationModel extends BaseModel<NotificationModel> {
    @PrimaryColumn({ name: 'notification_id' })
    public id!: string;

    @Column()
    public retreatId!: string;

    @Column()
    public chatId!: number;

    @Column()
    public message!: string;

    @Column()
    public status!: NotificationStatus;

    @Column()
    public executeAt!: Date;
}
