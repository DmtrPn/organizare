import { Inject } from 'typescript-ioc';

import { UseCaseCommand } from '@common/use-cases/UseCaseCommand';
import { IOrganizationCrudService } from '@organization/domain/IOrganizationCrudService';

export abstract class OrganizationCommand<Params extends object> extends UseCaseCommand<Params> {
    @Inject protected crudService!: IOrganizationCrudService;
}
