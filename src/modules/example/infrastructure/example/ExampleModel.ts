import { Entity, PrimaryKey } from '@mikro-orm/core';

import { BaseModel } from '@common/infrastructure/BaseModel';

@Entity({ tableName: 'example' })
export class ExampleModel extends BaseModel<ExampleModel> {
    @PrimaryKey({ name: 'example_id' })
    public id!: string;
}
