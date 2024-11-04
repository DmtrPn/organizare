import { FindCommand } from '@common/infrastructure/FindCommand';
import { OrganizationModel } from './organization.Model';
import { OrganizationData, OrganizationFindOptions } from '@organization/domain/organization.types';

export class OrganizationFindCommand extends FindCommand<OrganizationData, OrganizationFindOptions> {
    constructor(options: OrganizationFindOptions) {
        super(options, OrganizationModel);
    }
}
