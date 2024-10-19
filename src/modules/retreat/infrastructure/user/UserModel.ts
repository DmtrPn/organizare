import { Entity, Column, PrimaryColumn } from 'typeorm';

import { BaseModel } from '@common/infrastructure/BaseModel';

@Entity('users')
export class UserModel extends BaseModel<UserModel> {
    @PrimaryColumn({ name: 'user_id' })
    public id!: string;

    @Column()
    public chatId!: number;

    @Column()
    public firstName!: string;

    @Column()
    public lastName!: string;
}
