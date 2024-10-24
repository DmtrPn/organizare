import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { BaseModel } from '@common/infrastructure/BaseModel';
import { UserData } from '@users/domain/types';

@Entity({ tableName: 'users' })
export class UserModel extends BaseModel<UserModel> implements UserData {
    @PrimaryKey({ name: 'user_id' })
    public id!: string;

    @Property()
    public chatId!: string;

    @Property()
    public firstName!: string;

    @Property()
    public lastName!: string;
}
