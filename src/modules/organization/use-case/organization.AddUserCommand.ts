import { OrganizationCommand } from './OrganizationCommand';

interface Params {
    organizationId: string;
    userId: string;
}

export class OrganizationAddUserCommand extends OrganizationCommand<Params> {
    public async execute(): Promise<void> {
        return Promise.resolve();
    }
}

export const addUserToOrganization = (params: Params) => new OrganizationAddUserCommand(params).execute();
