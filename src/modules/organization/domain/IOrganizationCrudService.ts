import { ICrudService } from '@common/infrastructure/ICrudService';

import {
    OrganizationData,
    OrganizationCreateData,
    OrganizationFindOptions,
    OrganizationUpdateData,
} from '@organization/domain/organization.types';

export abstract class IOrganizationCrudService extends ICrudService<
    OrganizationData,
    OrganizationCreateData,
    OrganizationUpdateData,
    OrganizationFindOptions
> {
    // public async abstract get
}
