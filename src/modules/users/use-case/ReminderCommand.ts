import { Inject } from 'typescript-ioc';

import { UseCaseCommand } from '@common/use-cases/UseCaseCommand';
import { IReminderCrudService } from '@users/domain/IReminderCrudService';

export abstract class ReminderCommand<Params extends object> extends UseCaseCommand<Params> {
    @Inject protected crudService!: IReminderCrudService;
}
