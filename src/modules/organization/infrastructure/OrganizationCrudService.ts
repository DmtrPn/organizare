import { Class } from '@project-types/common';

import {
    OrganizationCreateData,
    OrganizationUpdateData,
    OrganizationFindOptions,
    OrganizationData,
} from '@organization/domain/types';

import { IOrganizationCrudService } from '@organization/domain/IOrganizationCrudService';
import { IdentityCrudService } from '@common/infrastructure/IdentityCrudService';
import { FindCommand } from '@common/infrastructure/FindCommand';

import { OrganizationModel } from './OrganizationModel';
import { OrganizationFindCommand } from './OrganizationFindCommand';

export class OrganizationCrudService
    extends IdentityCrudService<
        OrganizationData,
        OrganizationCreateData,
        OrganizationUpdateData,
        OrganizationFindOptions
    >
    implements IOrganizationCrudService
{
    protected modelClass = OrganizationModel;
    protected findCommand: Class<FindCommand<OrganizationData, OrganizationFindOptions>, any> = OrganizationFindCommand;

    protected enrichCreationParams(params: OrganizationCreateData): OrganizationModel {
        return new OrganizationModel({ ...params });
    }
}
