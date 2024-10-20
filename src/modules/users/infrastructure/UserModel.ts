import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { BaseModel } from '@common/infrastructure/BaseModel';

@Entity({ tableName: 'users' })
export class UserModel extends BaseModel<UserModel> {
    @PrimaryKey({ name: 'user_id' })
    public id!: string;

    @Property()
    public chatId!: number;

    @Property()
    public firstName!: string;

    @Property()
    public lastName!: string;
}
