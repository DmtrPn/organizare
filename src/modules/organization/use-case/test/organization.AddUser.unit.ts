import { Inject } from 'typescript-ioc';

import { Describe, Test, expect } from 'node-test-decorators';

import { createOrganization } from '../organization.CreateCommand';

import { UnitTest } from '@core/test/UnitTest';
import { getFakeOrganizationCreationParams } from '@modules/organization/test/utils/organizationFakeData';
import { IOrganizationCrudService } from '@modules/organization/domain/IOrganizationCrudService';
import { addUserToOrganization } from '@organization/use-case/organization.AddUserCommand';
import { FakeParams } from '@core/test/FakeParams';

@Describe()
export class OrganizationAddUserUnit extends UnitTest {
    @Inject crudService!: IOrganizationCrudService;

    @Test('Create organization test')
    public async createTest(): Promise<void> {
        const params = getFakeOrganizationCreationParams();
        const userId = FakeParams.getId();
        await createOrganization(params);

        await addUserToOrganization({ userId, organizationId: params.id });

        const users = await this.crudService.getUsers(params.id);

        expect(users.length).toBe(1);
        expect(users[0].id).toBe(userId);
    }
}
