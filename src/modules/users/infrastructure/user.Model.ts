import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';

import { BaseModel } from '@common/infrastructure/BaseModel';
import { UserData } from '@users/domain/user.types';
import { OrganizationModel } from '@organization/infrastructure/organization.Model';

@Entity({ tableName: 'users' })
export class UserModel extends BaseModel<UserData> implements UserData {
    @PrimaryKey({ name: 'user_id', columnType: 'uuid' })
    public id!: string;

    @Property()
    public chatId!: string;

    @Property()
    public firstName!: string;

    @Property()
    public lastName!: string;

    @ManyToMany(() => OrganizationModel, organization => organization.users, { lazy: true, hidden: true })
    organizations = new Collection<OrganizationModel>(this);

    public override toJSON(): UserData {
        const { organizations, ...rest } = this;
        return rest;
    }
}
