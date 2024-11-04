import { FakeParams } from '@core/test/FakeParams';
import { OrganizationCreateData, OrganizationUpdateData } from '@organization/domain/organization.types';

export const getFakeOrganizationCreationParams = (
    params: Partial<OrganizationCreateData> = {},
): OrganizationCreateData => {
    return {
        ...params,
        id: FakeParams.getId(),
        name: FakeParams.getName(),
    };
};

export const getFakeExampleUpdateParams = (params: Partial<OrganizationUpdateData> = {}): OrganizationUpdateData => {
    return { ...params };
};
