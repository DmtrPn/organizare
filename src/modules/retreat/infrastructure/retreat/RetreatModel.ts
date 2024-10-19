import { Entity, Column, PrimaryColumn } from 'typeorm';

import { BaseModel } from '@common/infrastructure/BaseModel';

@Entity('retreat')
export class RetreatModel extends BaseModel<RetreatModel> {
    @PrimaryColumn({ name: 'retreat_id' })
    public id!: string;

    @Column()
    public chatId!: number;

    @Column()
    public startDate!: Date;
}
