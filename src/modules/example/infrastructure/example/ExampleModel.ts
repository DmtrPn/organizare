import { Entity, PrimaryColumn } from 'typeorm';

import { BaseModel } from '@common/infrastructure/BaseModel';

@Entity('example')
export class ExampleModel extends BaseModel<ExampleModel> {
    @PrimaryColumn({ name: 'example_id' })
    public id!: string;
}
