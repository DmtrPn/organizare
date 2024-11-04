import { Entity, PrimaryKey } from '@mikro-orm/core';

import { BaseModel } from '@common/infrastructure/BaseModel';
import { ExampleData } from '@example/domain/types';

@Entity({ tableName: 'example' })
export class ExampleModel extends BaseModel<ExampleData> implements ExampleData {
    @PrimaryKey({ name: 'example_id' })
    public id!: string;
}
