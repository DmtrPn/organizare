import { Inject } from 'typescript-ioc';

import '@core/test/testRunner';
import { Describe, Test, expect } from 'node-test-decorators';

import { IntegrationTest } from '@core/test/IntegrationTest';
import { IOrganizationCrudService } from '@organization/domain/IOrganizationCrudService';
import { getFakeOrganizationCreationParams } from '@organization/test/utils/organizationFakeData';

@Describe()
export class OrganizationCrudServiceTestSpec extends IntegrationTest {
    @Inject private crudService!: IOrganizationCrudService;

    @Test('Create')
    public async create(): Promise<void> {
        const data = getFakeOrganizationCreationParams();
        await this.crudService.create(data);
        const orgnanization = await this.crudService.getById(data.id);

        expect(orgnanization).toBeDefined();
        expect(orgnanization).toEqual(data);
    }

    @Test('Add users')
    public async addUser(): Promise<void> {
        const data = getFakeOrganizationCreationParams();
        await this.crudService.create(data);
        await this.crudService.addUser(data.id, this.userId);

        const users = await this.crudService.getUsers(data.id);

        expect(users.length).toBe(1);
        expect(users[0].id).toBe(this.userId);
    }
}
