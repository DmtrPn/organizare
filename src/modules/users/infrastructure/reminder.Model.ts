import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { BaseModel } from '@common/infrastructure/BaseModel';
import { ReminderData } from '@users/domain/reminder.types';
import { Optional } from '@project-types/common';

@Entity({ tableName: 'reminder' })
export class ReminderModel extends BaseModel<ReminderData> implements ReminderData {
    @PrimaryKey({ name: 'reminder_id', columnType: 'uuid' })
    public id!: string;

    @Property()
    public chatId!: string;

    @Property({ columnType: 'text' })
    public title!: string;

    @Property({ columnType: 'text' })
    public description!: Optional<string>;

    @Property({ columnType: 'timestamptz' })
    public date!: Date;

    @Property({ columnType: 'timestamptz' })
    public createdAt!: Date;
}
