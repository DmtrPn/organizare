import { Inject } from 'typescript-ioc';

import { UseCaseCommand } from '@common/use-cases/UseCaseCommand';
import { IUserCrudService } from '@users/domain/IUserCrudService';

export abstract class UserCommand<Params extends object> extends UseCaseCommand<Params> {
    @Inject protected crudService!: IUserCrudService;
}
