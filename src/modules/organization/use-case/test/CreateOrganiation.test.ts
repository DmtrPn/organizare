import { Inject } from 'typescript-ioc';

import { createOrganization } from '../OrganizationCreateCommand';
import { getFakeOrganizationCreationParams } from '@modules/organization/test/utils/organizationFakeData';
import { IOrganizationCrudService } from '@modules/organization/domain/IOrganizationCrudService';
import { UnitTest } from '@core/test/UnitTest';

@Describe()
export class CreateOrganizationUnit extends UnitTest {
    @Inject crudService!: IOrganizationCrudService;

    @Test('Create organization test')
    public async createTest(): Promise<void> {
        const params = getFakeOrganizationCreationParams();
        await createOrganization(params);

        const organization = await this.crudService.getById(params.id);

        expect(organization).toEqual(params);
    }
}
