import { OrganizationCommand } from './OrganizationCommand';

interface Params {
    organizationId: string;
    userId: string;
}

export class OrganizationAddUserCommand extends OrganizationCommand<Params> {
    public async execute(): Promise<void> {
        const { organizationId, userId } = this.params;
        await this.crudService.addUser(organizationId, userId);
    }
}

export const addUserToOrganization = (params: Params) => new OrganizationAddUserCommand(params).execute();
