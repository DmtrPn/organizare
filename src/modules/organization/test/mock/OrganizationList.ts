import { List } from '@core/test/abstract/List';
import {
    OrganizationCreateData,
    OrganizationData,
    OrganizationFindOptions,
} from '@organization/domain/organization.types';

import { OrganizationModel } from '@organization/infrastructure/organization.Model';

export class OrganizationList extends List<OrganizationData, OrganizationCreateData, OrganizationFindOptions> {
    protected override filterValue(value: OrganizationModel, { id }: OrganizationFindOptions): boolean {
        return this.filterFieldValueByArray(value, id, 'id');
    }
}
