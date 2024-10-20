import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { BaseModel } from '@common/infrastructure/BaseModel';

@Entity({ tableName: 'retreat' })
export class RetreatModel extends BaseModel<RetreatModel> {
    @PrimaryKey({ name: 'retreat_id' })
    public id!: string;

    @Property()
    public chatId!: number;

    @Property()
    public startDate!: Date;
}
