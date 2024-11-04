import { Entity, PrimaryKey, Property, ManyToMany, Collection } from '@mikro-orm/core';

import { BaseModel } from '@common/infrastructure/BaseModel';
import { OrganizationUserData } from '@organization/domain/organization.types';
import { OrganizationModel } from '@organization/infrastructure/organization.Model';

@Entity({ abstract: false })
export class OrganizationUserModel extends BaseModel<OrganizationUserData> implements OrganizationUserData {
    @PrimaryKey({ name: 'user_id', columnType: 'uuid' })
    public id!: string;

    @Property()
    public chatId!: string;

    @ManyToMany(() => OrganizationModel, organization => organization.users)
    organizations = new Collection<OrganizationModel>(this);

    public override toJSON(): OrganizationUserData {
        const { organizations, ...rest } = this;
        return rest;
    }
}
