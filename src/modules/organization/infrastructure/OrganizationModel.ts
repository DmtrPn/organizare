import { Entity, PrimaryKey, Property, ManyToMany, Collection } from '@mikro-orm/core';

import { BaseModel } from '@common/infrastructure/BaseModel';
import { UserModel } from '@users/infrastructure/UserModel';
import { OrganizationData } from '@organization/domain/types';

@Entity({ tableName: 'organization' })
export class OrganizationModel extends BaseModel<OrganizationData> implements OrganizationData {
    @PrimaryKey({ name: 'organization_id', columnType: 'uuid' })
    public id!: string;

    @Property()
    public name!: string;

    @ManyToMany(() => UserModel, user => user.organizations, { owner: true, lazy: true })
    public users = new Collection<UserModel>(this);

    public override toJSON(): OrganizationData {
        const { users, ...rest } = this;
        return rest;
    }
}
