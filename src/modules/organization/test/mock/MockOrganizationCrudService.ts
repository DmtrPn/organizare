import { Singleton } from 'typescript-ioc';

import { MockCrudService } from '@core/test/abstract/MockCrudService';

import {
    OrganizationData,
    OrganizationCreateData,
    OrganizationUpdateData,
    OrganizationFindOptions,
    OrganizationUserData,
} from '@organization/domain/organization.types';

import { OrganizationList } from './OrganizationList';
import { IOrganizationCrudService } from '@organization/domain/IOrganizationCrudService';

@Singleton
export class MockOrganizationCrudService
    extends MockCrudService<OrganizationData, OrganizationCreateData, OrganizationUpdateData, OrganizationFindOptions>
    implements IOrganizationCrudService
{
    protected list = new OrganizationList();
    protected organizationUsers = new Map<string, OrganizationUserData[]>();

    public async getUsers(organizationId: string): Promise<OrganizationUserData[]> {
        return Promise.resolve(this.organizationUsers.get(organizationId) ?? []);
    }

    public async addUser(organizationId: string, userId: string): Promise<void> {
        if (!this.organizationUsers.has(organizationId)) {
            this.organizationUsers.set(organizationId, [{ id: userId, chatId: userId }]);
        } else {
            this.organizationUsers.set(organizationId, [
                ...this.organizationUsers.get(organizationId)!,
                { id: userId, chatId: userId },
            ]);
        }
    }
}
