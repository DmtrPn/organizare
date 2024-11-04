import { FindCommand } from '@common/infrastructure/FindCommand';
import { OrganizationModel } from './OrganizationModel';
import { OrganizationData, OrganizationFindOptions } from '@organization/domain/types';

export class OrganizationFindCommand extends FindCommand<OrganizationData, OrganizationFindOptions> {
    constructor(options: OrganizationFindOptions) {
        super(options, OrganizationModel);
    }
}
