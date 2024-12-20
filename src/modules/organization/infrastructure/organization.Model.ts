import { Entity, PrimaryKey, Property, ManyToMany, Collection } from '@mikro-orm/core';

import { BaseModel } from '@common/infrastructure/BaseModel';
import { OrganizationData } from '@organization/domain/organization.types';
import { UserModel } from '@users/infrastructure/user.Model';

@Entity({ tableName: 'organization' })
export class OrganizationModel extends BaseModel<OrganizationData> implements OrganizationData {
    @PrimaryKey({ name: 'organization_id', columnType: 'uuid' })
    public id!: string;

    @Property()
    public name!: string;

    @ManyToMany(() => UserModel, user => user.organizations, { owner: true })
    public users = new Collection<UserModel>(this);

    public override toJSON(): OrganizationData {
        const { users, ...rest } = this;
        return rest;
    }
}
