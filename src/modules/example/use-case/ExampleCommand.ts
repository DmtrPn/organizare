import { Inject } from 'typescript-ioc';

import { UseCaseCommand } from '@common/use-cases/UseCaseCommand';
import { IExampleCrudService } from '@example/domain/example/IExampleCrudService';

export abstract class ExampleCommand<Params extends object> extends UseCaseCommand<Params> {
    @Inject protected crudService!: IExampleCrudService;
}
