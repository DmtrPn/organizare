import { Inject } from 'typescript-ioc';

import { UnitTest } from '@core/test/UnitTest';

import { createOrganization } from '../organization.CreateCommand';
import { getFakeOrganizationCreationParams } from '@modules/organization/test/utils/organizationFakeData';
import { IOrganizationCrudService } from '@modules/organization/domain/IOrganizationCrudService';
import { Describe, Test } from '@core/test/decorators/testDecorators';
import { expect } from '@core/test/expect';

@Describe()
export class CreateOrganizationUnit extends UnitTest {
    @Inject crudService!: IOrganizationCrudService;

    @Test({ description: 'Create organization test' })
    public async createTest(): Promise<void> {
        const params = getFakeOrganizationCreationParams();
        await createOrganization(params);

        const organization = await this.crudService.getById(params.id);

        expect(organization).toEqual(params);
    }
}
