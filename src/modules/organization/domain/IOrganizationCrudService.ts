import { ICrudService } from '@common/infrastructure/ICrudService';

import {
    OrganizationData,
    OrganizationCreateData,
    OrganizationFindOptions,
    OrganizationUpdateData,
} from '@modules/organization/domain/types';

export abstract class IOrganizationCrudService extends ICrudService<
    OrganizationData,
    OrganizationCreateData,
    OrganizationUpdateData,
    OrganizationFindOptions
> {}
