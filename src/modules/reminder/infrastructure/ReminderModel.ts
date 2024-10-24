import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { BaseModel } from '@common/infrastructure/BaseModel';
import { ReminderData } from '@reminder/domain/types';
import { Optional } from '@project-types/common';

@Entity({ tableName: 'reminder' })
export class ReminderModel extends BaseModel<ReminderModel> implements ReminderData {
    @PrimaryKey({ name: 'reminder_id' })
    public id!: string;

    @Property({ columnType: 'int' })
    public chatId!: number;

    @Property()
    public title!: string;

    @Property()
    public description!: Optional<string>;

    @Property({ columnType: 'timestamptz' })
    public date!: Date;

    @Property({ columnType: 'timestamptz' })
    public createdAt!: Date;
}
