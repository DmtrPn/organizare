import { Singleton } from 'typescript-ioc';

import { MockCrudService } from '@core/test/abstract/MockCrudService';

import {
    OrganizationData,
    OrganizationCreateData,
    OrganizationUpdateData,
    OrganizationFindOptions,
} from '@organization/domain/types';

import { OrganizationList } from './OrganizationList';
import { IOrganizationCrudService } from '@organization/domain/IOrganizationCrudService';

@Singleton
export class MockOrganizationCrudService
    extends MockCrudService<OrganizationData, OrganizationCreateData, OrganizationUpdateData, OrganizationFindOptions>
    implements IOrganizationCrudService
{
    protected list = new OrganizationList();
}
