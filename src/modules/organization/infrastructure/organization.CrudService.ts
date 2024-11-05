import { Class } from '@project-types/common';

import {
    OrganizationCreateData,
    OrganizationUpdateData,
    OrganizationFindOptions,
    OrganizationData,
    OrganizationUserData,
} from '@organization/domain/organization.types';

import { IOrganizationCrudService } from '@organization/domain/IOrganizationCrudService';
import { IdentityCrudService } from '@common/infrastructure/IdentityCrudService';
import { FindCommand } from '@common/infrastructure/FindCommand';

import { OrganizationModel } from './organization.Model';
import { OrganizationFindCommand } from './organization.FindCommand';
import { UserModel } from '@users/infrastructure/user.Model';

export class OrganizationCrudService
    extends IdentityCrudService<
        OrganizationData,
        OrganizationCreateData,
        OrganizationUpdateData,
        OrganizationFindOptions,
        OrganizationModel
    >
    implements IOrganizationCrudService
{
    protected modelClass = OrganizationModel;
    protected findCommand: Class<FindCommand<OrganizationData, OrganizationFindOptions, OrganizationModel>, any> =
        OrganizationFindCommand;

    public async getUsers(organizationId: string): Promise<OrganizationUserData[]> {
        const organization = await this.getModelByIdOrFail(organizationId);
        await organization.users.init();

        return Promise.resolve(organization?.users.toJSON() ?? []);
    }

    public async addUser(organizationId: string, userId: string): Promise<void> {
        const [organization, user] = await Promise.all([
            this.getModelByIdOrFail(organizationId),
            this.manager.findOneOrFail(UserModel, { id: userId }),
        ]);
        await organization.users.init();
        organization.users.add(user);
        await this.manager.persistAndFlush(organization);
    }

    protected enrichCreationParams(params: OrganizationCreateData): OrganizationModel {
        return new OrganizationModel({ ...params });
    }
}
