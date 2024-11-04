import { OrganizationCommand } from './OrganizationCommand';

interface Params {
    id: string;
    name: string;
}

export class OrganizationCreateCommand extends OrganizationCommand<Params> {
    public async execute(): Promise<void> {
        await this.crudService.create(this.params);
    }
}

export const createOrganization = (params: Params) => new OrganizationCreateCommand(params).execute();
