import { ICrudService } from '@common/infrastructure/ICrudService';

import {
    OrganizationData,
    OrganizationCreateData,
    OrganizationFindOptions,
    OrganizationUpdateData,
    OrganizationUserData,
} from '@organization/domain/organization.types';

export abstract class IOrganizationCrudService extends ICrudService<
    OrganizationData,
    OrganizationCreateData,
    OrganizationUpdateData,
    OrganizationFindOptions
> {
    public abstract getUsers(organizationId: string): Promise<OrganizationUserData[]>;
    public abstract addUser(organizationId: string, userId: string): Promise<void>;
}
