import { OrganizationCommand } from './OrganizationCommand';

interface Params {
    organizationId: string;
    userId: string;
}

export class AddUserToOrganizationCommand extends OrganizationCommand<Params> {
    public async execute(): Promise<void> {}
}

export const addUserToOrganization = (params: Params) => new AddUserToOrganizationCommand(params).execute();
